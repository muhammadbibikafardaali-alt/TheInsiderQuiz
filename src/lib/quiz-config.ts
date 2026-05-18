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
  /** IDs of questions the student got wrong on their most recent attempt */
  wrongQuestionIds?: string[];
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
  wrongQuestionIds: string[] = [],
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
    wrongQuestionIds,
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
 * Reset progress for a single (track, level) combination. Other levels and
 * other tracks are unaffected. If the reset level was the one that unlocked
 * the level above it, the unlock for higher levels is also rolled back so the
 * student must re-pass to access them.
 */
export function resetLevel(
  profile: StudentProfile,
  track: Track,
  level: number,
): StudentProfile {
  const next: StudentProfile = JSON.parse(JSON.stringify(profile));
  const trackProgress = next.tracks[track];
  if (!trackProgress) return next;

  delete trackProgress.levels[level];

  // Roll back the unlock pointer if it was past this level.
  // (We never relock level 1 — it's always available.)
  if (trackProgress.unlockedUpToLevel > level) {
    trackProgress.unlockedUpToLevel = Math.max(1, level);
  }

  return next;
}

/**
 * Aggregate stats across all tracks for the dashboard.
 */
export interface ProfileStats {
  totalAttempts: number;
  totalLevelsPassed: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  overallAccuracy: number; // 0-100
  byTrack: Array<{
    track: Track;
    levelsPassed: number;
    levelsAttempted: number;
    bestAvgScore: number; // 0-10 average of bestScore across attempted levels
  }>;
}

export function computeStats(profile: StudentProfile): ProfileStats {
  let totalAttempts = 0;
  let totalLevelsPassed = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;
  const byTrack: ProfileStats["byTrack"] = [];

  for (const [trackKey, trackProgress] of Object.entries(profile.tracks)) {
    if (!trackProgress) continue;
    const levels = Object.values(trackProgress.levels);
    let trackBestSum = 0;
    let trackPassed = 0;
    for (const lvl of levels) {
      totalAttempts += lvl.attempts;
      totalQuestionsAnswered += lvl.attempts * QUESTIONS_PER_LEVEL;
      totalCorrect += lvl.bestScore;
      trackBestSum += lvl.bestScore;
      if (lvl.passed) {
        totalLevelsPassed += 1;
        trackPassed += 1;
      }
    }
    byTrack.push({
      track: trackKey as Track,
      levelsPassed: trackPassed,
      levelsAttempted: levels.length,
      bestAvgScore: levels.length > 0 ? trackBestSum / levels.length : 0,
    });
  }

  const overallAccuracy =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
      : 0;

  return {
    totalAttempts,
    totalLevelsPassed,
    totalQuestionsAnswered,
    totalCorrect,
    overallAccuracy,
    byTrack: byTrack.sort((a, b) => b.levelsPassed - a.levelsPassed),
  };
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
