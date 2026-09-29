# LogicForge v0.5.2

**A WILLIAM MCADA PRODUCT**

Offline teacher authoring for printable mathematics mysteries.

[Download LogicForge_v0.5.2.html](LogicForge_v0.5.2.html), save locally, and open in a modern browser.

Status: implementation candidate. Automated contract, import, decoder and generated-output checks pass. Browser/PDF layout and real translated-edition review remain pending.

## This update

- Investigation introductions are no longer printed. Compact numbered questions use two columns, or three for short calculations when needed. The browser targets one question page and permits at most two, with a separate single decoding sheet. Overflow blocks printing instead of clipping questions.
- The exact standalone fraction-division template loses the redundant reciprocal-method sentence. Other wording is retained unless edited in the new Compact printed question field. Essential conventions belong in the optional Short directions field or question prompt.
- Culture/clue reference tables and the ELL glossary now finish the student packet, after the tracker.
- Choose A4 or US Letter in Publish. Use the same paper size, 100% scale and no browser headers/footers in the print dialog. Reconfirm teacher review for the revised question layout.
- Compact solution explanation and teaching notes finish the teacher packet. Full imported text remains in Review, with editable print summaries.
- The five-clue elimination table includes each investigation's actual decoded replay.
- Packet-language selector includes US Spanish, French, Portuguese, German, Chinese, Japanese, Korean, Vietnamese, Arabic, Hindi, Russian, Ukrainian, and a custom language/direction option.
- Create a translated copy from a completed project. This backs up the original, keeps a restore point, and creates a separate project for the normal AI export/import workflow. The culprit, deduction data, response IDs and mathematical answers are protected.
- Native-script Answer Matching and Cross-Out; translated labels and page direction. Alphabet Code remains A–Z. Parallel copies explicitly change Alphabet Code to Answer Matching to retain the same math answers.
- Recent projects now includes scoped deletion and undo controls, following the updated handbook.
- Retains v0.5's omitted numeric reference tables, unnumbered ELL glossary, primary-student story instructions, and paired matching keys above 12 questions or entries.

## Parallel English / Spanish editions

1. Open the completed English project.
2. Under Setup → Packet language, choose **Spanish (US classrooms)** in the translated-copy selector, then **Create translated copy**.
3. Export the new AI generation packet, obtain the completed translated JSON, and import it into this copy.
4. Review both student and teacher output, including native-language clue replay and mathematical wording. A fluent speaker should verify equivalent meaning before classroom use or sale.
5. Save each project and print each edition separately.

Translations use the existing external AI workflow, not an instant built-in translation service. Locked counts can require shorter equivalent clue wording. The teacher app remains English. Use a current browser with Intl.Segmenter and fonts for the selected script.

## Existing projects and printing

Open the saved project JSON, rather than an AI result alone. Existing English content does not require regeneration for the teacher layout changes. Inspect the automatically shortened closing notes in Review before printing; edit them if important teaching rules were omitted.

Turn off **Headers and footers** in the browser print dialog to omit the browser's local file path, date and page numbering. LogicForge retains its own footer.

## Records

- [Project brief](docs/PROJECT-BRIEF.md)
- [v0.5.2 change specification](docs/change-specs/v0.5.2-COMPACT-INVESTIGATIONS.md)
- [Verification and limits](docs/VERIFICATION-v0.5.2.md)
- [Machine test report](docs/TEST-RESULTS-v0.5.2.json)
- [McAda Project Handbook](https://github.com/williammcada/mcada-project-handbook)

Candidate branch: work/v0.5-student-references. Old versions remain preserved. Application version is 0.5.2; the project/result schema remains 2.3.0. Twenty-five automated groups pass, including simulated pagination geometry; physical browser/PDF inspection is still pending.
