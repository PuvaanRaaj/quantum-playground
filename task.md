# Quantum Playground — stopped at 60 lessons

## Current instruction: stop

The user explicitly requested: **“update the task.md and stop at 60 lesson, commit and push.”**

That instruction supersedes the earlier request to keep expanding in this session. Exactly 60 lessons are published. Writers have been interrupted and Astra has finished. **Do not generate, review, or publish more lessons automatically.** Resume toward 100 only after the user explicitly asks to continue.

## Completed state

- Public repository: https://github.com/PuvaanRaaj/quantum-playground
- Checkout: ~/programming/quantum-playground; branch main.
- Local preview: http://localhost:5173 — verify whether the existing server is still running before starting another.
- Exactly 60 independently reviewed lesson files under `content/lessons/`.
- Each of the 60 was committed and pushed individually, including the revised original 12. Additional infrastructure/checkpoint commits are separate. Do not squash or rewrite this history.
- Last lesson commit: `5b604d9b3f6e25b0709bbe61c518606b36c623dc` (relativistic-doppler).
- `docs/publication-progress.json` contains every lesson’s commit SHA and push result; `docs/lesson-reviews.json` records the exact content hashes approved by **gpt-6-astra**.
- Subjects: 25 quantum mechanics, 25 mathematics, 9 space/relativity, 1 classical physics.
- Removed slogans/promotional copy, simplified headings and cards, retained light/dark modes, glossary, search, theory-first reading, quizzes, and models.
- Catalog loads lightweight metadata first, then imports the selected chapter separately. Original aggregate lesson files have been removed; the independent JSON files are canonical.
- The original Rust/WebAssembly interference lab and old experiment links remain supported.
- No deployed hosted URL: Sites was disabled for this workspace. Source and local preview are available.
- Optional AI tutor remains interference-only and disabled without server credentials. Do not claim live-provider validation; tests use a mocked provider.

## Remaining work when explicitly resumed

The original target is100 substantial lessons, leaving 40:

- 16 additional Space & relativity lessons.
- 24 Classical physics lessons.

Exact remaining slugs are in **`docs/remaining-lessons.json`**. `docs/curriculum.json` contains the original88-new-lesson plan. Do not recreate already-published lessons.

Two unfinished drafts are preserved in **`docs/pending-drafts/`**. They are not imported into the website and are not approved:

1. **newton-laws:** narrative incorrectly calls the graph a parabola. First output is acceleration versus net force, linear at fixed mass. Correct the description; only displacement versus time is quadratic.
2. **work-energy:** force range includes zero despite the positive-force trajectory from rest assumed in the explanation. Set minimum 0.1 N, or explicitly explain a zero-force algebraic limit. Re-review exact updated bytes.

More detailed author/reviewer scratch files remain in ignored `work/` on this machine. A fresh clone has the complete published history, remaining curriculum, authoring contract, and the two saved drafts, but not the local scratch directory.

## Continuation prompt

When the user asks to resume, follow this request:

> Continue Quantum Playground from its stopped60-lesson checkpoint to exactly 100. Keep the site simple and factual; do not restore motivational slogans. Use `docs/remaining-lessons.json` as the remaining curriculum and `docs/lesson-authoring.md` as the content/model contract. Each lesson must teach the subject in substantial original detail before its model, with vocabulary, historical context, physical reasoning or proof, worked equations, misconceptions, quiz, credible references and clearly stated model limits. Use independent **gpt-6-astra** review of every lesson and its formulas/examples. Fix findings, obtain exact-file approval, then commit and push ONE lesson at a time. Keep progress and this handoff current. Preserve existing lessons, themes, links and functionality. Do not claim simulations prove theories or formal proofs were machine-checked. Finish with exactly 100 verified lessons and a clean pushed repository.

## Resume procedure

1. Inspect `git status`, the publication ledger, and remote main. Preserve unrelated changes. Confirm no previous agents/publishers are still active.
2. After explicit user authorization to resume, change `docs/publication-progress.json` from `stopAt:60` to 100 and update its paused status. The publication helper intentionally refuses a 61st lesson until that limit is changed.
3. Use up to two writers with non-overlapping slug ownership, and an independent reviewer spawned with **model `gpt-6-astra`**. A reviewer’s name alone does not establish the requested model. Do not substitute self-review.
4. Authors write JSON drafts in `work/lesson-drafts/`. Copy the two preserved drafts there if needed. Do not edit published files while another agent is publishing.
5. Read `docs/lesson-authoring.md` and `content/types.ts`. Hard requirements include 650+ original narrative words in `sections`,4+ term definitions,2+ correctly explained equation symbols,2+ topic-specific misconceptions, a valid quiz,2+ relevant sources, and a bounded model. Do not satisfy counts with boilerplate or copied prose.
6. Validate drafts with `node --experimental-strip-types scripts/validate-drafts.mjs SLUG...`.
7. Astra reviews each narrative, numerical example, formula, assumptions, model labels/units/domains, quiz and source relevance. Save approvals in `work/reviews/batch-N.json` with `approved:[slugs]`, `findings:[...]`, and `reviewedHashes:{slug:SHA256}`. Any content change requires approval of the changed bytes.
8. Publish one approved lesson with `node --experimental-strip-types scripts/publish-lesson.mjs SLUG`. It validates exact approved bytes, registers the lesson, runs tests/typecheck, commits and pushes that single lesson, and updates the progress ledger.
9. Never run concurrent publishers or mix unrelated staging with the helper. Commit progress/checkpoint documents separately at milestones. Do not reformat an approved JSON file after hashing.
10. At 100, verify exact count and all checks, update README/task.md/remaining list, commit and push the final checkpoint, and stop all agents.

## Important implementation files

- `content/lessons/*.json`: canonical published lessons.
- `content/types.ts`: lesson and arithmetic-model schema.
- `content/additions.ts`: generated complete registry used in verification.
- `content/library.ts`: generated browser metadata and lazy chapter imports.
- `scripts/register-lessons.mjs`: regenerates both registries; publisher stages both with each lesson.
- `components/calculator-model.tsx`: generic bounded calculator/plot for additional lessons.
- `components/topic-visual.tsx`: existing bespoke models and calculator dispatch.
- `lib/expression.ts`: restricted arithmetic AST evaluator, never eval/Function.
- `lib/lesson-validation.ts`: structural/content/model checks.
- `scripts/publish-lesson.mjs`: exact-review-hash guard and one-lesson commit/push.
- `tests/publication.test.ts`: verifies published files match Astra-approved byte hashes.

The publisher was fixed to write the already-hashed byte snapshot, rather than rereading a draft a writer might change concurrently. If publication is interrupted after push but before the local progress write, inspect the existing lesson commit and remote ancestry and reconstruct the progress record. **Do not blindly rerun over an existing destination or create a duplicate lesson commit.**

Model validation checks endpoints, initial states and sampled inputs; it is not a mathematical proof of validity everywhere. Astra must still inspect formulas and domains. Discrete calculator inputs need integer-safe operations where required. Give every output a distinct label.

## Verification

- `npm test` — physics, arithmetic evaluator, lesson completeness, review hashes and mocked tutor protocol.
- `npm run typecheck`
- `npm run build`
- `npm run test:rust` only if the Rust core changes.
- Browser: catalog/search/glossary, lazy chapter loading, theory before model, model controls, quiz, light/dark persistence, narrow-screen overflow, and legacy interference links.
- Verify published lesson count equals intended stopping point; check local HEAD matches remote main. CI cancels obsolete runs; inspect the final run rather than claiming every intermediate run completed.

No additional lesson work is authorized in this stopped session.
