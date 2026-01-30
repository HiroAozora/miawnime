import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

const BASE_URL = "https://v1.samehadaku.how/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // https://v1.samehadaku.how/?s=naruto
    const targetUrl = `${BASE_URL}?s=${encodeURIComponent(query)}`;

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed" }, { status: res.status });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const results: any[] = [];

    // Selector for search results
    // Usually .animepost or .ka
    $(".animepost").each((_, el) => {
      const title = $(el).find(".title").text().trim();
      const link = $(el).find("a").attr("href");
      const poster = $(el).find("img").attr("src");
      const rating = $(el).find(".score").text().trim();
      const type = $(el).find(".type").text().trim();

      let slug = "";
      if (link) {
        const parts = link.split("/").filter((p) => p);
        slug = parts[parts.length - 1];
      }

      if (title && slug) {
        results.push({
          title,
          slug,
          poster,
          rating,
          status: type,
          genres: [], // Parsing genres is nice but optional for search list
        });
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search Scraper Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
