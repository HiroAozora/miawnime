"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, Info, Calendar } from "lucide-react";
import { cn } from "@/utils/cn";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Beranda", href: "/", icon: Home },
    { label: "Cari", href: "/search", icon: Search },
    { label: "Jadwal", href: "/jadwal", icon: Calendar },
    { label: "Pustaka", href: "/pustaka", icon: Library },
    { label: "Tentang", href: "/about", icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-slate-700/50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
