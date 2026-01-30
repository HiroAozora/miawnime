import { AnimeDetail } from "../types";

export const MOCK_ANIME_DETAIL: AnimeDetail = {
  title: "Eris no Seihai (Mock Data)",
  slug: "eris-seihai-sub-indo",
  poster: "https://otakudesu.best/wp-content/uploads/2026/01/153574.jpg",
  status: "Ongoing",
  rating: "7.5",
  episodeCount: "12",
  synopsis:
    "In this mock data synopsis, sticking to the shadows is the name of the game for Connie, a plain but clever noble daughter. Her quiet life is upended when the ghost of executed villainess Scarlet Castiel possesses her! Now bound together, they must uncover the conspiracy that led to Scarlet's death.",
  episodes: Array.from({ length: 12 }, (_, i) => ({
    title: `Episode ${i + 1}`,
    slug: `eris-seihai-episode-${i + 1}-sub-indo`,
    episodeNumber: i + 1,
    date: "2024-01-01",
  })),
};

export const MOCK_HOME_DATA = {
  ongoing: [
    {
      title: "Solo Leveling Season 2: Arise from the Shadow",
      slug: "solo-leveling-s2",
      poster:
        "https://placehold.co/300x450/111827/ffffff?text=Solo+Leveling+S2",
      episodeCount: "Episode 1",
      releaseDate: "Hari ini",
    },
    {
      title: "Sakamoto Days",
      slug: "sakamoto-days",
      poster: "https://placehold.co/300x450/eab308/000000?text=Sakamoto+Days",
      episodeCount: "Episode 3",
      releaseDate: "Kemarin",
    },
    {
      title: "Dandadan",
      slug: "dandadan",
      poster: "https://placehold.co/300x450/ec4899/ffffff?text=Dandadan",
      episodeCount: "Episode 12",
      releaseDate: "20 Jan",
    },
    {
      title: "Bleach: Thousand-Year Blood War - Part 3",
      slug: "bleach-tybw-part-3",
      poster: "https://placehold.co/300x450/000000/ffffff?text=Bleach+TYBW",
      episodeCount: "Episode 15",
      releaseDate: "19 Jan",
    },
    {
      title: "Blue Lock Season 2",
      slug: "blue-lock-s2",
      poster: "https://placehold.co/300x450/3b82f6/ffffff?text=Blue+Lock+S2",
      episodeCount: "Episode 10",
      releaseDate: "18 Jan",
    },
  ],
  completed: [
    {
      title: "Frieren: Beyond Journey's End",
      slug: "frieren",
      poster: "https://placehold.co/300x450/f0f9ff/1e293b?text=Frieren",
      episodeCount: "28 Episodes",
      rating: "9.3",
    },
    {
      title: "The Apothecary Diaries",
      slug: "kusuriya-no-hitorigoto",
      poster:
        "https://placehold.co/300x450/10b981/ffffff?text=Apothecary+Diaries",
      episodeCount: "24 Episodes",
      rating: "8.9",
    },
    {
      title: "Attack on Titan: The Final Season",
      slug: "shingeki-no-kyojin-final",
      poster: "https://placehold.co/300x450/7f1d1d/ffffff?text=AOT+Final",
      episodeCount: "Complete",
      rating: "9.0",
    },
    {
      title: "Jujutsu Kaisen Season 2",
      slug: "jujutsu-kaisen-s2",
      poster: "https://placehold.co/300x450/3730a3/ffffff?text=JJK+S2",
      episodeCount: "23 Episodes",
      rating: "8.8",
    },
    {
      title: "Oshi no Ko",
      slug: "oshi-no-ko",
      poster: "https://placehold.co/300x450/d946ef/ffffff?text=Oshi+no+Ko",
      episodeCount: "11 Episodes",
      rating: "9.0",
    },
  ],
};
