// src/lib/quiz-config.ts
// Central config for quiz behavior and progression logic.

import type { Track } from "@/types/question";

// ============================================================================
// PASS THRESHOLD
// ============================================================================
// We use 7/10 = 70% for level unlock.
// Rationale:
//   - 10 questions per level means each question is worth 10% — coarse.
//   - 70% ensures genuine understanding without being punishing.
//   - 60% (6/10) is too lenient: the student can guess 3/4 MCQs and pass.
//   - 80% (8/10) is too strict at early levels where we want momentum.
//   - 70% is the industry-standard entry-level certification threshold
//     (e.g., CompTIA passing scores often sit in this range after scaling).
// ============================================================================
export const PASS_THRESHOLD = 0.7;        // 70%
export const QUESTIONS_PER_LEVEL = 10;
export const LEVELS_PER_TRACK = 5;        // default
export const PASS_COUNT = Math.ceil(QUESTIONS_PER_LEVEL * PASS_THRESHOLD); // = 7

/**
 * Get the number of levels for a specific track.
 * Most tracks have 5 levels; ai_prompting has 3.
 */
export function getLevelsCount(track: Track): number {
  if (track === "ai_prompting") return 3;
  return LEVELS_PER_TRACK;
}

/**
 * True if the student's score on this level is a pass.
 */
export function isPassing(correct: number, total: number = QUESTIONS_PER_LEVEL): boolean {
  if (total === 0) return false;
  return correct / total >= PASS_THRESHOLD;
}

/**
 * Turn a raw score into a human-readable percent.
 */
export function scorePercent(correct: number, total: number = QUESTIONS_PER_LEVEL): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

// ============================================================================
// PROGRESS MODEL (localStorage-backed)
// ============================================================================

export interface LevelProgress {
  track: Track;
  level: number;
  bestScore: number;          // best raw correct count
  attempts: number;
  passed: boolean;
  lastAttemptAt?: string;     // ISO datetime
  weakTags?: string[];        // topics student struggles with
}

export interface TrackProgress {
  track: Track;
  unlockedUpToLevel: number;  // 1..LEVELS_PER_TRACK
  levels: Record<number, LevelProgress>;
}

export interface StudentProfile {
  xp: number;
  streakDays: number;
  lastActiveDate?: string;    // ISO date
  tracks: Partial<Record<Track, TrackProgress>>;
}

const STORAGE_KEY = "insider-it:progress:v1";

export function loadProfile(): StudentProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw) as StudentProfile;
    return { ...emptyProfile(), ...parsed };
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function emptyProfile(): StudentProfile {
  return { xp: 0, streakDays: 0, tracks: {} };
}

/**
 * Record a level attempt and auto-unlock the next level if passed.
 * Returns the updated profile so callers can save it.
 */
export function recordAttempt(
  profile: StudentProfile,
  track: Track,
  level: number,
  correct: number,
  weakTags: string[] = [],
): StudentProfile {
  const next: StudentProfile = JSON.parse(JSON.stringify(profile));
  const trackProgress: TrackProgress =
    next.tracks[track] ?? { track, unlockedUpToLevel: 1, levels: {} };

  const prev = trackProgress.levels[level];
  const passed = isPassing(correct);
  const bestScore = Math.max(prev?.bestScore ?? 0, correct);

  trackProgress.levels[level] = {
    track,
    level,
    bestScore,
    attempts: (prev?.attempts ?? 0) + 1,
    passed: prev?.passed || passed,
    lastAttemptAt: new Date().toISOString(),
    weakTags,
  };

  if (passed && level >= trackProgress.unlockedUpToLevel) {
    trackProgress.unlockedUpToLevel = Math.min(level + 1, getLevelsCount(track));
  }

  next.tracks[track] = trackProgress;

  // XP: 10 per correct answer, +50 bonus for a first-time pass.
  const xpFromAttempt = correct * 10 + (passed && !prev?.passed ? 50 : 0);
  next.xp += xpFromAttempt;

  // Streak
  const today = new Date().toISOString().slice(0, 10);
  if (next.lastActiveDate !== today) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yesterday = y.toISOString().slice(0, 10);
    next.streakDays = next.lastActiveDate === yesterday ? next.streakDays + 1 : 1;
    next.lastActiveDate = today;
  }

  return next;
}

/**
 * Is this level currently unlocked for the student?
 */
export function isLevelUnlocked(profile: StudentProfile, track: Track, level: number): boolean {
  if (level === 1) return true;
  const t = profile.tracks[track];
  if (!t) return level === 1;
  return level <= t.unlockedUpToLevel;
}

/**
 * Given the history of weakTags from failed/weak attempts, summarise weak topics
 * so the review screen can suggest what to revisit.
 */
export function summarizeWeakTopics(profile: StudentProfile, track: Track): string[] {
  const t = profile.tracks[track];
  if (!t) return [];
  const counts: Record<string, number> = {};
  Object.values(t.levels).forEach((lvl) => {
    (lvl.weakTags ?? []).forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
}
