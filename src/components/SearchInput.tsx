"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce"; // We might need to install this or implement custom debounce

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [text, setText] = useState(initialQuery);
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else if (query === "" && initialQuery !== "") {
      router.push("/search");
    }
  }, [query, router, initialQuery]);

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
        placeholder="Cari anime..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button
          onClick={() => setText("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
      )}
    </div>
  );
}
