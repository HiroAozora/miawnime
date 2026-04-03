"use client";

import { useState } from "react";
import { Download, X, ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/services/api";

interface DownloadButtonProps {
  slug: string;
}

type BatchData = Awaited<ReturnType<typeof api.getBatchDownload>>;

export default function DownloadButton({ slug }: DownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BatchData>(null);
  const [error, setError] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    if (data || loading) return;
    setLoading(true);
    setError(false);
    try {
      const result = await api.getBatchDownload(slug);
      setData(result);
      if (!result) setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-sm font-medium"
      >
        <Download size={16} />
        Download Batch
      </button>

      {/* Bottom Sheet Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Download Batch</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            {loading && (
              <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Memuat link download...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-slate-500 text-sm">
                Link download tidak tersedia untuk anime ini.
              </div>
            )}

            {data && !loading && (
              <div className="space-y-4">
                {data.qualities.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-6">
                    Tidak ada link batch tersedia.
                  </p>
                )}
                {data.qualities.map((q) => (
                  <div key={q.name}>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {q.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {q.links.map((link) => (
                        <a
                          key={link.server}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500/30 transition-all"
                        >
                          <ExternalLink size={11} />
                          {link.server}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
