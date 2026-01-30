import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-700/50 px-4 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image
            src="/miawnime.svg"
            alt="MiawNime Logo"
            fill
            className="object-contain drop-shadow-lg drop-shadow-emerald-500/20"
          />
        </div>
        <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
          MiawNime
        </h1>
      </Link>
    </header>
  );
}
