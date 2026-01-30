"use client";

import { useState, useEffect, useCallback } from "react";
import { Anime, AnimeDetail, Episode } from "@/types";

interface StoredHistory {
  slug: string;
  title: string;
  poster: string;
  episode: string;
  episodeNumber: number;
  lastWatchedAt: number;
}

interface StoredFavorite {
  slug: string;
  title: string;
  poster: string;
  addedAt: number;
}

export function useAnimeStorage() {
  const [history, setHistory] = useState<StoredHistory[]>([]);
  const [favorites, setFavorites] = useState<StoredFavorite[]>([]);

  useEffect(() => {
    const loadStorage = () => {
      try {
        const h = localStorage.getItem("miaw_history");
        const f = localStorage.getItem("miaw_favorites");
        if (h) setHistory(JSON.parse(h));
        if (f) setFavorites(JSON.parse(f));
      } catch (e) {
        console.error("Storage load error", e);
      }
    };
    loadStorage();
  }, []);

  const addToHistory = useCallback((anime: AnimeDetail, episode: Episode) => {
    setHistory((prev) => {
      const newItem: StoredHistory = {
        slug: anime.slug,
        title: anime.title,
        poster: anime.poster,
        episode: episode.slug,
        episodeNumber: Number(episode.episodeNumber),
        lastWatchedAt: Date.now(),
      };

      const updated = [
        newItem,
        ...prev.filter((h) => h.slug !== anime.slug),
      ].slice(0, 50);

      localStorage.setItem("miaw_history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = (anime: AnimeDetail | Anime) => {
    const exists = favorites.find((f) => f.slug === anime.slug);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.slug !== anime.slug);
    } else {
      updated = [
        {
          slug: anime.slug,
          title: anime.title,
          poster: anime.poster,
          addedAt: Date.now(),
        },
        ...favorites,
      ];
    }
    setFavorites(updated);
    localStorage.setItem("miaw_favorites", JSON.stringify(updated));
  };

  const isFavorite = (slug: string) => favorites.some((f) => f.slug === slug);

  return {
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    isFavorite,
  };
}
