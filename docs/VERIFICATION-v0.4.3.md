# LogicForge v0.4.3 verification record

Status: **Implementation candidate; not a verified release.**

Baseline: 4676247dc92696f1f59bafd7f54713c57ecf174e. Initial remote implementation checkpoint: 3dc568e5b43ee997839f3e6f432a5ca4a1149e57. Final candidate SHA-256: `575d78027ae7de9e9ce4c5a59789e25c08bbb10245fb28fa31812490e6a89667`.

Environment: Node.js VM using the actual application's functions with minimal document/storage stubs. This is not browser execution or evidence of PDF layout. Input: supplied Sea World revision-49 result and corrected prose-only result.

## Passed

- 12 entries use two columns; 13 entries use four; question count also activates four
- generation contract and schema distinguish primary narrative and plain references
- legacy reference display escapes HTML and strips equation delimiters; math answers retain MathML
- malformed, wrong-project and stale imports reject without replacing current content
- revision-49 envelope and all puzzle-bearing content are unchanged
- all five 20-question panels preserve 30 shuffled entries and all 20 recording boxes
- repaired reference sheets render no equation markers or MathML
- JavaScript syntax parsed successfully with Node.

## Not run / limitations

- Physical A4/Letter PDF pagination, browser visual inspection, and full student/teacher print workflow: browser policy rejected local HTML navigation. The independent local Chromium download also failed. No browser restriction was bypassed.
- Exact saved-project import of revision 49: only the AI result was supplied, not the original project with its locked design. Identity fields were deliberately not altered to force acceptance.
- Valid import/export across other modes/depths and real classroom devices. Existing importer code is unchanged.

All five supplied investigations produce a 15-row, four-column key containing all 30 shuffled entries and all 20 recording boxes. Native fractions remain in mathematical answer cells. This structural check does not prove the panel fits on a physical printed page.

## Remaining acceptance check

Open the candidate HTML, open the original saved project, import the corrected revision-49 result, complete teacher review, and print-preview both outputs. For each investigation, confirm all 30 key entries, all 20 boxes and the clue line occupy one page together. Inspect reference wording and the narrative cover. Repeat with A4 and Letter at normal scale. Do not label the candidate a verified release until those checks pass.

Run the checked-in regression script with:

```sh
node tests/student-print.cjs /path/to/original-result.json /path/to/repaired-result.json
```

Without fixture arguments the contract and boundary checks still run. Original user artifacts are not uploaded into the public repository by this change.
