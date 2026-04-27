"use client";

import { LocaleProvider, useLocale } from "@/components/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { TrackCard } from "@/components/TrackCard";
import { TRACK_ICONS } from "@/components/trackIcons";
import { allBundles, getAllStats } from "@/data/questions";
import { BookOpen, Target, Layers } from "lucide-react";

function HomeContent() {
  const { locale } = useLocale();
  const stats = getAllStats();

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-caption font-display font-semibold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse"></span>
            {locale === "ar" ? "منصة تدريب عملية" : "Hands-on practice platform"}
          </p>

          <h1 className="font-display font-bold text-4xl sm:text-hero text-ink mb-5 tracking-tight">
            <span className="ltr-inline">
              THE <span className="text-brand-orange">INSIDER</span>
            </span>
            <span className="block mt-1 text-2xl sm:text-3xl text-ink-muted font-medium">
              {locale === "ar"
                ? "اختبر مهاراتك التقنية مثل المحترفين"
                : "Practice IT skills like the pros"}
            </span>
          </h1>

          <p className="text-body text-ink-muted max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            {locale === "ar"
              ? "14 تخصصاً تقنياً. 5 مستويات لكل تخصص. أسئلة عملية صُممت من تجربة حقيقية، باللغة العربية والإنجليزية."
              : "14 IT specializations. 5 levels each. Real-world practice questions crafted from hands-on experience, in Arabic and English."}
          </p>

          {/* Stat row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm">
            <StatPill icon={<Layers size={16} />} value={stats.tracks.toString()} label={locale === "ar" ? "تخصص" : "tracks"} />
            <StatPill icon={<Target size={16} />} value="5" label={locale === "ar" ? "مستويات" : "levels"} />
            <StatPill icon={<BookOpen size={16} />} value={stats.totalQuestions.toString()} label={locale === "ar" ? "سؤال" : "questions"} />
          </div>
        </div>
      </section>

      {/* Track grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-h2 text-ink">
            {locale === "ar" ? "اختر تخصصك" : "Pick a track"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBundles.map((bundle) => (
            <TrackCard
              key={bundle.track}
              bundle={bundle}
              icon={TRACK_ICONS[bundle.track]}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-void-steel py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-caption text-ink-faint">
          {locale === "ar"
            ? "صُنع بواسطة محمد بيبي — للمتعلمين الطموحين"
            : "Built by Muhammad Bibi — for ambitious learners"}
        </div>
      </footer>
    </main>
  );
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-brand bg-void-navy border border-void-steel">
      <span className="text-brand-orange">{icon}</span>
      <span className="font-display font-bold text-ink ltr-inline">{value}</span>
      <span className="text-ink-muted">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <LocaleProvider>
      <HomeContent />
    </LocaleProvider>
  );
}
