"use client";

import { useAnimeStorage } from "@/hooks/useAnimeStorage";
import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function LastWatchedBanner() {
  const { history } = useAnimeStorage();
  const [lastWatched, setLastWatched] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      setLastWatched(history[0]);
    }
  }, [history]);

  if (!mounted || !lastWatched) return null;

  return (
    <div className="mb-6 px-4 sm:px-0">
      <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl group">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${lastWatched.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="max-w-xl space-y-2">
            <span className="inline-block px-2 py-1 rounded bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Lanjutkan Menonton
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white line-clamp-1">
              {lastWatched.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
              <span>Episode {lastWatched.episodeNumber}</span>
              <span>&bull;</span>
              <span>
                {new Date(lastWatched.lastWatchedAt).toLocaleDateString()}
              </span>
            </div>

            <Link
              href={`/watch/${lastWatched.episode}`}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-400 hover:text-white transition-all transform hover:scale-105"
            >
              <Play size={18} fill="currentColor" />
              Lanjut Nonton
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
