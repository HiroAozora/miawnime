"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { StreamData, StreamServer } from "@/types";
import { resolveStreamAction } from "../../app/actions/anime";

interface VideoPlayerProps {
  streamData: StreamData | null;
}

export default function VideoPlayer({ streamData }: VideoPlayerProps) {
  const [streamUrl, setStreamUrl] = useState<string>(
    streamData?.default?.streamUrl || "",
  );
  const [currentQuality, setCurrentQuality] = useState<string>("Default");
  const [currentServer, setCurrentServer] = useState<string>(
    streamData?.default?.server || "Default",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleServerChange = async (server: StreamServer, quality: string) => {
    try {
      setIsLoading(true);
      setCurrentQuality(quality);
      setCurrentServer(server.title);

      const url = await resolveStreamAction(server.href);
      if (url) {
        setStreamUrl(url);
      } else {
        alert("Gagal memuat stream server ini.");
      }
    } catch (error) {
      console.error("Error changing server:", error);
      alert("Terjadi kesalahan saat memuat server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Iframe */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative z-20">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : null}
        <iframe
          key={streamUrl} // Force reload iframe on url change
          src={streamUrl}
          className="w-full h-full border-0"
          allowFullScreen
          referrerPolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Title and Controls */}
      <div className="flex items-center justify-between px-2">
        <h1 className="text-sm sm:text-base font-semibold truncate flex-1 pr-4 text-white">
          {streamData?.title || "Unknown Anime"}
        </h1>

        <div className="flex gap-2">
          {streamData?.prevEpisode ? (
            <Link
              href={`/watch/${streamData.prevEpisode}`}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <button
              className="p-2 bg-slate-800/50 rounded-lg text-slate-500 cursor-not-allowed"
              disabled
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {streamData?.nextEpisode ? (
            <Link
              href={`/watch/${streamData.nextEpisode}`}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors"
            >
              <ChevronRight size={20} />
            </Link>
          ) : (
            <button
              className="p-2 bg-slate-800/50 rounded-lg text-slate-500 cursor-not-allowed"
              disabled
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Quality Selection */}
      <div className="flex flex-wrap gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="font-medium text-emerald-400">Quality:</span>
          <span className="bg-emerald-500/20 px-2 py-1 rounded text-emerald-300">
            {currentQuality}
          </span>
          <span className="font-medium text-emerald-400 ml-2">Server:</span>
          <span className="bg-emerald-500/20 px-2 py-1 rounded text-emerald-300">
            {currentServer}
          </span>
        </div>

        <div className="w-full h-px bg-white/10 my-2" />

        <div className="flex flex-col gap-4 w-full">
          {streamData?.qualities?.map((quality) => (
            <div key={quality.title} className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {quality.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {quality.serverList.map((server) => (
                  <button
                    key={server.serverId}
                    onClick={() => handleServerChange(server, quality.title)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-lg transition-all",
                      currentServer === server.title &&
                        currentQuality === quality.title
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5",
                    )}
                  >
                    {server.title}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {(!streamData?.qualities || streamData.qualities.length === 0) && (
            <p className="text-xs text-slate-500 italic">
              Tidak ada pilihan kualitas tambahan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
