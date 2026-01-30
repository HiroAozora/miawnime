import { api } from "@/services/api";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";
import LastWatchedBanner from "@/components/LastWatchedBanner";
import { Anime } from "@/types";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const { ongoing, completed } = await api.getHome();

  return (
    <div className="space-y-8">
      <LastWatchedBanner />
      {/* Ongoing Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Sedang Tayang
          </h2>
        </div>

        {ongoing.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-0 hide-scrollbar snap-x snap-mandatory">
            {ongoing.map((anime: Anime) => (
              <div
                key={anime.slug}
                className="min-w-[140px] w-[140px] snap-start"
              >
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 bg-slate-800/50 rounded-xl mx-4 sm:mx-0">
            Gagal memuat anime sedang tayang
          </div>
        )}
      </section>

      {/* Completed/Recent Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Anime Terbaru
          </h2>
        </div>

        {completed.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-0 hide-scrollbar snap-x snap-mandatory">
            {completed.map((anime: Anime) => (
              <div
                key={anime.slug}
                className="min-w-[140px] w-[140px] snap-start"
              >
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 bg-slate-800/50 rounded-xl mx-4 sm:mx-0">
            Gagal memuat anime terbaru
          </div>
        )}
      </section>
    </div>
  );
}
