import { api } from "@/services/api";
import Link from "next/link";
import { ScheduleDay } from "@/types";

export const revalidate = 3600;

export default async function SchedulePage() {
  const schedule: ScheduleDay[] = await api.getSchedule();

  return (
    <div className="pb-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Jadwal Rilis Anime</h1>

      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="bg-emerald-500/20 px-4 py-3 border-b border-white/10">
                <h2 className="font-bold text-emerald-300 uppercase tracking-wider text-sm">
                  {day.day}
                </h2>
              </div>
              <div className="divide-y divide-white/10">
                {day.animeList.map((anime) => (
                  <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    className="block px-4 py-3 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {anime.title}
                      </span>
                      {anime.episode && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                          Eps {anime.episode}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
          <p>Gagal memuat jadwal.</p>
        </div>
      )}
    </div>
  );
}
