import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Anime } from "@/types";

export default function AnimeCard({
  anime,
  isHistory = false,
}: {
  anime: Anime | any;
  isHistory?: boolean;
}) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-slate-800 aspect-[3/4]"
    >
      {anime.poster ? (
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-slate-800 text-slate-500">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-3 flex flex-col justify-end">
        <h3 className="font-semibold text-sm line-clamp-2 leading-tight text-white mb-1">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-[10px] text-slate-300">
          {(anime.episodeCount || anime.status) && (
            <span>
              {isHistory
                ? `Eps ${anime.episodeNumber}`
                : `Eps ${anime.episodeCount || anime.status}`}
            </span>
          )}
          {isHistory && <PlayCircle size={14} className="text-primary" />}
        </div>
      </div>
    </Link>
  );
}
