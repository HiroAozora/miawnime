export default function SkeletonCard() {
  return (
    <div className="relative block overflow-hidden rounded-xl bg-slate-800 aspect-[3/4] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-3 flex flex-col justify-end gap-2">
        <div className="h-3 bg-slate-700 rounded w-4/5" />
        <div className="h-2.5 bg-slate-700 rounded w-2/5" />
      </div>
    </div>
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-x-hidden pb-4 px-4 sm:px-0">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="min-w-[140px] w-[140px] shrink-0">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
