// src/data/questions/index.ts
// Central aggregator for all track bundles.

import type { TrackBundle, Track, Question } from "@/types/question";
import { validateAllBundles } from "@/lib/i18n";

// Original 5 tracks
import { networkingBundle } from "./networking";
import { cybersecurityBundle } from "./cybersecurity";
import { pythonBundle } from "./python";
import { linuxBundle } from "./linux";
import { cloudBundle } from "./cloud";

// Added this session
import { databasesBundle } from "./databases";
import { webBundle } from "./web";
import { devopsBundle } from "./devops";
import { sysadminBundle } from "./sysadmin";
import { operatingSystemsBundle } from "./operating_systems";
import { algorithmsBundle } from "./algorithms";
import { cppBundle } from "./cpp";
import { softwareDevBundle } from "./software_dev";
import { itSupportBundle } from "./it_support";
import { aiPromptingBundle } from "./ai_prompting";

/** All track bundles. The order here is the default display order. */
export const allBundles: TrackBundle[] = [
  // Featured / new
  aiPromptingBundle,

  // Foundations / most popular with Muhammad's audience
  pythonBundle,
  webBundle,
  softwareDevBundle,
  algorithmsBundle,

  // Systems & operations
  linuxBundle,
  sysadminBundle,
  operatingSystemsBundle,
  itSupportBundle,

  // Infrastructure & cloud
  networkingBundle,
  cloudBundle,
  devopsBundle,

  // Data
  databasesBundle,

  // Security
  cybersecurityBundle,

  // Languages
  cppBundle,
];

/** Lookup bundle by track id. */
export function getBundle(track: Track): TrackBundle | undefined {
  return allBundles.find((b) => b.track === track);
}

/** Get all questions for a given level within a track. */
export function getQuestionsByLevel(track: Track, level: number): Question[] {
  const bundle = getBundle(track);
  if (!bundle) return [];
  return bundle.questions.filter((q) => q.level === level);
}

/** Get localized track title. */
export function getTrackTitle(track: Track, locale: "ar" | "en"): string {
  const bundle = getBundle(track);
  if (!bundle) return track;
  return locale === "ar" ? bundle.titleAr : bundle.titleEn;
}

/** Get localized track description. */
export function getTrackDescription(track: Track, locale: "ar" | "en"): string {
  const bundle = getBundle(track);
  if (!bundle) return "";
  return locale === "ar" ? bundle.descriptionAr : bundle.descriptionEn;
}

/** Per-track stats (count per level + total). */
export interface TrackStats {
  track: Track;
  total: number;
  byLevel: Record<number, number>;
}

export function getTrackStats(track: Track): TrackStats | undefined {
  const bundle = getBundle(track);
  if (!bundle) return undefined;
  const byLevel: Record<number, number> = {};
  for (const q of bundle.questions) {
    byLevel[q.level] = (byLevel[q.level] ?? 0) + 1;
  }
  return { track, total: bundle.questions.length, byLevel };
}

/** All-content stats. */
export function getAllStats() {
  const perTrack = allBundles
    .map((b) => getTrackStats(b.track))
    .filter((s): s is TrackStats => Boolean(s));
  const totalQuestions = perTrack.reduce((sum, s) => sum + s.total, 0);
  return {
    tracks: perTrack.length,
    totalQuestions,
    perTrack,
  };
}

/** Run content validation across all bundles (used in CI or on app boot in dev). */
export function runContentValidation() {
  return validateAllBundles(allBundles);
}
