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
  saveProfile,
  resetLevel,
  getLevelsCount,
  PASS_COUNT,
  QUESTIONS_PER_LEVEL,
  type StudentProfile,
} from "@/lib/quiz-config";
import {
  Lock,
  CheckCircle2,
  Play,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  X,
} from "lucide-react";

function TrackContent({ trackId }: { trackId: Track }) {
  const { locale } = useLocale();
  const bundle = getBundle(trackId);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [confirmReset, setConfirmReset] = useState<number | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function handleReset(level: number) {
    if (!profile) return;
    const updated = resetLevel(profile, trackId, level);
    saveProfile(updated);
    setProfile(updated);
    setConfirmReset(null);
  }

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
            const attempted = !!state;
            const passed = state?.passed ?? false;
            const best = state?.bestScore ?? 0;

            return (
              <LevelCard
                key={level}
                trackId={trackId}
                level={level}
                unlocked={unlocked}
                attempted={attempted}
                passed={passed}
                best={best}
                locale={locale}
                onResetClick={() => setConfirmReset(level)}
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

      {/* Reset confirmation modal */}
      {confirmReset !== null && (
        <ResetConfirm
          trackTitle={title}
          level={confirmReset}
          locale={locale}
          onConfirm={() => handleReset(confirmReset)}
          onCancel={() => setConfirmReset(null)}
        />
      )}
    </main>
  );
}

function LevelCard({
  trackId,
  level,
  unlocked,
  attempted,
  passed,
  best,
  locale,
  onResetClick,
}: {
  trackId: Track;
  level: number;
  unlocked: boolean;
  attempted: boolean;
  passed: boolean;
  best: number;
  locale: "ar" | "en";
  onResetClick: () => void;
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
    <div className="card-interactive flex flex-col gap-3 group relative">
      <Link
        href={`/track/${trackId}/level/${level}`}
        className="absolute inset-0 z-0"
        aria-label={`${locale === "ar" ? "ابدأ المستوى" : "Start level"} ${level}`}
      />

      <div className="flex items-center justify-between relative z-10 pointer-events-none">
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

      <p className="text-sm text-ink-muted relative z-10 pointer-events-none">
        {levelLabels[locale][level - 1]}
      </p>

      <div className="mt-auto flex items-center justify-between text-caption text-ink-faint relative z-10 pointer-events-none">
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

      {/* Reset button — only show if level was attempted */}
      {attempted && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onResetClick();
          }}
          className="relative z-20 flex items-center justify-center gap-1.5 mt-1 px-3 py-1.5 rounded-brand text-caption text-ink-muted hover:text-warning hover:bg-warning/10 border border-void-steel hover:border-warning/40 transition-colors font-display font-semibold"
        >
          <RotateCcw size={12} />
          {locale === "ar" ? "إعادة هذا المستوى" : "Reset this level"}
        </button>
      )}
    </div>
  );
}

function ResetConfirm({
  trackTitle,
  level,
  locale,
  onConfirm,
  onCancel,
}: {
  trackTitle: string;
  level: number;
  locale: "ar" | "en";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md card relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-3 end-3 text-ink-muted hover:text-ink"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warning/15 text-warning mb-4">
          <RotateCcw size={22} />
        </div>

        <h3 className="font-display font-bold text-h3 text-ink mb-2">
          {locale === "ar" ? "إعادة المستوى؟" : "Reset this level?"}
        </h3>

        <p className="text-ink-muted text-sm mb-1">
          {locale === "ar" ? (
            <>
              هل أنت متأكد أنك تريد إعادة{" "}
              <span className="text-ink font-semibold">
                {trackTitle} — المستوى{" "}
                <span className="ltr-inline">{level}</span>
              </span>
              ؟
            </>
          ) : (
            <>
              Are you sure you want to reset{" "}
              <span className="text-ink font-semibold">
                {trackTitle} — Level <span className="ltr-inline">{level}</span>
              </span>
              ?
            </>
          )}
        </p>

        <p className="text-caption text-ink-faint mb-6">
          {locale === "ar"
            ? "سيتم مسح تقدمك في هذا المستوى فقط. باقي المستويات والتخصصات لن تتأثر."
            : "Your progress on this level only will be erased. Other levels and tracks won't be affected."}
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
          <button onClick={onCancel} className="btn-ghost">
            {locale === "ar" ? "إلغاء" : "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-brand font-display font-semibold bg-warning text-void transition-all hover:bg-warning/90"
          >
            <RotateCcw size={16} />
            {locale === "ar" ? "نعم، إعادة" : "Yes, reset"}
          </button>
        </div>
      </div>
    </div>
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
