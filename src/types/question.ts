// src/types/question.ts
// Bilingual schema for THE INSIDER. Every user-facing string is {ar, en}.
// UI toggles language without refetching.

export type Locale = "ar" | "en";

export interface Localized {
  ar: string;
  en: string;
}

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType =
  | "mcq"          // single-answer
  | "multi"        // multiple correct
  | "true_false"
  | "terminal"     // CLI / command
  | "code"         // read code, predict output
  | "scenario";    // situational judgment

export type Track =
  | "software_dev"
  | "python"
  | "cpp"
  | "linux"
  | "infrastructure"
  | "networking"
  | "cybersecurity"
  | "cloud"
  | "databases"
  | "web"
  | "operating_systems"
  | "devops"
  | "it_support"
  | "sysadmin"
  | "algorithms"
  | "ai_prompting";

export interface Choice {
  id: string;                     // "a" | "b" | "c" | "d"
  text: Localized;
  rationale?: Localized;          // shown after answering
}

export interface Question {
  id: string;                     // "<prefix>-l<level>-q<nn>"
  track: Track;
  level: number;                  // 1..5
  type: QuestionType;
  difficulty: Difficulty;

  question: Localized;
  choices?: Choice[];
  correctAnswer: string | string[]; // choice id(s)

  explanation: {
    short: Localized;             // required, both languages
    deep?: Localized;
    example?: Localized;
    commonMistake?: Localized;
    realWorld?: Localized;
  };

  tags: string[];
  subcategory?: string;
  estimatedSeconds?: number;

  // Optional practical payloads
  terminalScenario?: {
    prompt: Localized;
    initialOutput?: string;
    expectedCommand?: string | string[];
    acceptedAnswers?: string[];
  };
}

export interface TrackBundle {
  track: Track;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  /** Optional per-track level count (defaults to 5 if undefined). */
  levelsCount?: number;
  questions: Question[];
}
