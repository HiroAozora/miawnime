import { Cat } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-700/50 px-4 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="p-1 bg-primary/20 rounded-lg">
          <Cat className="text-primary" size={24} />
        </div>
        <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
          MiawNime
        </h1>
      </Link>
    </header>
  );
}
