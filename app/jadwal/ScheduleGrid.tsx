"use client";

import { ScheduleDay } from "@/types";
import { AlertCircle } from "lucide-react";
import AnimeCard from "@/components/AnimeCard";

export default function ScheduleGrid({
  schedule,
}: {
  schedule: ScheduleDay[];
}) {
  if (schedule.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
        <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
        <p>Jadwal gagal dimuat atau kosong.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {schedule.map((day) => {
        const hasAnime = day.animeList.length > 0;
        if (!hasAnime) return null;

        return (
          <div key={day.day} className="space-y-4">
            {/* Header Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border-l-4 border-emerald-500">
              <h2 className="text-lg font-bold text-white capitalize">
                {day.day}
              </h2>
              <span className="text-xs text-emerald-400 font-medium">
                {day.animeList.length} Anime
              </span>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x snap-mandatory px-2">
              {day.animeList.map((anime) => (
                <div key={anime.slug} className="w-[140px] shrink-0 snap-start">
                  <AnimeCard
                    anime={{
                      title: anime.title,
                      poster: anime.poster,
                      slug: anime.slug,
                      episodeCount: undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
