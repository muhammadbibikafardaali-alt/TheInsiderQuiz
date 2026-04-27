"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import type { TrackBundle } from "@/types/question";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { loadProfile, getLevelsCount } from "@/lib/quiz-config";
import { useEffect, useState } from "react";

interface TrackCardProps {
  bundle: TrackBundle;
  icon: React.ReactNode;
}

export function TrackCard({ bundle, icon }: TrackCardProps) {
  const { locale } = useLocale();
  const title = locale === "ar" ? bundle.titleAr : bundle.titleEn;
  const description = locale === "ar" ? bundle.descriptionAr : bundle.descriptionEn;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const levelsCount = getLevelsCount(bundle.track);
  const totalQuestions = bundle.questions.length;

  const [passed, setPassed] = useState(0);

  useEffect(() => {
    const profile = loadProfile();
    const progress = profile.tracks[bundle.track];
    if (progress) {
      const passedCount = Object.values(progress.levels).filter((l) => l.passed).length;
      setPassed(passedCount);
    }
  }, [bundle.track]);

  return (
    <Link
      href={`/track/${bundle.track}`}
      className="card-interactive group flex flex-col gap-3 h-full"
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-brand bg-void-slate text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="text-caption text-ink-faint ltr-inline">
          {passed}/{levelsCount}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-h3 text-ink">{title}</h3>
        <p className="text-body text-ink-muted mt-1 line-clamp-2 text-sm">
          {description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-caption text-ink-faint font-display">
          {locale === "ar"
            ? `${totalQuestions} سؤال • ${levelsCount} مستويات`
            : `${totalQuestions} questions • ${levelsCount} levels`}
        </span>
        <Arrow
          size={18}
          className="text-ink-muted group-hover:text-brand-orange transition-colors"
        />
      </div>
    </Link>
  );
}
