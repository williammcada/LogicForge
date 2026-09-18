# Migration Baseline — LogicForge

**Recorded:** 18 September 2026  
**Repository:** `williammcada/LogicForge`  
**Branch:** `main`  
**Source-preservation checkpoint:** `11031634b2687fbc4e4d336798ce29e0ec43f4bd`  
**Record status:** Current source identity. This is not by itself a functional-test, release, or deployment claim.

## Canonical source identity

| Field | Value |
| --- | --- |
| Canonical source path | `LogicForge_v0.4.2.html` |
| Git blob SHA | `edd4ff8b7a484ae2d9ee05cfaeae541b6b71a3da` |
| Version represented | Application v0.4.2; project schema 2.3.0 is a separate identifier |
| Repository source checkpoint | `11031634b2687fbc4e4d336798ce29e0ec43f4bd` |

The checkpoint above identifies the application/planning source immediately before this normalization record was committed. Later documentation-only commits do not change the preserved application bytes.

## Verification status

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| Source exists in the default branch | Passed | Repository paths and Git object identities were read directly on 18 September 2026. |
| Byte-preservation comparison | Passed | Passed — the Git blob matched the preserved Library source during the 18 September 2026 audit. |
| Functional workflow | Not run | Source preservation does not establish that imports, gameplay, reports, storage or exports work. |
| Hosted/running application | Not run | Not verified; LogicForge is preserved as a standalone offline HTML application. |

## Documentation authority

- [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md) records purpose, scope, must-retain behavior and verification requirements.
- [`change-specs/INDEX.md`](change-specs/INDEX.md) identifies approved or directional change records.
- [`MIGRATION-NOTE.md`](MIGRATION-NOTE.md) is retained as historical migration context but its pre-upload source-status language is superseded by this baseline.
- This file controls current source identity when an older brief or note says the source was unknown or “TO ESTABLISH.”

## Next gate

Use the committed v0.4.2 source as the baseline and expand the round-trip regression matrix before any stronger compatibility claim.

Do not label a future commit a verified release until the exact candidate has passed the project brief’s required verification and that evidence is preserved.
