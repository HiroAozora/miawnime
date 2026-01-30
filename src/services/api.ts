import {
  Anime,
  AnimeDetail,
  Episode,
  StreamData,
  API_BASE_URL,
} from "../types";
import { MOCK_ANIME_DETAIL, MOCK_HOME_DATA } from "./mockData";

export const api = {
  getHome: async (): Promise<{ ongoing: Anime[]; completed: Anime[] }> => {
    try {
      // Rate Limit: 70 req/min. Cache for 1 hour (3600s) to be safe.
      const res = await fetch(`${API_BASE_URL}/home`, {
        next: { revalidate: 3600 },
        headers: {
          Origin: "https://miawnime.vercel.app", // Polite headers
        },
      });

      if (!res.ok) {
        if (res.status === 429) console.error("API Rate Limit Exceeded!");
        console.warn(`API Error ${res.status} for home, using mock.`);
        return MOCK_HOME_DATA;
      }

      const json = await res.json();
      const data = json.data;

      const ongoing =
        data.ongoing?.animeList?.map((item: any) => ({
          title: item.title,
          slug: item.animeId,
          poster: item.poster,
          episodeCount: item.episodes?.toString() || "?",
          releaseDate: item.latestReleaseDate || item.releaseDay,
        })) || [];

      const completed =
        data.completed?.animeList?.map((item: any) => ({
          title: item.title,
          slug: item.animeId,
          poster: item.poster,
          episodeCount: item.episodes?.toString() || "?",
          rating: item.score || "",
        })) || [];

      return { ongoing, completed };
    } catch (error) {
      console.error("API Error getHome:", error);
      return MOCK_HOME_DATA;
    }
  },

  searchAnime: async (query: string): Promise<Anime[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/search/${query}`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        if (res.status === 429)
          console.error("API Rate Limit Exceeded (Search)!");
        console.warn(`API Error ${res.status} for search`);
        return [];
      }

      const json = await res.json();
      const data = json.data;

      return (
        data?.animeList?.map((item: any) => ({
          title: item.title,
          slug: item.animeId,
          poster: item.poster,
          status: item.status,
          rating: item.score,
          genres: item.genreList?.map((g: any) => g.title),
        })) || []
      );
    } catch (error) {
      console.error("API Error searchAnime:", error);
      return [];
    }
  },

  getAnimeDetail: async (slug: string): Promise<AnimeDetail | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/anime/${slug}`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        if (res.status === 429)
          console.error("API Rate Limit Exceeded (Detail)!");
        console.warn(`API Error ${res.status} for detail, using mock.`);
        return { ...MOCK_ANIME_DETAIL, slug, title: `Mock: ${slug}` };
      }

      const json = await res.json();
      const info = json.data;

      if (!info) return null;

      // Handle Synopsis structure: { paragraphs: [], connections: [] } or just string
      let synopsis = "";
      if (typeof info.synopsis === "object" && info.synopsis?.paragraphs) {
        synopsis = info.synopsis.paragraphs.join("\n\n");
      } else if (typeof info.synopsis === "string") {
        synopsis = info.synopsis;
      }

      return {
        title: info.title,
        slug: slug,
        poster: info.poster,
        status: info.status,
        rating: info.rating || info.score,
        synopsis: synopsis,
        episodeCount: info.episodes
          ? info.episodes.toString()
          : info.episodeList?.length.toString() || "?",
        episodes:
          info.episodeList?.map((ep: any) => ({
            title: ep.title,
            slug: ep.episodeId,
            episodeNumber: ep.eps, // "eps" from new API
            date: ep.date,
          })) || [],
      };
    } catch (error) {
      console.error("API Error getAnimeDetail:", error);
      return { ...MOCK_ANIME_DETAIL, slug, title: `Mock: ${slug}` };
    }
  },

  getStreamSource: async (slug: string): Promise<StreamData | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/episode/${slug}`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.warn(`API Error ${res.status} for stream, using mock.`);
        return {
          default: {
            server: "Mock Server",
            streamUrl: "https://www.youtube.com/embed/YE7VzlLtp-4?autoplay=1",
          },
          qualities: [],
        };
      }

      const json = await res.json();
      const data = json.data;

      const result: StreamData = {
        title: data.title || "",
        animeId: data.animeId,
        prevEpisode: data.hasPrevEpisode ? data.prevEpisode?.episodeId : null,
        nextEpisode: data.hasNextEpisode ? data.nextEpisode?.episodeId : null,
        default: { server: "Default", streamUrl: "" },
        qualities: [],
      };

      if (data.defaultStreamingUrl) {
        result.default = {
          server: "Default (DesuStream)",
          streamUrl: data.defaultStreamingUrl,
        };
      }

      if (data.server?.qualities) {
        result.qualities = data.server.qualities.map((q: any) => ({
          title: q.title,
          serverList: q.serverList || [],
        }));
      }

      return result;
    } catch (error) {
      console.error("API Error getStreamSource:", error);
      return null;
    }
  },

  resolveWebStream: async (href: string): Promise<string | null> => {
    try {
      const resolveUrl = `${API_BASE_URL.replace("/anime", "")}${href}`;
      console.log(`[Stream] Resolving: ${resolveUrl}`);

      const res = await fetch(resolveUrl, {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      if (!res.ok) return null;

      const json = await res.json();
      return json.data?.url || null;
    } catch (error) {
      console.error("API Error resolveWebStream:", error);
      return null;
    }
  },

  getSchedule: async (): Promise<import("../types").ScheduleDay[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/schedule`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.warn(`API Error ${res.status} for schedule`);
        return [];
      }

      const json = await res.json();
      const data = json.data;

      return (
        data?.map((day: any) => ({
          day: day.day,
          animeList:
            day.animeList?.map((anime: any) => ({
              title: anime.title,
              slug: anime.animeId,
              episode: anime.episodes?.toString() || "?",
            })) || [],
        })) || []
      );
    } catch (error) {
      console.error("API Error getSchedule:", error);
      return [];
    }
  },
};
