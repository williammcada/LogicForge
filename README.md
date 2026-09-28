# LogicForge v0.5

**A WILLIAM MCADA PRODUCT**

Offline teacher authoring for printable collaborative mathematics mysteries.

## Current download

[LogicForge_v0.5.html](LogicForge_v0.5.html) — save locally and open in your browser.

Status: v0.5 implementation candidate; automated contract, validator and generated-output checks passed. Physical browser/PDF pagination remains unverified. This is not a verified release or a hosted deployment.

## Changes

- Numeric Culture and clue reference tables are omitted, including number identifiers, times and distances. Students apply the numerical rules themselves.
- Circled glossary-reference numbers are removed from comparison tables, reference tables and glossary headings. The ELL glossary remains available by term.
- New AI packets omit numeric guides; the validator no longer requires them at any cultural depth. Existing numeric guides and all internal glossary links are preserved in saved data.
- Empty reference pages are omitted. Cultural/factual references remain available and required where appropriate.
- Retains v0.4.3's primary-student narrative instructions and four-column matching keys above 12 questions/entries.

## Existing projects

Save your project from your old app first. Open v0.5 and use Open project to load that saved project JSON. The reference and glossary display changes apply immediately to existing generated content; no new AI roundtrip is required. An AI result JSON alone is not a saved project.

Review the student preview before printing. In the browser print dialog, turn off **Headers and footers** to remove the local file path and browser-added date/page numbers. LogicForge retains its own section footer.

## Canonical records

Repository: williammcada/LogicForge. Candidate branch: work/v0.5-student-references.

- [Project brief](docs/PROJECT-BRIEF.md)
- [v0.5 approved change specification](docs/change-specs/v0.5-STUDENT-REFERENCE-CLEANUP.md)
- [Verification record](docs/VERIFICATION-v0.5.md)
- [Change-spec index](docs/change-specs/INDEX.md)
- [McAda Project Handbook](https://github.com/williammcada/mcada-project-handbook)

The v0.4.2 and v0.4.3 source files remain preserved. Project/exchange schema remains 2.3.0; application version is 0.5.0.

Workflow: DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY. Pending physical print verification is recorded explicitly; no fully verified release is claimed.
