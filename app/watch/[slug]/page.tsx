import { api } from "@/services/api";
import VideoPlayer from "@/components/VideoPlayer";
import HistoryUpdater from "./HistoryUpdater"; // Helper to update history

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // We need to fetch stream source AND anime info to know next/prev episodes
  // This might require a dedicated endpoint or parsing parsing the Otakudesu page structure if API supports it.
  // api.getStreamSource(slug) returns streams.
  // Limitation: The current API service in api.ts for getStreamSource is minimal.
  // We might not get Next/Prev easily unless the API provides it.
  // WORKAROUND: We will fetch the stream. If possible, we also need the Anime Detail to know the episode list to calculate Prev/Next.
  // But we only have episode slug here.

  // Improvement: api.getStreamSource should return navigation info if avail.
  // For now, let's assume we can get the stream.

  const streamData = await api.getStreamSource(slug);

  // Fetch Anime Detail to allow saving to history
  let animeDetail = null;
  if (streamData?.animeId) {
    animeDetail = await api.getAnimeDetail(streamData.animeId);
  }

  // To support History, we need Anime details.
  // We'll pass the slug to the Client Component HistoryUpdater, which might need to fetch details or just store the slug.
  // Ideally, we pass the full Episode object.

  return (
    <div className="pb-8 space-y-4">
      <HistoryUpdater anime={animeDetail} episodeSlug={slug} />

      <div className="-mx-4 sm:mx-0">
        {streamData ? (
          <VideoPlayer streamData={streamData} />
        ) : (
          <div className="aspect-video bg-black flex items-center justify-center text-slate-500">
            Stream belum tersedia :(
          </div>
        )}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
        <p className="text-xs text-yellow-500 text-center">
          Gunakan Brave Browser atau DNS AdGuard jika video mengandung banyak
          iklan popup.
        </p>
      </div>
    </div>
  );
}
