# THE INSIDER — IT Practice Platform

> Bilingual (Arabic/English) practice platform for IT students and junior professionals.
> **15 specializations × 730 questions total** (14 tracks × 5 levels × 50 + AI Prompting × 3 levels × 30).

Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

---

## ✨ Features

- 🌍 **Bilingual** — Arabic (MSA) + English, with full RTL/LTR support
- 📚 **15 IT tracks** — AI Prompt Engineering (NEW!), Python, Web, Linux, Networking, DevOps, Cloud, Cybersecurity, Databases, Algorithms, Software Dev, IT Support, Sysadmin, OS, C++
- 🎯 **5 levels per track** (3 for AI Prompting) — gated unlocking, Beginner → Expert
- ✅ **70% pass threshold** — CompTIA-range standard (7/10 correct)
- 💾 **Progress tracking** — XP, streaks, level unlocks persisted in localStorage. Restart only happens when user explicitly clicks "Retry" on the result screen.
- 📱 **Mobile-first** — optimized for phones first, scales up
- ⚡ **Zero backend** — pure static content, cheap to host, fast to load
- ⚖️ **Balanced answer choices** — all 730 questions across all 15 tracks have been rebalanced so the correct answer doesn't stand out by being the longest. Top 5 tracks (Python/Web/Linux/Cyber/Networking) use hand-authored balanced distractors; the other 9 use plausible domain-pool distractors.

---

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📦 Deploy to Vercel

### Option A — Via GitHub (recommended)

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: THE INSIDER"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/insider-it.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy**

No environment variables needed — everything runs client-side.

### Option B — Via Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## 🧭 Project structure

```
insider-it/
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home (track grid)
│   │   ├── globals.css            # Tailwind + brand tokens
│   │   ├── not-found.tsx
│   │   └── track/[track]/
│   │       ├── page.tsx           # Track detail (level picker)
│   │       └── level/[level]/
│   │           └── page.tsx       # Quiz runner
│   ├── components/
│   │   ├── LocaleProvider.tsx     # Locale context (ar/en)
│   │   ├── Navbar.tsx             # Top bar + language toggle
│   │   ├── TrackCard.tsx          # Home grid card
│   │   └── trackIcons.tsx         # Track → lucide icon map
│   ├── data/questions/
│   │   ├── index.ts               # Aggregator + helpers
│   │   └── {14 track files}.ts    # All question content
│   ├── lib/
│   │   ├── i18n.ts                # t(), validation
│   │   └── quiz-config.ts         # Pass logic, profile storage
│   └── types/
│       └── question.ts            # Type definitions
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 🎨 Brand tokens

Key colors in `tailwind.config.ts`:

- **Brand orange:** `#E8620A` (primary accent)
- **Void (background):** `#070E14`, `#0D1A24`, `#122233`
- **Ink (text):** `#E8E2D9`, `#A8A29E`, `#6B6560`

Fonts (loaded from Google Fonts via `globals.css`):
- **Display:** Space Grotesk
- **Sans (EN):** Inter
- **Sans (AR):** Cairo
- **Mono:** JetBrains Mono

---

## 🧪 Validate content

```ts
import { runContentValidation, getAllStats } from "@/data/questions";

console.log(getAllStats());
// { tracks: 14, totalQuestions: 700, perTrack: [...] }

const errors = runContentValidation();
if (errors.length) console.error("Content issues:", errors);
```

---

## 🗺️ Roadmap ideas

- [ ] Terminal sandbox for CLI questions (xterm.js)
- [ ] Community leaderboard (optional, opt-in)
- [ ] Track-specific review quizzes (weak topics)
- [ ] PWA install + offline support
- [ ] Results sharing (Instagram story export — Muhammad's audience!)

---

Built for [@muhammadbibi.cc](https://instagram.com/muhammadbibi.cc).
