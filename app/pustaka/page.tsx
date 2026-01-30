"use client";

import { useState, useEffect } from "react";
import { useAnimeStorage } from "@/hooks/useAnimeStorage";
import AnimeCard from "@/components/AnimeCard";
import { History, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"history" | "favorites">(
    "history",
  );
  const { history, favorites } = useAnimeStorage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="p-8 text-center text-slate-500">Memuat pustaka...</div>
    );

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold mb-6">Pustaka Saya</h1>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-800 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "history"
              ? "bg-slate-700 text-white shadow"
              : "text-slate-400 hover:text-slate-200",
          )}
        >
          <History size={16} />
          Riwayat
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "favorites"
              ? "bg-pink-500/20 text-pink-500 shadow"
              : "text-slate-400 hover:text-slate-200",
          )}
        >
          <Heart size={16} />
          Favorit
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
        {activeTab === "history" ? (
          history.length > 0 ? (
            history.map((item) => (
              <AnimeCard key={item.slug} anime={item} isHistory />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              <p>Belum ada riwayat nonton.</p>
            </div>
          )
        ) : favorites.length > 0 ? (
          favorites.map((item) => <AnimeCard key={item.slug} anime={item} />)
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
            <p>Belum ada favorit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
