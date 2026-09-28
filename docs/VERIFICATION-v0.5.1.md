# LogicForge v0.5.1 candidate verification

Date: 29 September 2026 (Asia/Shanghai).
Application: 0.5.1. Project/result schema: 2.3.0, preserving old English projects. New localization metadata is required only for non-English designs. Old app versions do not support the new native-script decoder content.

Baseline: 3052975638b256c8a4ed1e2892e3865c331df6f3 on work/v0.5-student-references.
Implementation checkpoints: 4b14ff2376bd7290a441aa0f72c231576fdc0d2d (teacher summaries), 077cdf3e4c998f5d884e8d8558e85823cc6c0a23 (languages and recovery). Test-driven corrections follow these checkpoints.

Run `node tests/teacher-language.cjs`. Exact final source SHA-256 and passing checks are in TEST-RESULTS-v0.5.1.json. Tests load real application JavaScript in Node 24's VM with document and browser-storage stubs; they are not browser or visual tests.

## Passing checks

- Existing paired matching-key thresholds and math rendering; numeric-reference omission and unnumbered glossary; invalid-result preservation.
- Teacher opening contains five actual decoder replays and correct remaining counts. Both condensed summaries are after all investigation answers. Full original text is retained and print overrides work.
- Unicode accents, NFC, non-Latin graphemes, clue masking, three-grapheme matching limit, and A–Z-only Alphabet Code.
- Actual Spanish-accent Answer Matching and Chinese Cross-Out replays. Native-script decoys do not expose survivor letters through a different alphabet. Rendering translations cannot rewrite decoder symbols.
- Complete synthetic 32-suspect/five-clue source passes the real import and structured QA path.
- Translated-copy identity, original download/restore point, exact response counts, saved translation source, target-language fingerprint.
- Parallel-edition guards preserve answer values, question equations and matrix values. Translated import succeeds structurally and changed answers are rejected without replacing content. These synthetic translations verify structure, not Spanish prose quality.
- Required label dictionary, unsafe/missing labels rejected, translated teacher headings, language and RTL direction metadata.
- Scoped saved-work deletion: no changes on opening/cancel, project grouping preserves other projects, clear-all preserves unrelated keys, empty project persists, undo and cancellation, storage-failure reporting. Synthetic storage only; no user work deleted.

## Limits and manual acceptance

- Physical PDF pagination, browser UI interaction, font coverage, and RTL typography are not verified. The session's previously recorded browser policy blocks local HTML; no bypass attempted.
- No fluent-speaker linguistic review or completed real AI Spanish translation has been performed. The feature exports instructions and imports checked content; it is not an embedded translation service.
- Exact source math answers and response counts are preserved in parallel editions. Alphabet Code is explicitly converted to Answer Matching in the new copy because translating an A–Z clue would otherwise change its numerical answers. Fixed budgets still constrain translated clue wording. Cross-Out keeps a maximum of 40 tiles and a left-to-right grid sequence, including RTL editions; translated instructions must explain this.
- Original user project was not available; actual import coverage uses a complete synthetic matrix. Other game modes and exhaustive language/device combinations are not certified.
- Legacy long English teaching notes are an extractive draft capped at 180 words, prioritizing answer conventions, prerequisites and timing. This is not semantic AI summarization. Full imported text remains in Review; edit compact print fields to retain case-specific qualifications. Future AI prompts target 60–90 solution words and 80–120 teaching-note words. Non-English summaries are supplied in the target language by the AI, not heuristically condensed as English.

Candidate status only. Before distributing a packet: inspect its student and teacher previews, compare both editions, confirm fluent-teacher review, and inspect A4/Letter PDFs. No hosted deployment or fully verified release is claimed.
