import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { AnimeDetail } from "@/types";

export const dynamic = "force-dynamic";

const BASE_URL = "https://v1.samehadaku.how/";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;

  try {
    // URL might be /anime/slug/ or just /slug/ depending on permalink structure.
    // Try /anime/slug/ first as it is common for detail pages.
    let targetUrl = `${BASE_URL}anime/${slug}/`;

    console.log(`Scraping detail: ${targetUrl}`);

    let res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (res.status === 404) {
      // Fallback: Try without /anime/ prefix
      targetUrl = `${BASE_URL}${slug}/`;
      console.log(`Retrying detail: ${targetUrl}`);
      res = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch upstream" },
        { status: res.status },
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Samehadaku Detail Structure (Common Theme)
    const title = $("h1.entry-title").text().trim();
    const poster =
      $(".thumb img").attr("src") || $(".fotoanime img").attr("src");
    const synopsis =
      $(".desc").text().trim() || $(".entry-content").text().trim();

    // Info extraction
    // usually in .infox or similar list
    const rating = $(".score").text().trim().replace("Rating:", "").trim();
    const status = $(".status").text().trim().replace("Status:", "").trim();

    // Episodes
    // .lstepsiode.list
    const episodes: any[] = [];
    $(".lstepsiode.list ul li").each((_, el) => {
      const link = $(el).find("a").attr("href");
      const title =
        $(el).find(".lchx").text().trim() || $(el).find("a").text().trim();
      const date = $(el).find(".date").text().trim();
      const episodeNumberRaw = $(el).find(".nume").text().trim();

      // Extract slug
      let epSlug = "";
      if (link) {
        const parts = link.split("/").filter((p) => p);
        epSlug = parts[parts.length - 1];
      }

      if (epSlug) {
        episodes.push({
          title,
          slug: epSlug,
          episodeNumber: episodeNumberRaw,
          date,
        });
      }
    });

    // Reverse episodes if they are high to low
    episodes.reverse();

    const animeDetail: AnimeDetail = {
      title,
      slug,
      poster: poster || "",
      rating,
      status,
      synopsis,
      episodeCount: episodes.length.toString(),
      episodes,
    };

    return NextResponse.json(animeDetail);
  } catch (error) {
    console.error("Scraper Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
