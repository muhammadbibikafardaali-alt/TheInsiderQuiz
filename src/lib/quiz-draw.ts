// src/lib/quiz-draw.ts
// Builds one quiz attempt from a level's question pool:
//   1. draws `count` questions (previously-missed ones first, then random),
//   2. shuffles the question order,
//   3. shuffles each question's answer options.
//
// Shuffling the options means the correct answer is never "always c" for a
// given question, and the visible label (A–D) comes from the position on
// screen, not from the choice id in the data file. Choice ids and
// correctAnswer are untouched, so scoring and saved progress keep working.

import type { Question } from "@/types/question";

/** Fisher–Yates shuffle. Returns a new array; `rand` is injectable for tests. */
export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Returns a copy of the question with its choices in random order. */
export function shuffleChoices(q: Question, rand: () => number = Math.random): Question {
  if (!q.choices || q.choices.length < 2) return q;
  return { ...q, choices: shuffle(q.choices, rand) };
}

/**
 * Draw one attempt's worth of questions.
 * @param pool        all questions of the level
 * @param count       how many to ask (QUESTIONS_PER_LEVEL)
 * @param retryIds    ids the student missed last time; up to half of the
 *                    attempt is reserved for them so mistakes come back
 */
export function drawAttempt(
  pool: readonly Question[],
  count: number,
  retryIds: readonly string[] = [],
  rand: () => number = Math.random,
): Question[] {
  const n = Math.min(count, pool.length);
  const retrySet = new Set(retryIds);
  const missed = shuffle(pool.filter((q) => retrySet.has(q.id)), rand).slice(
    0,
    Math.floor(n / 2),
  );
  const missedIds = new Set(missed.map((q) => q.id));
  const rest = shuffle(pool.filter((q) => !missedIds.has(q.id)), rand).slice(0, n - missed.length);
  return shuffle([...missed, ...rest], rand).map((q) => shuffleChoices(q, rand));
}

/** Visual label for the option at `index` (A, B, C, …). Arabic uses أ ب ج د. */
export function optionLabel(index: number, locale: "ar" | "en"): string {
  const ar = ["أ", "ب", "ج", "د", "هـ", "و"];
  return locale === "ar" ? ar[index] ?? String(index + 1) : String.fromCharCode(65 + index);
}

/**
 * Split a question into its prompt line and an optional code block.
 * Questions of type "code" put the snippet after the first newline.
 */
export function splitPrompt(text: string): { prompt: string; code: string | null } {
  const i = text.indexOf("\n");
  if (i === -1) return { prompt: text, code: null };
  return { prompt: text.slice(0, i), code: text.slice(i + 1) };
}
