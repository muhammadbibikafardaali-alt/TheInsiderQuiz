"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LocaleProvider, useLocale } from "@/components/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { TRACK_ICONS } from "@/components/trackIcons";
import {
  loadProfile,
  computeStats,
  summarizeWeakTopics,
  QUESTIONS_PER_LEVEL,
  type StudentProfile,
  type ProfileStats,
} from "@/lib/quiz-config";
import { allBundles, getTrackTitle } from "@/data/questions";
import type { Question, Track } from "@/types/question";
import { t } from "@/lib/i18n";
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  XCircle,
  CheckCircle2,
} from "lucide-react";

function DashboardContent() {
  const { locale } = useLocale();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setStats(computeStats(p));
  }, []);

  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  // Collect all wrong answers across tracks for the Review section
  const wrongAnswerEntries = profile ? collectWrongAnswers(profile) : [];

  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-brand-orange transition-colors text-sm mb-6 font-display font-semibold"
        >
          <Back size={16} />
          {locale === "ar" ? "الرئيسية" : "Home"}
        </Link>

        <h1 className="font-display font-bold text-h1 text-ink mb-2">
          {locale === "ar" ? "تقدمك" : "Your Progress"}
        </h1>
        <p className="text-ink-muted mb-8">
          {locale === "ar"
            ? "تابع نتائجك، نقاط ضعفك، والأسئلة التي أخطأت بها."
            : "Track your scores, weak topics, and questions you missed."}
        </p>

        {/* Top stats grid */}
        {stats && profile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <StatBox
              icon={<Trophy size={18} />}
              value={profile.xp.toString()}
              label={locale === "ar" ? "نقاط" : "XP"}
            />
            <StatBox
              icon={<Flame size={18} />}
              value={profile.streakDays.toString()}
              label={locale === "ar" ? "أيام متتالية" : "Day streak"}
            />
            <StatBox
              icon={<Target size={18} />}
              value={`${stats.overallAccuracy}%`}
              label={locale === "ar" ? "دقة إجمالية" : "Accuracy"}
            />
            <StatBox
              icon={<TrendingUp size={18} />}
              value={stats.totalLevelsPassed.toString()}
              label={locale === "ar" ? "مستويات مجتازة" : "Levels passed"}
            />
          </div>
        )}

        {/* Per-track progress */}
        {stats && stats.byTrack.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display font-bold text-h2 text-ink mb-4">
              {locale === "ar" ? "حسب التخصص" : "By Track"}
            </h2>
            <div className="flex flex-col gap-2">
              {stats.byTrack.map((tStats) => {
                const bundle = allBundles.find((b) => b.track === tStats.track);
                if (!bundle) return null;
                return (
                  <Link
                    key={tStats.track}
                    href={`/track/${tStats.track}`}
                    className="card-interactive flex items-center gap-3 p-4"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-brand bg-void-slate text-brand-orange shrink-0">
                      {TRACK_ICONS[tStats.track]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-ink text-sm sm:text-base truncate">
                        {getTrackTitle(tStats.track, locale)}
                      </div>
                      <div className="text-caption text-ink-muted mt-0.5">
                        <span className="ltr-inline font-semibold text-ink">
                          {tStats.levelsPassed}/{tStats.levelsAttempted}
                        </span>{" "}
                        {locale === "ar" ? "مجتاز" : "passed"}
                        {" • "}
                        <span className="ltr-inline">
                          {locale === "ar" ? "متوسط" : "avg"}{" "}
                          {tStats.bestAvgScore.toFixed(1)}/{QUESTIONS_PER_LEVEL}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Weak topics across all tracks */}
        {profile && (
          <WeakTopicsSection profile={profile} locale={locale} />
        )}

        {/* Wrong answers review */}
        {wrongAnswerEntries.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-warning" />
              <h2 className="font-display font-bold text-h2 text-ink">
                {locale === "ar" ? "مراجعة الأخطاء" : "Review wrong answers"}
              </h2>
            </div>
            <p className="text-caption text-ink-muted mb-4">
              {locale === "ar"
                ? `${wrongAnswerEntries.length} سؤال أخطأت بهم في آخر محاولات. راجع الإجابات الصحيحة:`
                : `${wrongAnswerEntries.length} questions you missed on your latest attempts. Review the correct answers:`}
            </p>
            <div className="flex flex-col gap-2">
              {wrongAnswerEntries.slice(0, 30).map((entry) => (
                <WrongAnswerCard
                  key={`${entry.track}-${entry.level}-${entry.question.id}`}
                  question={entry.question}
                  trackLabel={getTrackTitle(entry.track, locale)}
                  level={entry.level}
                  locale={locale}
                />
              ))}
            </div>
            {wrongAnswerEntries.length > 30 && (
              <p className="text-caption text-ink-faint text-center mt-4">
                {locale === "ar"
                  ? `+${wrongAnswerEntries.length - 30} أسئلة أخرى`
                  : `+${wrongAnswerEntries.length - 30} more questions`}
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {(!stats || stats.byTrack.length === 0) && (
          <div className="card text-center py-10">
            <p className="text-ink-muted mb-4">
              {locale === "ar"
                ? "لم تجرب أي مستوى بعد. ابدأ من الصفحة الرئيسية!"
                : "You haven't attempted any level yet. Start from the home page!"}
            </p>
            <Link href="/" className="btn-primary">
              {locale === "ar" ? "اختر تخصص" : "Pick a track"}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="card !p-4">
      <div className="flex items-center gap-2 text-brand-orange mb-2">
        {icon}
        <span className="text-caption text-ink-faint font-display font-semibold">
          {label}
        </span>
      </div>
      <div className="font-display font-bold text-2xl sm:text-3xl text-ink ltr-inline">
        {value}
      </div>
    </div>
  );
}

function WeakTopicsSection({
  profile,
  locale,
}: {
  profile: StudentProfile;
  locale: "ar" | "en";
}) {
  const allWeak: Record<string, number> = {};
  for (const trackKey of Object.keys(profile.tracks) as Track[]) {
    const topics = summarizeWeakTopics(profile, trackKey);
    topics.forEach((t) => {
      allWeak[t] = (allWeak[t] ?? 0) + 1;
    });
  }
  const sorted = Object.entries(allWeak)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  if (sorted.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-display font-bold text-h2 text-ink mb-4">
        {locale === "ar" ? "مواضيع تحتاج مراجعة" : "Topics to review"}
      </h2>
      <div className="flex flex-wrap gap-2">
        {sorted.map(([tag]) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-brand bg-warning/10 border border-warning/30 text-warning text-caption font-display font-semibold ltr-inline"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function WrongAnswerCard({
  question,
  trackLabel,
  level,
  locale,
}: {
  question: Question;
  trackLabel: string;
  level: number;
  locale: "ar" | "en";
}) {
  const correctId = Array.isArray(question.correctAnswer)
    ? question.correctAnswer[0]
    : question.correctAnswer;
  const correctChoice = question.choices?.find((c) => c.id === correctId);

  return (
    <div className="card !p-4">
      <div className="flex items-start gap-2 mb-2">
        <XCircle size={16} className="text-danger shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <div className="text-caption text-ink-faint mb-1">
            {trackLabel} {" • "}
            <span className="ltr-inline">
              {locale === "ar" ? "م" : "L"}
              {level}
            </span>
          </div>
          <p className="text-ink text-sm leading-relaxed">
            {t(question.question, locale)}
          </p>
        </div>
      </div>
      {correctChoice && (
        <div className="ms-6 mt-2 flex items-start gap-2 p-2.5 rounded-brand bg-success/10 border border-success/30">
          <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5" />
          <p className="text-success text-sm leading-relaxed">
            {t(correctChoice.text, locale)}
          </p>
        </div>
      )}
      {question.explanation?.short && (
        <p className="ms-6 mt-2 text-caption text-ink-muted leading-relaxed">
          {t(question.explanation.short, locale)}
        </p>
      )}
    </div>
  );
}

interface WrongEntry {
  track: Track;
  level: number;
  question: Question;
}

function collectWrongAnswers(profile: StudentProfile): WrongEntry[] {
  const entries: WrongEntry[] = [];
  for (const [trackKey, trackProgress] of Object.entries(profile.tracks)) {
    if (!trackProgress) continue;
    const track = trackKey as Track;
    const bundle = allBundles.find((b) => b.track === track);
    if (!bundle) continue;
    for (const lvl of Object.values(trackProgress.levels)) {
      const wrongIds = lvl.wrongQuestionIds ?? [];
      for (const id of wrongIds) {
        const q = bundle.questions.find((qq) => qq.id === id);
        if (q) entries.push({ track, level: lvl.level, question: q });
      }
    }
  }
  return entries;
}

export default function DashboardPage() {
  return (
    <LocaleProvider>
      <DashboardContent />
    </LocaleProvider>
  );
}
