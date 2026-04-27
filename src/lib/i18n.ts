// src/lib/i18n.ts
import type { Locale, Localized, Question, TrackBundle } from "@/types/question";

export const DEFAULT_LOCALE: Locale = "ar";
export const SUPPORTED_LOCALES: Locale[] = ["ar", "en"];

export function t(value: Localized | undefined, locale: Locale, fallback = ""): string {
  if (!value) return fallback;
  return value[locale] ?? value[locale === "ar" ? "en" : "ar"] ?? fallback;
}

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}

export function dirAttr(locale: Locale): "rtl" | "ltr" {
  return isRTL(locale) ? "rtl" : "ltr";
}

// ---- Validation (run in CI to catch missing translations) ----

export interface ValidationIssue {
  questionId: string;
  field: string;
  message: string;
}

export function validateQuestion(q: Question): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const need = (val: Localized | undefined, field: string) => {
    if (!val) { issues.push({ questionId: q.id, field, message: "missing" }); return; }
    if (!val.ar?.trim()) issues.push({ questionId: q.id, field, message: "missing ar" });
    if (!val.en?.trim()) issues.push({ questionId: q.id, field, message: "missing en" });
  };

  need(q.question, "question");
  need(q.explanation?.short, "explanation.short");

  if (q.choices) {
    if (q.choices.length < 2) issues.push({ questionId: q.id, field: "choices", message: "<2 choices" });
    q.choices.forEach((c, i) => need(c.text, `choices[${i}].text`));
    const ids = q.choices.map((c) => c.id);
    if (new Set(ids).size !== ids.length) {
      issues.push({ questionId: q.id, field: "choices", message: "duplicate ids" });
    }
  }

  const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
  if (q.choices) {
    const ids = new Set(q.choices.map((c) => c.id));
    correct.forEach((ans) => {
      if (!ids.has(ans)) {
        issues.push({ questionId: q.id, field: "correctAnswer", message: `"${ans}" not in choices` });
      }
    });
  }

  if (q.level < 1 || q.level > 5) {
    issues.push({ questionId: q.id, field: "level", message: "must be 1..5" });
  }

  return issues;
}

export function validateBundle(bundle: TrackBundle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  bundle.questions.forEach((q) => {
    if (ids.has(q.id)) issues.push({ questionId: q.id, field: "id", message: "duplicate" });
    ids.add(q.id);
    issues.push(...validateQuestion(q));
  });
  return issues;
}

export function validateAllBundles(bundles: TrackBundle[]): ValidationIssue[] {
  return bundles.flatMap((b) => validateBundle(b));
}
