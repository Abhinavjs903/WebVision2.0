# LogicLoop delivery roadmap

This roadmap is dependency-aware: independent algorithm engines and lesson content can progress in parallel, but a phase is complete only when its exit criteria pass.

| Phase | Scope | Exit criteria |
|---|---|---|
| 0. Baseline audit | Install, typecheck, build, inspect existing routes and data | Clean baseline or documented blockers |
| 1. Frontend architecture | Shared trace contract, page/component boundaries, content separated from JSX | One trace format is usable by all engines; page extraction does not change routes |
| 2. DSA visual engine | Binary search, arrays, strings and linked-list trace generators | Deterministic snapshots, edge-case tests, no input mutation |
| 3. Learning content | Structured lessons, examples, complexity notes and misconceptions | Each core topic has an objective, lesson, worked example and linked practice |
| 4. Practice arena | Problem statements, editor integration, hints and test cases | User can solve and validate a problem end-to-end |
| 5. Backend foundation | API, persistence, auth and data model | Versioned API and migrations/schema documented |
| 6. Safe code execution | Isolated runner, time/memory limits and test harness | Untrusted code never runs in the API process |
| 7. Learner progress | Profiles, completion history, bookmarks and streaks | Progress persists across sessions and is privacy-aware |
| 8. AI learning assistant | Explanations, hints and debugging support | Responses grounded in problem/test context; no answer fabrication |
| 9. Production launch | Accessibility, performance, observability, security and deployment | Release checklist and rollback plan pass |

## Current implementation slice

- Phase 1: introduced a renderer-agnostic trace frame contract and architecture guidance.
- Phase 2: added reusable trace generators for core array, string and linked-list patterns. Existing binary-search trace remains available.
- Phase 3: added structured first-pass lessons for Binary Search, Arrays, Strings and Linked Lists.

## Immediate next work

1. Connect the new trace generators to a shared visualizer/player UI.
2. Add automated tests for every engine, especially duplicates, empty inputs and pointer boundaries.
3. Extract route-level screens from `App.tsx` into `pages/` after the visualizer contract is stable.
4. Add lesson navigation and render `lessons.ts` through reusable learning components.

Do not start authentication, AI tutoring or arbitrary code execution before the visual learning loop is reliable.
