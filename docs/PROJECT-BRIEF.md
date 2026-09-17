# Project Brief — LogicForge

**Brief status:** Migration baseline / requires source verification where noted  
**Brief version:** 0.1  
**Last updated:** 18 September 2026  
**Owner:** William McAda  
**Product credit:** A WILLIAM MCADA PRODUCT  
**Handbook repository:** `williammcada/mcada-project-handbook`  
**Handbook baseline:** `6557a45aaa6d29d7d1abde808e6d0ac248b08820 (AI-START-HERE.md); UNIVERSAL-RULES.md @ aed6fe311aa2e88983f862a30a2d8f05d2ffc04d`  
**Repository:** `williammcada/LogicForge`  
**Canonical source status:** Latest discussed build is v0.4.1; canonical source artifact is TO ESTABLISH from the latest known-good local build before further revision.  
**Current project state:** Active application undergoing round-trip import/export hardening.

## 1. Purpose and audience

LogicForge is a teacher-designed system for printable collaborative logic/puzzle activities with external-AI content generation, multiple puzzle/game modes, configurable cultural immersion, randomized candidate characteristics, and deduction-focused student materials.

**Primary audience / operator:** Teachers creating printable collaborative classroom logic/puzzle experiences.

## 2. Standards selection

**Universal baseline:** U-01 through U-08 where applicable.

**Conditional modules:** S-01 External AI Generation and Structured Import; S-02 Curriculum/Assessment/Evidence; S-04 Distribution/Deployment

Apply only the selected modules and project-local requirements. Do not import restrictions from unrelated projects.

## 3. Project-specific requirements

- Maintain one explicit versioned export/import contract and stop relying on manual screenshot/error bouncing.
- Support the intended puzzle modes, game modes, and cultural-immersion levels without generalizing one mode's fields into all others.
- Guilty/solution placement must not become predictably tied to dossier order.
- Case Mode objects/places must use context-appropriate labels rather than accidental human names.
- Evidence tracking should prioritize fast suspect/object/location elimination rather than unnecessary copying.
- Random candidate characteristics such as favorite food/drink/hobby/business preference remain local configurable content.
- Final packets should identify the game mode and preserve the actual project/design identity.

## 4. Preserve from the current accepted project

- Teacher customization and printable student experience.
- Round-trip AI generation workflow.
- Distinct puzzle/game modes and cultural immersion levels.
- Deduction validity and evidence-tracker focus.
- Provider-neutral generation contract rather than model-specific hidden assumptions.

## 5. Relationship to other projects

- Shares structured-generation principles with TestForge and AAC Studio but keeps its own deduction/candidate contract.
- LogicForge-specific numeric truth values, glossary rules, naming rules, and Cross-Out ordering must not become universal fields.

A conceptual relationship is not proof of an implemented integration. Do not invent a shared API, data schema, identity layer, or deployment dependency without an explicit integration task.

## 6. Source and version discipline

The exact current source artifact or repository commit must be identified before a substantive build. If the field above says the source is not yet established, first locate the latest known-good local file/ZIP or existing repository state and record its exact identity here.

For substantial revisions use:

**DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY (when applicable)**

A packaging/export/deployment failure must not force reconstruction of an already verified build.

## 7. Definition of done

| # | Requirement / check | Result | Evidence / limitation |
| ---: | --- | --- | --- |
| 1 | Representative export/import round trips pass across multiple puzzle/game/cultural-immersion combinations. | Not run | |
| 2 | Wrong design/project/revision packets fail clearly. | Not run | |
| 3 | Generated puzzles have one valid intended solution and non-predictable culprit/target placement. | Not run | |
| 4 | Printable packet, evidence tracker, and answer key remain coherent. | Not run | |
| 5 | No unsupported fields silently disappear during round trip. | Not run | |

Allowed results: **Passed / Failed / Not run / Not applicable**. A "Passed" result requires an actual check against the identified candidate.

## 8. Known issues and migration notes

Migration should preserve the current v0.4.1 work while future testing broadens combinatorial coverage gradually rather than claiming exhaustive proof from a few examples.

## 9. Handoff files

A substantive AI implementation task should retrieve or receive:

1. `AI-START-HERE.md`;
2. `UNIVERSAL-RULES.md`;
3. the relevant sections of `CONDITIONAL-STANDARDS.md`;
4. this project brief;
5. the exact current source artifact/commit;
6. the approved version-specific change specification;
7. applicable assets and deployment configuration.

Do not reconstruct the current implementation from a historical chat summary when the actual source should be available.

## 10. Ownership

**William McAda**  
**A WILLIAM MCADA PRODUCT**
