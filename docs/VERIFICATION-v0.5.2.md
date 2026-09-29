# LogicForge v0.5.2 candidate verification

29 September 2026, Asia/Shanghai. Offline single-file application; no deployment requested.

Baseline: v0.5.1 at cecad042d480f08258eb665bd0fbeb3f545d327e. Implementation checkpoint: 20d9652d05b3aaeccfac67697a7b70ce8b7f21fe. Subsequent additions include the owner's appendix-order request and test-driven guards.

Final tested source: LogicForge_v0.5.2.html, SHA-256 `13376a875c4be98cc5ed9d74186e2e72c271bbf1b88b6befc743fbe7868a3bac`. Application 0.5.2, project/result schema 2.3.0. Optional printPrompt and printDirections fields preserve old imports; publication paper/review settings do not change design fingerprints.

## Checks actually run

`node tests/compact-investigations.cjs` runs 25 check groups against actual application JavaScript in Node 24. It retains the previous 18 regression groups and adds:

- Student investigations omit the original introductions; all response IDs remain in order. Question sheets and decoding sheets are separate.
- Culture/clue references and ELL glossary follow the evidence tracker, appear once, and retain existing numeric-reference omission rules.
- Exact standalone Compute/Evaluate templates lose routine reciprocal-method coaching; word-problem givens, rounding instructions and conceptual questions remain untouched. Fraction MathML remains.
- New generation accepts blank legacy instructions. Optional compact prompt edits cannot change the original math markers. Short directions are bounded. Existing review must be renewed for the new layout.
- Row partition handles one-page boundaries, balanced two-page splits, row gaps, oversized indivisible rows, and invalid measurement inputs.
- The actual DOM-reorganization function runs against simulated elements and supplied heights: two-column single-page, three-column single-page, two-page long-question layout, A4/Letter differences, repeated fitting without duplicated/lost questions, oversized question and decoder rejection, and horizontal overflow rejection. This is structural simulation, NOT a browser rendering test.

The machine report lists every group and the exact source hash.

## Runtime behavior and limits

The actual browser measures fixed-width question sheets after fonts are ready and again before printing. It tries one page, then at most two, without scaling text down. Long expressions, figures and wide tables span both columns. Oversized content remains visible and blocks publication; questions are never silently dropped or clipped. Decoding is a separate sheet, checked for one-page fit.

Use the selected A4 or US Letter paper size, 100% scale, 14 mm CSS margins, and browser headers/footers off. Different printer settings can change pagination. The layout preserves 11 pt question text, 10 pt table/key text and 12–16 mm work areas; physical readability still requires inspection.

Not run: real browser interaction, PDF pagination/visual inspection, actual-user-project print roundtrip, fluent-speaker review, exhaustive figure/mode/device combinations. The previously recorded local-HTML browser policy restriction was respected; no alternate browser path was attempted. The user's current saved project was not supplied.

No fully verified release is claimed. Manual acceptance: open the existing project, review short directions/compact prompts for essential response codes and units, reconfirm review, inspect measured student pages and the final A4/Letter PDF. Verify all questions and decoding boxes remain legible, then inspect the reference/glossary appendix.
