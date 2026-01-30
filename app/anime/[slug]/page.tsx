import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { Star, Calendar, Mic2 } from "lucide-react";
import FavoriteButton from "./FavoriteButton"; // We need to create this client component

export default async function AnimeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = await api.getAnimeDetail(slug);

  if (!anime) {
    return <div className="text-center py-20">Anime tidak ditemukan</div>;
  }

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="relative mb-6">
        <div className="absolute inset-0 h-48 bg-primary/10 blur-[100px] -z-10" />
        <div className="flex gap-4 items-start">
          <div className="relative w-28 aspect-[3/4] flex-shrink-0 rounded-lg overflow-hidden shadow-lg shadow-primary/20">
            <Image
              src={anime.poster}
              alt={anime.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2 pt-1">
            <h1 className="text-xl font-bold leading-tight line-clamp-2">
              {anime.title}
            </h1>

            <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
              <span className="bg-slate-800 px-2 py-1 rounded-md border border-slate-700 flex items-center gap-1">
                <Star
                  size={10}
                  className="text-yellow-400"
                  fill="currentColor"
                />{" "}
                {anime.rating}
              </span>
              <span className="bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                {anime.status}
              </span>
              <span className="bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                {anime.episodeCount} Eps
              </span>
              {anime.type && (
                <span className="bg-slate-800 px-2 py-1 rounded-md border border-slate-700 uppercase">
                  {anime.type}
                </span>
              )}
            </div>

            <div className="space-y-1 text-xs text-slate-400 pt-3 border-t border-white/10 mt-3">
              {anime.studios && anime.studios !== "-" && (
                <div className="flex">
                  <span className="text-slate-500 w-16 shrink-0">Studio:</span>
                  <span className="text-slate-200 line-clamp-1">
                    {anime.studios}
                  </span>
                </div>
              )}
              {anime.releaseDate && (
                <div className="flex">
                  <span className="text-slate-500 w-16 shrink-0">Rilis:</span>
                  <span className="text-slate-200">{anime.releaseDate}</span>
                </div>
              )}
              {anime.duration && (
                <div className="flex">
                  <span className="text-slate-500 w-16 shrink-0">Durasi:</span>
                  <span className="text-slate-200">{anime.duration}</span>
                </div>
              )}
              {anime.season && (
                <div className="flex">
                  <span className="text-slate-500 w-16 shrink-0">Season:</span>
                  <span className="text-slate-200">{anime.season}</span>
                </div>
              )}
              {anime.producers && anime.producers !== "-" && (
                <div className="flex">
                  <span className="text-slate-500 w-16 shrink-0">
                    Produser:
                  </span>
                  <span className="text-slate-200 line-clamp-1">
                    {anime.producers}
                  </span>
                </div>
              )}
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-3">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2">
              <FavoriteButton anime={anime} />
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="mb-6 space-y-2">
        <h2 className="font-semibold text-slate-200">Sinopsis</h2>
        <p className="text-sm text-slate-400 leading-relaxed text-justify line-clamp-6">
          {anime.synopsis}
        </p>
      </div>

      {/* Episodes */}
      <div>
        <h2 className="font-semibold text-slate-200 mb-3">Daftar Episode</h2>
        <div className="grid grid-cols-4 gap-2">
          {anime.episodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/watch/${ep.slug}`}
              className="bg-slate-800 hover:bg-primary hover:text-white transition-colors p-2 rounded-lg text-center text-xs font-medium border border-slate-700 hover:border-primary truncate"
            >
              Eps {ep.episodeNumber}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
