"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LocaleProvider, useLocale } from "@/components/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { getBundle, getQuestionsByLevel } from "@/data/questions";
import type { Question, Track } from "@/types/question";
import { t } from "@/lib/i18n";
import {
  isPassing,
  loadProfile,
  recordAttempt,
  saveProfile,
  scorePercent,
  getLevelsCount,
  QUESTIONS_PER_LEVEL,
  PASS_COUNT,
} from "@/lib/quiz-config";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  RotateCcw,
  Home,
  Info,
} from "lucide-react";

function QuizContent({ trackId, level }: { trackId: Track; level: number }) {
  const { locale } = useLocale();
  const router = useRouter();

  // Freeze questions on mount — safe even if empty
  const maxLevel = getLevelsCount(trackId);
  const initial = useMemo(() => {
    if (level < 1 || level > maxLevel) return [];
    return getQuestionsByLevel(trackId, level);
  }, [trackId, level, maxLevel]);

  const [questions] = useState<Question[]>(initial);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q) => {
      const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
      return acc + (answers[q.id] === correct ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  const bundle = getBundle(trackId);

  // After all hooks — we can safely return error UI without violating rules of hooks
  if (!bundle || questions.length === 0 || level < 1 || level > maxLevel) {
    return (
      <main className="min-h-screen bg-void">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-ink-muted mb-4">
            {locale === "ar" ? "هذا المستوى غير متاح." : "This level isn't available."}
          </p>
          <Link href="/" className="btn-primary">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </main>
    );
  }

  const current = questions[currentIdx];
  const userAnswer = answers[current.id];
  const isRevealed = revealed[current.id];
  const isLast = currentIdx === questions.length - 1;

  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  function handleSelect(choiceId: string) {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [current.id]: choiceId }));
  }

  function handleReveal() {
    if (!userAnswer) return;
    setRevealed((prev) => ({ ...prev, [current.id]: true }));
  }

  function handleNext() {
    if (!isRevealed) return;
    if (isLast) {
      finishQuiz();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }

  function finishQuiz() {
    const weakTags = questions
      .filter((q) => {
        const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
        return answers[q.id] !== correct;
      })
      .flatMap((q) => q.tags);

    const updated = recordAttempt(loadProfile(), trackId, level, correctCount, weakTags);
    saveProfile(updated);
    setFinished(true);
  }

  function handleRetry() {
    setAnswers({});
    setRevealed({});
    setCurrentIdx(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <ResultScreen
        trackId={trackId}
        correct={correctCount}
        total={questions.length}
        questions={questions}
        answers={answers}
        onRetry={handleRetry}
        onHome={() => router.push(`/track/${trackId}`)}
      />
    );
  }

  const correctChoiceId = Array.isArray(current.correctAnswer)
    ? current.correctAnswer[0]
    : current.correctAnswer;
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/track/${trackId}`}
            className="inline-flex items-center gap-2 text-ink-muted hover:text-brand-orange transition-colors text-sm font-display font-semibold"
          >
            <Back size={16} />
            {locale === "ar" ? "عودة" : "Back"}
          </Link>
          <span className="text-caption text-ink-muted">
            {locale === "ar" ? "المستوى" : "Level"}{" "}
            <span className="ltr-inline text-ink font-display font-semibold">{level}</span>
            {"  •  "}
            <span className="ltr-inline">
              {currentIdx + 1}/{questions.length}
            </span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-void-slate rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-brand-orange transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="card mb-6 animate-fade-in" key={current.id}>
          <div className="flex items-start gap-2 mb-4">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-brand-orange/15 text-brand-orange text-xs font-display font-bold ltr-inline">
              {currentIdx + 1}
            </span>
            <h2 className="font-display font-semibold text-lg sm:text-xl text-ink leading-relaxed">
              {t(current.question, locale)}
            </h2>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-2.5 mt-6">
            {current.choices?.map((choice) => {
              const selected = userAnswer === choice.id;
              const isCorrect = choice.id === correctChoiceId;
              const showResult = isRevealed;

              let cls = "border-void-steel bg-void-slate hover:border-brand-orange/50";
              if (showResult && isCorrect) {
                cls = "border-success/60 bg-success/10";
              } else if (showResult && selected && !isCorrect) {
                cls = "border-danger/60 bg-danger/10";
              } else if (selected) {
                cls = "border-brand-orange bg-brand-orange/10";
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelect(choice.id)}
                  disabled={isRevealed}
                  className={`flex items-start gap-3 p-4 rounded-brand border-2 transition-all text-left rtl:text-right ${cls} ${
                    isRevealed ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current text-caption font-display font-bold uppercase ltr-inline">
                    {choice.id}
                  </span>
                  <span className="text-ink text-sm sm:text-base flex-1 leading-relaxed">
                    {t(choice.text, locale)}
                  </span>
                  {showResult && isCorrect && (
                    <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
                  )}
                  {showResult && selected && !isCorrect && (
                    <XCircle size={20} className="text-danger shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isRevealed && (
            <div className="mt-6 p-4 rounded-brand bg-void border border-brand-orange/30 animate-slide-up">
              <div className="flex items-start gap-2">
                <Info size={18} className="text-brand-orange shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="text-ink leading-relaxed">
                    {t(current.explanation.short, locale)}
                  </p>
                  {current.explanation.realWorld && (
                    <p className="text-ink-muted leading-relaxed">
                      {t(current.explanation.realWorld, locale)}
                    </p>
                  )}
                  {current.explanation.commonMistake && (
                    <p className="text-warning text-xs">
                      <span className="font-display font-semibold">
                        {locale === "ar" ? "خطأ شائع: " : "Common mistake: "}
                      </span>
                      {t(current.explanation.commonMistake, locale)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-end gap-3">
          {!isRevealed ? (
            <button
              onClick={handleReveal}
              disabled={!userAnswer}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand-orange disabled:hover:shadow-none"
            >
              {locale === "ar" ? "تحقق من الإجابة" : "Check answer"}
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {isLast
                ? locale === "ar"
                  ? "عرض النتيجة"
                  : "See result"
                : locale === "ar"
                ? "السؤال التالي"
                : "Next question"}
              <Forward size={16} />
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

function ResultScreen({
  trackId,
  correct,
  total,
  questions,
  answers,
  onRetry,
  onHome,
}: {
  trackId: Track;
  correct: number;
  total: number;
  questions: Question[];
  answers: Record<string, string>;
  onRetry: () => void;
  onHome: () => void;
}) {
  const { locale } = useLocale();
  const passed = isPassing(correct, total);
  const percent = scorePercent(correct, total);

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="card text-center py-10 sm:py-14 mb-6 animate-fade-in">
          <div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-full mb-5 ${
              passed ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
            }`}
          >
            {passed ? <Trophy size={32} /> : <RotateCcw size={28} />}
          </div>

          <h1 className="font-display font-bold text-h1 text-ink mb-2">
            {passed
              ? locale === "ar"
                ? "أحسنت!"
                : "Well done!"
              : locale === "ar"
              ? "قرّبت، حاول مرة أخرى"
              : "Close — try again"}
          </h1>

          <p className="text-ink-muted mb-6">
            {locale === "ar"
              ? passed
                ? "لقد أتقنت هذا المستوى. المستوى التالي فُتح لك."
                : `تحتاج ${PASS_COUNT} صحيحة لاجتياز المستوى.`
              : passed
              ? "You've mastered this level. The next one is unlocked."
              : `You need ${PASS_COUNT} correct answers to pass.`}
          </p>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div>
              <div className="text-4xl sm:text-5xl font-display font-bold text-ink ltr-inline">
                {correct}
                <span className="text-ink-faint">/{total}</span>
              </div>
              <div className="text-caption text-ink-muted mt-1">
                {locale === "ar" ? "صحيحة" : "Correct"}
              </div>
            </div>
            <div className="h-10 w-px bg-void-steel"></div>
            <div>
              <div className="text-4xl sm:text-5xl font-display font-bold text-brand-orange ltr-inline">
                {percent}%
              </div>
              <div className="text-caption text-ink-muted mt-1">
                {locale === "ar" ? "النسبة" : "Score"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={onRetry} className="btn-ghost">
              <RotateCcw size={16} />
              {locale === "ar" ? "أعد المحاولة" : "Retry"}
            </button>
            <button onClick={onHome} className="btn-primary">
              <Home size={16} />
              {locale === "ar" ? "عودة للتخصص" : "Back to track"}
            </button>
          </div>
        </div>

        {/* Review list */}
        <h2 className="font-display font-bold text-h3 text-ink mb-3">
          {locale === "ar" ? "مراجعة الإجابات" : "Review"}
        </h2>
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => {
            const correctId = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
            const isCorrect = answers[q.id] === correctId;
            return (
              <div
                key={q.id}
                className={`flex items-start gap-3 p-3 rounded-brand border ${
                  isCorrect ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={18} className="text-danger shrink-0 mt-0.5" />
                )}
                <span className="text-sm text-ink leading-relaxed">
                  <span className="text-ink-muted font-display font-semibold ltr-inline me-1">
                    {i + 1}.
                  </span>
                  {t(q.question, locale)}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function QuizPage() {
  const params = useParams<{ track: string; level: string }>();
  const trackId = (params?.track ?? "python") as Track;
  const level = parseInt(params?.level ?? "1", 10);

  return (
    <LocaleProvider>
      <QuizContent trackId={trackId} level={level} />
    </LocaleProvider>
  );
}
