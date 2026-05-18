"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import { Languages, Zap, BarChart3 } from "lucide-react";

export function Navbar() {
  const { locale, toggle } = useLocale();

  return (
    <nav className="sticky top-0 z-40 border-b border-void-steel bg-void/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-brand bg-brand-orange text-white shadow-brand-glow-sm group-hover:shadow-brand-glow transition-shadow">
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-ink-muted me-1 ltr-inline">THE</span>
            <span className="text-brand-orange">INSIDER</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-brand border border-void-steel text-ink hover:border-brand-orange hover:text-brand-orange transition-colors font-display font-semibold"
            aria-label={locale === "ar" ? "تقدمي" : "My progress"}
          >
            <BarChart3 size={16} />
            <span className="hidden sm:inline">
              {locale === "ar" ? "تقدمي" : "Progress"}
            </span>
          </Link>

          <button
            onClick={toggle}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-brand border border-void-steel text-ink hover:border-brand-orange hover:text-brand-orange transition-colors font-display font-semibold"
            aria-label="Toggle language"
          >
            <Languages size={16} />
            <span>{locale === "ar" ? "EN" : "AR"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
