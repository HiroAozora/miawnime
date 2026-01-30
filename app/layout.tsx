import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiawNime",
  description: "Aplikasi streaming anime gratis tanpa iklan yang mengganggu.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${inter.className} antialiased pb-20 bg-background text-foreground min-h-screen`}
      >
        <div className="max-w-md mx-auto min-h-screen shadow-2xl shadow-black bg-background relative border-x border-slate-800">
          <Header />
          <main className="p-4 min-h-[calc(100vh-64px-64px)]">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
