import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

const BASE_URL = "https://v1.samehadaku.how/";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;

  try {
    const targetUrl = `${BASE_URL}${slug}/`; // Episodes are usually at root or /episode/
    console.log(`Scraping episode: ${targetUrl}`);

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch upstream" },
        { status: res.status },
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    let streamUrl = "";

    // Samehadaku usually has a tab system for players.
    // .player-embed iframe
    const iframeSrc =
      $(".player-embed iframe").attr("src") ||
      $("#player_embed iframe").attr("src");
    if (iframeSrc) streamUrl = iframeSrc;

    // Check for other post-content iframes
    if (!streamUrl) {
      $(".entry-content iframe").each((_, el) => {
        const src = $(el).attr("src");
        if (
          src &&
          (src.includes("blogger") ||
            src.includes("youtube") ||
            src.includes("stream"))
        ) {
          streamUrl = src;
          return false; // break
        }
      });
    }

    // Default Fallback to Big Buck Bunny if scraping fails strictly for demo
    if (!streamUrl) {
      return NextResponse.json([
        {
          server: "Mock (Scrape Failed)",
          streamUrl: "https://www.youtube.com/embed/YE7VzlLtp-4?autoplay=1",
        },
      ]);
    }

    return NextResponse.json([{ server: "Default", streamUrl }]);
  } catch (error) {
    console.error("Episode Scraper Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
