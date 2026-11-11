"""Unit tests for quiz_audit.py.  Run:  python3 -m unittest tools/test_quiz_audit.py"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import quiz_audit as qa  # noqa: E402


def make_q(correct_text: str, wrong: list[str], qid: str = "t-l1-q01") -> dict:
    texts = [correct_text, *wrong]
    return {
        "id": qid,
        "track": "test",
        "level": 1,
        "type": "mcq",
        "question": {"en": "What is a stack?", "ar": "ما stack؟"},
        "choices": [{"id": "abcd"[i], "text": {"en": t, "ar": t}} for i, t in enumerate(texts)],
        "correctAnswer": "a",
    }


class ParserTests(unittest.TestCase):
    def test_parses_object_literal_subset(self):
        src = """{ id: "x", n: 3, ok: true, list: [1, 2,], // comment
                   nested: { ar: "نص \\"مقتبس\\"", en: 'single' }, /* block */ }"""
        value = qa.JSLiteralParser(src).parse_value()
        self.assertEqual(value["id"], "x")
        self.assertEqual(value["n"], 3)
        self.assertIs(value["ok"], True)
        self.assertEqual(value["list"], [1, 2])
        self.assertEqual(value["nested"]["ar"], 'نص "مقتبس"')
        self.assertEqual(value["nested"]["en"], "single")

    def test_backticks_inside_strings_are_kept(self):
        value = qa.JSLiteralParser('{ en: "use `alg: none`" }').parse_value()
        self.assertEqual(value["en"], "use `alg: none`")

    def test_all_real_bundles_parse(self):
        bundles = qa.load_all()
        self.assertGreaterEqual(len(bundles), 15)
        for b in bundles:
            self.assertTrue(b["questions"], b["_file"])


class CheckTests(unittest.TestCase):
    def test_length_giveaway_detected(self):
        q = make_q("A very long and detailed correct answer here", ["Short one", "Tiny", "Brief"])
        self.assertEqual(qa.check_lengths(q, "en")[0], "LENGTH")

    def test_balanced_lengths_pass(self):
        q = make_q("Last in, first out", ["First in, first out", "Sorted by priority", "Random access order"])
        self.assertIsNone(qa.check_lengths(q, "en"))

    def test_absolute_words_only_in_distractors(self):
        q = make_q("Usually faster on small inputs",
                   ["Always the fastest option", "Never uses memory", "Works on sorted data"])
        self.assertIsNotNone(qa.check_absolute(q))

    def test_echo(self):
        q = make_q("A stack stores items LIFO", ["Items in FIFO order", "Sorted by key", "Random order"])
        self.assertIn("stack", qa.check_echo(q))


if __name__ == "__main__":
    unittest.main()
