import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

const BASE_URL = "https://v1.samehadaku.how/";

export async function GET() {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
        Referer: "https://google.com/",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Ch-Ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
      },
      next: { revalidate: 1800 }, // Cache for 30 mins
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch upstream", status: res.status },
        { status: res.status },
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Scrape "Ongoing" or "Recent"
    // Samehadaku structure usually has sections.
    // Let's grab the main "post-show" or "western" section which usually contains latest updates.

    // Selector strategy for Samehadaku (based on common themes)
    // .post-show ul li -> Recent Episodes

    const recent: any[] = [];
    $(".post-show ul li").each((_, el) => {
      const title = $(el).find(".entry-title a").text().trim();
      const link = $(el).find(".entry-title a").attr("href");
      const poster = $(el).find(".thumb img").attr("src");
      const episodeInfo =
        $(el).find('span:contains("Episode")').text().trim() ||
        $(el).find(".dtla .cen").text().trim();

      // Extract slug from link
      // Link might be: https://v1.samehadaku.how/anime-slug/ or https://v1.samehadaku.how/anime-slug-episode-1/
      // If it's an episode link, we might want to try to deduce the anime slug or just use the link as is for now.
      // But our app expects 'anime-slug' for the Detail page.
      // If we click it, it goes to Detail.

      let slug = "";
      if (link) {
        const parts = link.split("/").filter((p) => p);
        slug = parts[parts.length - 1];
      }

      if (title && slug) {
        recent.push({
          title,
          slug,
          poster,
          episodeCount: episodeInfo,
          rating: "", // Home usually doesn't have rating
        });
      }
    });

    // Ongoing logic (might be same as recent or a sidebar widget)
    // For now, let's use the same list for both or differentiate if we find a specific section.
    // .widget_senction usually has "Ongoing"

    const ongoing: any[] = [];
    $('.widget-title:contains("Ongoing")')
      .next("ul")
      .find("li")
      .each((_, el) => {
        const title =
          $(el).find(".series").text().trim() || $(el).text().trim();
        // structure varies...
      });

    // Fallback: Use recent for both if specific sections aren't clear without visual inspection
    return NextResponse.json({
      ongoing: recent.slice(0, 10),
      completed: recent.slice(10, 20), // Just strictly split for now
    });
  } catch (error) {
    console.error("Home Scraper Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
