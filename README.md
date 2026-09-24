# LogicForge

**A WILLIAM MCADA PRODUCT**

LogicForge is a teacher-designed system for printable collaborative logic/puzzle activities with external-AI content generation, multiple puzzle/game modes, configurable cultural immersion, randomized candidate characteristics, and deduction-focused student materials.

## Canonical project record

**Repository:** `williammcada/LogicForge`  
**Current state:** Active application undergoing round-trip import/export hardening.  
**Handbook:** `williammcada/mcada-project-handbook`

The repository is the canonical home for the current source, permanent project brief, and approved version-specific change specifications. Chat history is working context rather than the permanent project record.

## Documentation

- [`docs/PROJECT-BRIEF.md`](docs/PROJECT-BRIEF.md)
- [`docs/change-specs/`](docs/change-specs/)
- [McAda Project Handbook](https://github.com/williammcada/mcada-project-handbook)

Use the project brief for permanent project-local rules and the change-spec directory for version-specific approved decisions.

## Release workflow

**DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY (when applicable)**

Do not treat a renamed file, README update, successful build, or packaging attempt as proof that the intended release is actually running. Preserve accepted behavior unless the approved change specification deliberately changes it.



## Ownership

**William McAda**  
**A WILLIAM MCADA PRODUCT**

## v0.4.3 candidate — student text and print repairs

[Open/download the candidate HTML](LogicForge_v0.4.3.html). Save it locally and open in a browser. The v0.4.2 source remains preserved.

- AI packets explicitly require a primary-student narrative on the cover and plain prose in culture/clue references.
- Matching keys above 12 questions or key entries use four columns, including decoys. Recording boxes stay in the decoder panel.
- Existing reference equation delimiters no longer print literally; legacy content is preserved as plain text. Newly generated reference content must avoid calculations entirely.

[Approved change specification](docs/change-specs/v0.4.3-STUDENT-TEXT-AND-PRINT.md) · [Verification record](docs/VERIFICATION-v0.4.3.md)

Status: implementation candidate, not verified release. Browser/PDF pagination remains to be checked. No hosting deployment was performed.
