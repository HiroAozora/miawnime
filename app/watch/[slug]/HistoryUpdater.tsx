"use client";

import { useEffect } from "react";
import { useAnimeStorage } from "@/hooks/useAnimeStorage";
import { AnimeDetail, Episode } from "@/types";

interface HistoryUpdaterProps {
  anime: AnimeDetail | null;
  episodeSlug: string;
}

export default function HistoryUpdater({
  anime,
  episodeSlug,
}: HistoryUpdaterProps) {
  const { addToHistory } = useAnimeStorage();

  useEffect(() => {
    if (!anime || !episodeSlug) return;

    // Find current episode object or create a placeholder
    const currentEpisode = anime.episodes?.find(
      (ep) => ep.slug === episodeSlug,
    );

    // If not found (rare), create a fallback
    const episodeToSave: Episode = currentEpisode || {
      title: "Episode",
      slug: episodeSlug,
      episodeNumber: episodeSlug.match(/episode-(\d+)/)?.[1] || "1", // Try to parse number from slug
    };

    addToHistory(anime, episodeToSave);
    console.log("Added to history:", anime.title, episodeSlug);
  }, [anime, episodeSlug, addToHistory]);

  return null;
}
