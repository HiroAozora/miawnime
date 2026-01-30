export interface Anime {
  title: string;
  slug: string;
  poster: string;
  status?: string;
  rating?: string;
  episodeCount?: string;
  lastEpisode?: string;
  synopsis?: string;
  genres?: string[];
  releaseDate?: string;
}

export interface Episode {
  title: string;
  slug: string;
  episodeNumber: string | number;
  date?: string;
}

export interface AnimeDetail extends Anime {
  episodes: Episode[];
}

export interface StreamServer {
  title: string;
  serverId: string;
  href: string;
}

export interface StreamQuality {
  title: string;
  serverList: StreamServer[];
}

export interface StreamSource {
  server: string;
  url: string;
}

export interface StreamData {
  title?: string;
  animeId?: string;
  prevEpisode?: string | null;
  nextEpisode?: string | null;
  default: { server: string; streamUrl: string };
  qualities: StreamQuality[];
}

export interface ScheduleAnime {
  title: string;
  slug: string;
  episode: string;
}

export interface ScheduleDay {
  day: string;
  animeList: ScheduleAnime[];
}

export const API_BASE_URL = "https://www.sankavollerei.com/anime";
