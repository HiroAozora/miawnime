import { Suspense } from "react";
import { api } from "@/services/api";
import SearchInput from "@/components/SearchInput";
import AnimeCard from "@/components/AnimeCard";
import { Anime } from "@/types";

// Wrapper for SearchInput to handle useSearchParams suspense
function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className="h-12 w-full bg-slate-800 rounded-xl animate-pulse" />
      }
    >
      <SearchInput />
    </Suspense>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const results = query ? await api.searchAnime(query) : [];

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold mb-6">Cari Anime</h1>
      <SearchBar />

      {query ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Hasil pencarian untuk{" "}
            <span className="text-primary">"{query}"</span>
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
              {results.map((anime: Anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
              <p className="text-slate-500">
                Tidak ditemukan anime dengan kata kunci tersebut.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50">
          <p className="text-4xl mb-2">🔍</p>
          <p>Ketik judul anime untuk mulai mencari...</p>
        </div>
      )}
    </div>
  );
}
