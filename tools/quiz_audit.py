#!/usr/bin/env python3
"""Audit THE INSIDER question bank for answer "giveaways".

The quiz is only useful if a student cannot guess the right option from its
shape. This script reads every question bundle in ``src/data/questions/*.ts``
(no Node needed: it contains a tiny parser for the JS object-literal subset
the data files use) and reports:

* LENGTH       - the correct option is clearly longer than every distractor
                 (the classic "longest answer is right" tell), in EN or AR.
* SHORT        - the correct option is clearly shorter than every distractor.
* ABSOLUTE     - only the distractors use absolute words such as "always",
                 "never", "guarantee", "any", so the careful-sounding option
                 stands out.
* ECHO         - the correct option repeats a word from the question that no
                 distractor repeats.
* CHOICES      - a question does not have exactly 4 options or has duplicate
                 option texts.
* POSITION     - per track, the correct answer sits in one slot (a/b/c/d) far
                 more often than chance. (The app shuffles options at runtime,
                 but a skewed source file is still a smell.)
* COUNT        - a level has fewer than the minimum number of questions.
* DUPLICATE    - two questions share the same English stem.
* RECYCLED     - the same distractor text is reused across many questions
                 (generic filler such as "A protocol for managing
                 communications between distributed services"). Students
                 learn to skip these, so they are as bad as no distractor.

Usage:
    python3 tools/quiz_audit.py                 # human-readable report
    python3 tools/quiz_audit.py --track cloud   # one track only
    python3 tools/quiz_audit.py --json out.json # machine-readable output
    python3 tools/quiz_audit.py --strict        # exit 1 if any ERROR found

Only the Python standard library is used.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
QUESTIONS_DIR = ROOT / "src" / "data" / "questions"

# Tunables -------------------------------------------------------------------
LENGTH_RATIO = 1.35        # correct >= 1.35 x longest distractor  -> LENGTH
SHORT_RATIO = 0.55         # correct <= 0.55 x shortest distractor -> SHORT
MIN_LEN_FOR_RATIO = 12     # ignore very short options like "EC2" / "O(n)"
MIN_PER_LEVEL = 10
POSITION_SHARE_WARN = 0.45  # one slot holds > 45% of correct answers
RECYCLED_MIN_USES = 3       # same distractor text in >= 3 questions -> RECYCLED
RECYCLED_MIN_LEN = 25       # short labels like "O(log n)" or "Stack" may repeat

ABSOLUTE_WORDS_EN = {
    "always", "never", "guarantee", "guarantees", "guaranteed",
    "completely", "entirely", "impossible", "eliminate", "eliminates",
    "eliminating", "automatically", "100%",
}
ABSOLUTE_WORDS_AR = {"دائماً", "دائما", "أبداً", "أبدا", "يضمن", "ضمان", "تلقائياً", "مطلقاً", "إطلاقاً"}

STOPWORDS_EN = {
    "the", "a", "an", "of", "to", "in", "on", "for", "and", "or", "is", "are",
    "what", "which", "why", "how", "does", "do", "with", "by", "it", "its",
    "you", "your", "that", "this", "from", "as", "be", "at", "when", "best",
    "most", "can", "use", "used", "should", "into", "not", "vs", "between",
}


# ---------------------------------------------------------------------------
# A tiny parser for the JS object-literal subset used in the data files
# ---------------------------------------------------------------------------
class ParseError(Exception):
    pass


class JSLiteralParser:
    """Parses objects, arrays, strings, numbers, booleans, null and
    identifiers (returned as {'$ident': name}). Skips // and /* */ comments
    and accepts trailing commas and unquoted keys."""

    def __init__(self, text: str, pos: int = 0) -> None:
        self.text = text
        self.pos = pos

    # -- helpers --
    def _skip(self) -> None:
        t = self.text
        while self.pos < len(t):
            ch = t[self.pos]
            if ch.isspace():
                self.pos += 1
            elif t.startswith("//", self.pos):
                nl = t.find("\n", self.pos)
                self.pos = len(t) if nl == -1 else nl + 1
            elif t.startswith("/*", self.pos):
                end = t.find("*/", self.pos + 2)
                if end == -1:
                    raise ParseError("unterminated block comment")
                self.pos = end + 2
            else:
                break

    def _peek(self) -> str:
        self._skip()
        if self.pos >= len(self.text):
            raise ParseError("unexpected end of input")
        return self.text[self.pos]

    def _expect(self, ch: str) -> None:
        if self._peek() != ch:
            raise ParseError(self._where(f"expected {ch!r}, got {self.text[self.pos]!r}"))
        self.pos += 1

    def _where(self, msg: str) -> str:
        line = self.text.count("\n", 0, self.pos) + 1
        return f"line {line}: {msg}"

    # -- grammar --
    def parse_value(self) -> Any:
        ch = self._peek()
        if ch == "{":
            return self._object()
        if ch == "[":
            return self._array()
        if ch in "\"'`":
            return self._string()
        if ch == "-" or ch.isdigit():
            return self._number()
        ident = self._identifier()
        return {"true": True, "false": False, "null": None, "undefined": None}.get(
            ident, {"$ident": ident}
        )

    def _object(self) -> dict:
        self._expect("{")
        out: dict = {}
        while True:
            if self._peek() == "}":
                self.pos += 1
                return out
            if self.text.startswith("...", self.pos):
                raise ParseError(self._where("spread syntax is not supported"))
            key = self._string() if self._peek() in "\"'" else self._identifier()
            self._expect(":")
            out[key] = self.parse_value()
            if self._peek() == ",":
                self.pos += 1

    def _array(self) -> list:
        self._expect("[")
        out: list = []
        while True:
            if self._peek() == "]":
                self.pos += 1
                return out
            out.append(self.parse_value())
            if self._peek() == ",":
                self.pos += 1

    _ESCAPES = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}

    def _string(self) -> str:
        quote = self._peek()
        self.pos += 1
        buf: list[str] = []
        t = self.text
        while True:
            if self.pos >= len(t):
                raise ParseError("unterminated string")
            ch = t[self.pos]
            if ch == "\\":
                nxt = t[self.pos + 1]
                if nxt == "u":
                    buf.append(chr(int(t[self.pos + 2 : self.pos + 6], 16)))
                    self.pos += 6
                    continue
                buf.append(self._ESCAPES.get(nxt, nxt))
                self.pos += 2
                continue
            if ch == quote:
                self.pos += 1
                return "".join(buf)
            if quote == "`" and t.startswith("${", self.pos):
                raise ParseError(self._where("template interpolation is not supported"))
            buf.append(ch)
            self.pos += 1

    def _number(self) -> float | int:
        m = re.compile(r"-?\d+(\.\d+)?([eE][+-]?\d+)?").match(self.text, self.pos)
        if not m:
            raise ParseError(self._where("bad number"))
        self.pos = m.end()
        s = m.group(0)
        return float(s) if any(c in s for c in ".eE") else int(s)

    def _identifier(self) -> str:
        m = re.compile(r"[A-Za-z_$][\w$]*").match(self.text, self.pos)
        if not m:
            raise ParseError(self._where(f"unexpected {self.text[self.pos]!r}"))
        self.pos = m.end()
        return m.group(0)


BUNDLE_RE = re.compile(r"export\s+const\s+(\w+)\s*:\s*TrackBundle\s*=\s*")


def load_bundle(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    m = BUNDLE_RE.search(text)
    if not m:
        raise ParseError(f"{path.name}: no `export const x: TrackBundle =` found")
    try:
        return JSLiteralParser(text, m.end()).parse_value()
    except ParseError as exc:
        raise ParseError(f"{path.name}: {exc}") from None


def load_all(track: str | None = None) -> list[dict]:
    bundles = []
    for path in sorted(QUESTIONS_DIR.glob("*.ts")):
        if path.name == "index.ts":
            continue
        bundle = load_bundle(path)
        bundle["_file"] = str(path.relative_to(ROOT))
        if track is None or bundle.get("track") == track:
            bundles.append(bundle)
    return bundles


# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------
@dataclass
class Finding:
    severity: str          # "ERROR" | "WARN"
    code: str
    track: str
    question_id: str
    message: str
    file: str = ""


@dataclass
class Report:
    findings: list[Finding] = field(default_factory=list)
    stats: dict = field(default_factory=dict)

    def add(self, *args: Any, **kwargs: Any) -> None:
        self.findings.append(Finding(*args, **kwargs))


def words(text: str) -> list[str]:
    return re.findall(r"[\w%]+", text.lower())


def correct_ids(q: dict) -> list[str]:
    ans = q.get("correctAnswer")
    return ans if isinstance(ans, list) else [ans]


def check_lengths(q: dict, lang: str) -> tuple[str, str] | None:
    """Return (code, message) when the correct option's length stands out."""
    choices = q.get("choices") or []
    right = set(correct_ids(q))
    good = [len(c["text"][lang]) for c in choices if c["id"] in right]
    bad = [len(c["text"][lang]) for c in choices if c["id"] not in right]
    if not good or not bad:
        return None
    g = max(good)
    if g >= MIN_LEN_FOR_RATIO and g >= LENGTH_RATIO * max(bad):
        return ("LENGTH", f"[{lang}] correct option is {g} chars, longest distractor {max(bad)}")
    if min(bad) >= MIN_LEN_FOR_RATIO and g <= SHORT_RATIO * min(bad):
        return ("SHORT", f"[{lang}] correct option is {g} chars, shortest distractor {min(bad)}")
    return None


def check_absolute(q: dict) -> str | None:
    choices = q.get("choices") or []
    if len(choices) < 3:
        return None
    right = set(correct_ids(q))

    def has_abs(c: dict) -> bool:
        en = set(words(c["text"]["en"]))
        ar = c["text"]["ar"]
        return bool(en & ABSOLUTE_WORDS_EN) or any(w in ar for w in ABSOLUTE_WORDS_AR)

    wrong_abs = [c["id"] for c in choices if c["id"] not in right and has_abs(c)]
    right_abs = any(has_abs(c) for c in choices if c["id"] in right)
    if len(wrong_abs) >= 2 and not right_abs:
        return f"absolute wording only in distractors {wrong_abs}"
    return None


def check_echo(q: dict) -> str | None:
    choices = q.get("choices") or []
    stem = {w for w in words(q["question"]["en"]) if w not in STOPWORDS_EN and len(w) > 3}
    if not stem or len(choices) < 3:
        return None
    right = set(correct_ids(q))
    right_hits = set().union(*(stem & set(words(c["text"]["en"])) for c in choices if c["id"] in right))
    wrong_hits = set().union(*(stem & set(words(c["text"]["en"])) for c in choices if c["id"] not in right))
    only_right = right_hits - wrong_hits
    if only_right:
        return f"only the correct option repeats stem word(s): {sorted(only_right)}"
    return None


def audit(bundles: list[dict]) -> Report:
    report = Report()
    seen_stems: dict[str, str] = {}
    totals = Counter()

    # Count how often each distractor text is used across the whole bank
    # (always across all tracks, even when --track narrows the report).
    distractor_uses: Counter = Counter()
    for b in load_all():
        for q in b["questions"]:
            right = set(correct_ids(q))
            for c in q.get("choices") or []:
                if c["id"] not in right:
                    distractor_uses[c["text"]["en"].strip().lower()] += 1

    for b in bundles:
        track = b["track"]
        file = b["_file"]
        per_level = Counter()
        positions = Counter()
        levels_count = b.get("levelsCount", 5)

        for q in b["questions"]:
            qid = q["id"]
            per_level[q["level"]] += 1
            totals["questions"] += 1
            choices = q.get("choices") or []

            # CHOICES
            if q.get("type") in ("mcq", "scenario", "code", "terminal") and len(choices) != 4:
                report.add("WARN", "CHOICES", track, qid, f"{len(choices)} options (expected 4)", file)
            for lang in ("en", "ar"):
                texts = [c["text"][lang].strip().lower() for c in choices]
                if len(set(texts)) != len(texts):
                    report.add("ERROR", "CHOICES", track, qid, f"[{lang}] duplicate option text", file)

            ids = [c["id"] for c in choices]
            for cid in correct_ids(q):
                if cid not in ids:
                    report.add("ERROR", "ANSWER", track, qid, f"correctAnswer {cid!r} not among options", file)
                else:
                    positions[ids.index(cid)] += 1

            # LENGTH / SHORT  (EN is an ERROR, AR alone is a WARN)
            en = check_lengths(q, "en")
            ar = check_lengths(q, "ar")
            if en:
                report.add("ERROR", en[0], track, qid, en[1], file)
            elif ar:
                report.add("WARN", ar[0], track, qid, ar[1], file)

            recycled = [c["id"] for c in choices
                        if c["id"] not in set(correct_ids(q))
                        and len(c["text"]["en"].strip()) >= RECYCLED_MIN_LEN
                        and distractor_uses[c["text"]["en"].strip().lower()] >= RECYCLED_MIN_USES]
            if recycled:
                report.add("ERROR", "RECYCLED", track, qid,
                           f"generic distractor(s) reused across the bank: {recycled}", file)

            msg = check_absolute(q)
            if msg:
                report.add("WARN", "ABSOLUTE", track, qid, msg, file)
            msg = check_echo(q)
            if msg:
                report.add("WARN", "ECHO", track, qid, msg, file)

            stem = " ".join(words(q["question"]["en"]))
            if stem in seen_stems:
                report.add("WARN", "DUPLICATE", track, qid, f"same English stem as {seen_stems[stem]}", file)
            else:
                seen_stems[stem] = qid

        for lvl in range(1, levels_count + 1):
            if per_level[lvl] < MIN_PER_LEVEL:
                report.add("ERROR", "COUNT", track, f"level {lvl}",
                           f"only {per_level[lvl]} questions (min {MIN_PER_LEVEL})", file)

        n = sum(positions.values())
        if n:
            slot, count = positions.most_common(1)[0]
            if count / n > POSITION_SHARE_WARN:
                report.add("WARN", "POSITION", track, "(track)",
                           f"{count}/{n} correct answers are option {'abcd'[slot] if slot < 4 else slot}", file)

        report.stats[track] = {
            "questions": len(b["questions"]),
            "per_level": dict(sorted(per_level.items())),
            "correct_position": {"abcd"[k] if k < 4 else str(k): v for k, v in sorted(positions.items())},
        }

    report.stats["_total_questions"] = totals["questions"]
    return report


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
def print_report(report: Report, verbose: bool) -> None:
    by_track: dict[str, list[Finding]] = defaultdict(list)
    for f in report.findings:
        by_track[f.track].append(f)

    print(f"THE INSIDER question audit - {report.stats['_total_questions']} questions\n")
    header = f"{'track':<18}{'qs':>5}{'errors':>8}{'warns':>7}  correct-position a/b/c/d"
    print(header)
    print("-" * len(header))
    for track, s in report.stats.items():
        if track.startswith("_"):
            continue
        fs = by_track.get(track, [])
        errs = sum(f.severity == "ERROR" for f in fs)
        warns = len(fs) - errs
        pos = "/".join(str(s["correct_position"].get(k, 0)) for k in "abcd")
        print(f"{track:<18}{s['questions']:>5}{errs:>8}{warns:>7}  {pos}")

    codes = Counter((f.severity, f.code) for f in report.findings)
    print("\nFindings by type:")
    for (sev, code), n in sorted(codes.items()):
        print(f"  {sev:<5} {code:<10} {n}")

    if verbose:
        for track, fs in sorted(by_track.items()):
            print(f"\n## {track}")
            for f in sorted(fs, key=lambda f: (f.severity != "ERROR", f.question_id)):
                print(f"  {f.severity:<5} {f.code:<9} {f.question_id:<14} {f.message}")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--track", help="only audit this track id (e.g. cloud)")
    ap.add_argument("--json", metavar="PATH", help="also write findings as JSON")
    ap.add_argument("--quiet", action="store_true", help="summary only, no per-question list")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any ERROR is found")
    args = ap.parse_args(argv)

    try:
        bundles = load_all(args.track)
    except ParseError as exc:
        print(f"parse error: {exc}", file=sys.stderr)
        return 2
    if not bundles:
        print(f"no bundle found for track {args.track!r}", file=sys.stderr)
        return 2

    report = audit(bundles)
    print_report(report, verbose=not args.quiet)

    if args.json:
        Path(args.json).write_text(
            json.dumps({"findings": [asdict(f) for f in report.findings], "stats": report.stats},
                       ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    has_errors = any(f.severity == "ERROR" for f in report.findings)
    return 1 if (args.strict and has_errors) else 0


if __name__ == "__main__":
    sys.exit(main())
