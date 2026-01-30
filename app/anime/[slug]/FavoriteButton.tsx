"use client";

import { Heart } from "lucide-react";
import { AnimeDetail } from "@/types";
import { useAnimeStorage } from "@/hooks/useAnimeStorage";
import { cn } from "@/utils/cn";

export default function FavoriteButton({ anime }: { anime: AnimeDetail }) {
  const { isFavorite, toggleFavorite } = useAnimeStorage();
  const active = isFavorite(anime.slug);

  return (
    <button
      onClick={() => toggleFavorite(anime)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all",
        active
          ? "bg-pink-500/10 text-pink-500 border border-pink-500/50"
          : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700",
      )}
    >
      <Heart size={14} fill={active ? "currentColor" : "none"} />
      {active ? "Difavoritkan" : "Tambah ke Favorit"}
    </button>
  );
}
