"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LocaleProvider, useLocale } from "@/components/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { TRACK_ICONS } from "@/components/trackIcons";
import { getBundle } from "@/data/questions";
import type { Track } from "@/types/question";
import {
  isLevelUnlocked,
  loadProfile,
  getLevelsCount,
  PASS_COUNT,
  QUESTIONS_PER_LEVEL,
  type StudentProfile,
} from "@/lib/quiz-config";
import { Lock, CheckCircle2, Play, ArrowRight, ArrowLeft } from "lucide-react";

function TrackContent({ trackId }: { trackId: Track }) {
  const { locale } = useLocale();
  const bundle = getBundle(trackId);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  if (!bundle) {
    return (
      <main className="min-h-screen bg-void">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-ink-muted mb-4">
            {locale === "ar" ? "هذا التخصص غير موجود." : "This track doesn't exist."}
          </p>
          <Link href="/" className="btn-primary">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </main>
    );
  }

  const title = locale === "ar" ? bundle.titleAr : bundle.titleEn;
  const description = locale === "ar" ? bundle.descriptionAr : bundle.descriptionEn;
  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  const levelsCount = getLevelsCount(trackId);
  const levels = Array.from({ length: levelsCount }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-brand-orange transition-colors text-sm mb-6 font-display font-semibold"
        >
          <BackArrow size={16} />
          {locale === "ar" ? "الرئيسية" : "Home"}
        </Link>

        <div className="flex items-start gap-4 mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-brand-lg bg-brand-orange text-white shadow-brand-glow-sm shrink-0">
            {TRACK_ICONS[trackId]}
          </div>
          <div>
            <h1 className="font-display font-bold text-h1 text-ink">{title}</h1>
            <p className="text-ink-muted mt-2 max-w-2xl">{description}</p>
          </div>
        </div>

        <h2 className="font-display font-bold text-h2 text-ink mb-5">
          {locale === "ar" ? "المستويات" : "Levels"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => {
            const unlocked = profile ? isLevelUnlocked(profile, trackId, level) : level === 1;
            const state = profile?.tracks[trackId]?.levels[level];
            const passed = state?.passed ?? false;
            const best = state?.bestScore ?? 0;

            return (
              <LevelCard
                key={level}
                trackId={trackId}
                level={level}
                unlocked={unlocked}
                passed={passed}
                best={best}
                locale={locale}
              />
            );
          })}
        </div>

        <p className="mt-8 text-caption text-ink-faint text-center">
          {locale === "ar"
            ? `تحتاج ${PASS_COUNT} من أصل ${QUESTIONS_PER_LEVEL} للنجاح وفتح المستوى التالي.`
            : `You need ${PASS_COUNT} out of ${QUESTIONS_PER_LEVEL} correct to pass and unlock the next level.`}
        </p>
      </section>
    </main>
  );
}

function LevelCard({
  trackId,
  level,
  unlocked,
  passed,
  best,
  locale,
}: {
  trackId: Track;
  level: number;
  unlocked: boolean;
  passed: boolean;
  best: number;
  locale: "ar" | "en";
}) {
  const levelLabels = {
    ar: ["المبتدئ", "الأساسيات", "التطبيقي", "المتقدم", "الاحترافي"],
    en: ["Beginner", "Fundamentals", "Applied", "Advanced", "Expert"],
  };

  if (!unlocked) {
    return (
      <div className="card opacity-60 cursor-not-allowed flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-ink-muted">
            {locale === "ar" ? "المستوى" : "Level"}{" "}
            <span className="ltr-inline">{level}</span>
          </span>
          <Lock size={18} className="text-ink-faint" />
        </div>
        <p className="text-sm text-ink-muted">{levelLabels[locale][level - 1]}</p>
        <p className="text-caption text-ink-faint mt-auto">
          {locale === "ar" ? "اجتز المستوى السابق" : "Pass the previous level"}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/track/${trackId}/level/${level}`}
      className="card-interactive flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-ink">
          {locale === "ar" ? "المستوى" : "Level"}{" "}
          <span className="ltr-inline">{level}</span>
        </span>
        {passed ? (
          <CheckCircle2 size={20} className="text-success" />
        ) : (
          <Play size={18} className="text-brand-orange" />
        )}
      </div>
      <p className="text-sm text-ink-muted">{levelLabels[locale][level - 1]}</p>
      <div className="mt-auto flex items-center justify-between text-caption text-ink-faint">
        <span>
          {locale === "ar" ? "أفضل نتيجة" : "Best"}:{" "}
          <span className="text-ink font-display font-semibold ltr-inline">
            {best}/{QUESTIONS_PER_LEVEL}
          </span>
        </span>
        {passed && (
          <span className="text-success font-display font-semibold">
            {locale === "ar" ? "مُجتاز" : "Passed"}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function TrackPage() {
  const params = useParams<{ track: string }>();
  return (
    <LocaleProvider>
      <TrackContent trackId={params.track as Track} />
    </LocaleProvider>
  );
}
