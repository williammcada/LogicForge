# Project Brief — LogicForge

**Brief version:** 0.5 — student reference cleanup  
**Owner:** William McAda · **Credit:** A WILLIAM MCADA PRODUCT  
**Status:** Canonical source identity reconciled; release, functional and deployment verification remain separately stated.  
**Repository:** `williammcada/LogicForge`, branch `main`.  
**Current candidate:** LogicForge_v0.5.3.html, application 0.5.3, schema 2.3.0. Automated checks passed; physical PDF and classroom verification remain pending.  
**Source/baseline:** v0.4.3 at 48430905324dad387d6d196b300d0759b976718f. v0.5 implementation checkpoint a191da43b14408f685cc988e880373b10361482f on work/v0.5-student-references.  
**Next work:** Physical browser/PDF verification; see VERIFICATION-v0.5.3.md.  


## 1. Purpose, audience and detailed scope

- Offline teacher authoring app for printable collaborative mathematics/deduction activities; student experience does not require screens. Preserve Who Did It?, Build the Profile and Complete the Case, with distinct puzzle/game mode contracts.
- Support Neutral/Familiar/Deep Dive cultural depth, contextual narratives, glossary/ELL support, customizable candidate characteristics, settings help and CCSS setup where present.
- Preserve the established 32-row five-bit internal matrix and necessary-clue constraints for the relevant mode. Do not impose one mode's matrix, fields or elimination order on unrelated modes.
- Generation packet must be self-contained: schema/version, project/design identity, selected modes, clue/answer rules, required types, valid examples and completeness checks. Validate output packets before handoff, not only incoming JSON.
- Import atomically after validation; reject stale/wrong-design results clearly and leave valid project state intact. Save/open JSON, recent projects, restore points, compatible schema migration and teacher review must remain.
- Avoid predictable last-candidate guilt. Complete the Case objects/places receive contextual names, not human stand-ins. Configurable characteristics can include favorite coffee business without modifying deduction truth rules.
- Student evidence tracker prioritizes usable elimination/deduction over copying internal metadata. Final printed packets identify game mode and provide answer/teacher material.
- Maintain distinct A1–Z26 and answer-associated matching/cross-out mechanics where supported. Exact clue count depends on the selected extraction/deduction design.
- No executable imported rules, hidden web research dependency, punctuation-decoding expansion, or automatic all-mode redesign. Cross-product exchange principles do not make LogicForge truth fields universal.

## 2. This task and boundaries

The v0.5 task implements the September 28 request: omit numeric reference cards/tables and remove circled glossary cross-reference numbers while preserving ELL support and puzzle data. It retains the v0.4.3 student text and decoder-print changes. The browser print-path issue is addressed with setting guidance, not a claim that HTML controls browser headers/footers.

## 3. Standards and adoption

[Canonical handbook](https://github.com/williammcada/mcada-project-handbook). File blob revisions consulted: AI-START-HERE.md 6557a45aaa6d29d7d1abde808e6d0ac248b08820; UNIVERSAL-RULES.md aed6fe311aa2e88983f862a30a2d8f05d2ffc04d; CONDITIONAL-STANDARDS.md dad2d3a05ca0f18260196ea51ac6351bffffdc1c; PROJECT-TEMPLATE.md 574f4c6fcf19ecc2f9e27582fd856fb08123e8da. These are file blobs, not repository commit SHAs.

Relevant rules: U-01 identity, U-02 help, U-03 input validation, U-04 unambiguous math/text where applicable, U-05 reader/device, U-06 preservation, U-07 verification, U-08 local scope. Conditional selection: S-01, S-02, S-04.
Baseline adoption: selected for this documentation task within existing user instructions. Handbook still labels shared scope/modules seeded/draft; no new global rule ratification is inferred. Project-specific approved decisions control their own scope.

## 4. Must-retain behavior

The detailed scope above is the feature-preservation inventory. Preserve existing settings, data, accepted content, assets, exports and compatibility confirmed in source. Distinguish implemented behavior, accepted pending changes and historical requests during intake. A missing entry in this brief is not authorization to remove working behavior. Preserve valid user work during migrations and failures.

## 5. Source, release and deployment discipline

Canonical preserved source: `LogicForge_v0.4.2.html`, Git blob `edd4ff8b7a484ae2d9ee05cfaeae541b6b71a3da`, at source checkpoint `11031634b2687fbc4e4d336798ce29e0ec43f4bd`. The internal project schema 2.3.0 is distinct from the application release label.

See [`MIGRATION-BASELINE.md`](MIGRATION-BASELINE.md) for the authoritative source manifest and the checks actually performed.

DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY.

Use “implementation checkpoint” or “release candidate” before verification. Preserve candidate bytes and logs before packaging; recover that checkpoint after a ZIP/upload failure. Do not rebuild a verified implementation to fix delivery. Repository upload and website deployment are different operations.

## 6. Known issues, conflicts and open evidence

Repeated import failures motivated platform-level contract repairs. No exhaustive claim across modes/cultural depths is justified. Preserve known valid r16 LF-660847F4 packet/import as a candidate regression fixture, not universal proof.

| Conflict or risk | Required handling |
| --- | --- |
| Historical claim versus current source | Inspect exact source; keep historical claim labeled until verified. |
| Proposed next scope versus working baseline | Use the approved version-specific specification; do not silently promote proposals. |
| Other project rules | Do not import AAC quotas, other-game retry counts, or a shared backend without explicit scope. |
| Handbook proposals | No additional exception or proposal is adopted by this brief. |

## 7. Verification contract

Test valid, malformed and wrong-revision imports without state loss; record a mode-by-culture coverage matrix; inspect full printed packets and unique deduction, not merely JSON acceptance.

| Evidence required | Result in this task |
| --- | --- |
| Exact source candidate/commit identified and preserved | Passed — canonical path and source checkpoint recorded in `docs/MIGRATION-BASELINE.md`; no functional verification inferred |
| Project-specific checks above, with inputs and expected/actual results | Not run |
| Save/import/export and malformed-input regression | Not run |
| Intended devices and real deployment path, where applicable | Not run |
| Version, release notes and delivered bytes agree | Not run |

The next build report must name the candidate, environment and test results; historical reports of passing tests do not transfer to a changed candidate.

## 8. Handoff and provenance

Current source identity is recorded in [`MIGRATION-BASELINE.md`](MIGRATION-BASELINE.md). That manifest supersedes earlier unknown-source or pre-upload statements while preserving the original migration note as history.

Required project records: LogicForge_v0.4.2.html; LogicForge_v0.3_Technical_Specification.docx; r16 generation packet and corresponding import; accepted v0.4.1/0.4.2 repair records.

Provenance: previous migration brief and project-history audit in this conversation; directly read dossier/proposal where explicitly stated above. Records not explicitly marked read here are retrieval targets, not claims of fresh inspection. No current app code was tested for this brief.

Before substantive implementation retrieve these records, the current source, approved change spec and applicable handbook. If an indispensable spec is inaccessible, report the gap instead of filling it with invented details. Do not delete unique historical chats/assets until their contents are independently preserved.

## 9. Ecosystem boundary

Shared principles do not establish shared code, accounts or interfaces. MathQuest is engagement, TestForge assessment design, GradePal learner-level evidence, and DataDiver institutional analytics. Integration remains separately specified unless confirmed in source. Other projects remain independent unless their brief explicitly says otherwise.


## 10. September 24 student-publication requirements

Primary-school narrative and simple directions belong on the cover; engine explanations belong in teacher notes. Culture/clue references use prose, not calculations. Above 12 questions or 12 matching entries (including decoys), print two answer/fragment pairs per row and keep the recording boxes and clue line with the key. Preserve schema identity, all deduction data, mathematical question formatting and existing modes.

Candidate: LogicForge_v0.4.3.html on work/v0.4.3-student-print. This is not a verified release; physical browser/PDF checks remain pending. Historical source-baseline sections above remain provenance for v0.4.2.


## 11. v0.5 student reference rules

Number fields never require or print Culture and clue reference cards, including Number fields representing time or distance. New generation omits those guides; old guides remain stored for compatibility. This supersedes the earlier requirement to include guides for every field at higher culture depth. Non-numeric cultural/factual guides remain required under the existing rules.

Student output uses no circled glossary markers. Term headings, definitions, facts and examples remain. Stable glossary IDs and links remain internal. Empty sections are omitted. No new numerical predicates, grading features, or unrelated rules were added.

Handbook rechecked at 6de4cbf33c3b9860125c412359fb64ef3d0b20d1: AI-START-HERE.md, UNIVERSAL-RULES.md, CONDITIONAL-STANDARDS.md (S-01/S-02/S-04) and RELEASE-CHECKLIST.md. Earlier source-baseline and verification sections are historical; the v0.5 verification record controls current claims.


## 12. v0.5.1 teacher summary and multilingual editions

Current candidate is LogicForge_v0.5.1.html, application 0.5.1/schema 2.3.0. This supersedes the current-candidate label above, not historical provenance. Requested scope: compact teacher closing summaries, actual decoder replay in the matrix table, packet-language selection and parallel translated editions through the established AI roundtrip. Source and translated copies preserve math and deduction identities; native-script matching and cross-out do not extend A–Z Alphabet Code. Full imported prose is retained for review. See change-specs-v0.5.1.md and VERIFICATION-v0.5.1.md for behavior and explicit limits.

Handbook rechecked at 00cbde605ab08203b6b5fd2374d225155608fc29: AI-START-HERE, UNIVERSAL-RULES, CONDITIONAL-STANDARDS and RELEASE-CHECKLIST. Newly approved U-09 applies; Recent projects now offers scoped individual/group/all deletion with confirmation and in-tab undo. Only synthetic storage is used for development checks. No cross-product feature scope is inferred.

## 13. v0.5.2 compact investigations and appendix order

Owner requests on 29 September: remove investigation introduction blocks and routine method coaching, use multiple question columns, target one question page and cap at two, and move Culture and clue reference tables plus ELL glossary to the packet's end. Baseline cecad042d480f08258eb665bd0fbeb3f545d327e; handbook revision and applicable files re-read unchanged at 00cbde605ab08203b6b5fd2374d225155608fc29. Read the prior v0.5.1 spec; the current accepted scope is docs/change-specs/v0.5.2-COMPACT-INVESTIGATIONS.md.

Question sheets now use bounded A4/Letter geometry with browser-measured one/two-page partitioning, a separate one-page decoder, and explicit overflow blocking. Never drop questions, split a question block, shrink illegibly or change the mathematical answers to satisfy the page limit. Retain full original prompts/instructions in Review; essential response codes/precision belong in concise printed fields or the question itself. Required review is renewed for the changed layout. Existing projects use the new layout without AI regeneration. All earlier data, decoder and multilingual behavior remain.

Student order: briefing, investigation questions/decoding (with the one-time alphabet key where required), evidence tracker, cultural references, glossary. Empty optional sections remain omitted. No new shared handbook rule is proposed or saved.

## 14. v0.5.3 compact lists

The latest owner instruction supersedes v0.5.2 work spaces, boxes and optional three-column layout. Use two compact columns, single-command pure math, and no reserved working area. Target twenty pure-math questions on one A4 page. Preserve necessary contextual givens and mathematical precision. See change-specs/v0.5.3-COMPACT-LISTS.md; 26 automated regression groups pass, physical PDF verification remains pending. No shared handbook changes.
