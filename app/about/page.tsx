import { Cat, Heart, Github, Globe, Code, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pb-8 space-y-8">
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="p-4 bg-emerald-500/20 rounded-2xl mb-4 animate-bounce">
          <Cat className="text-emerald-400 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          MiawNime
        </h1>
        <p className="text-slate-400 max-w-sm mx-auto">
          Aplikasi streaming anime gratis tanpa iklan yang mengganggu. Dibuat
          dengan cinta untuk wibu Indonesia.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Tentang</h2>
        <p className="text-slate-300 leading-relaxed text-sm">
          MiawNime adalah proyek open-source yang bertujuan memberikan
          pengalaman menonton anime yang nyaman, cepat, dan modern. Kami tidak
          menyimpan file video di server kami sendiri; semua konten disediakan
          oleh layanan pihak ketiga.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">
          Credits & License
        </h2>
        <ul className="space-y-4 text-sm text-slate-300">
          <li className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <Github size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <strong className="text-white block">API Owner</strong>
              <a
                href="https://github.com/SankaVollereii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline text-xs"
              >
                SankaVollereii
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <Globe size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <strong className="text-white block">API Source</strong>
              <a
                href="https://www.sankavollerei.com/anime/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline text-xs"
              >
                Sankavollerei Anime API
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <Code size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <strong className="text-white block">Source Code</strong>
              <a
                href="https://github.com/HiroAozora/miawnime"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline text-xs"
              >
                HiroAozora/miawnime
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <Shield size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <strong className="text-white block">License</strong>
              <span className="text-xs">MIT License (Open Source)</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="text-center text-xs text-slate-600 mt-8">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-pink-500 fill-pink-500" />{" "}
          by{" "}
          <a
            href="https://github.com/HiroAozora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-emerald-400 transition-colors"
          >
            HiroAozora
          </a>
        </p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
}
