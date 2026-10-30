# LogicLoop architecture

## Product boundaries

LogicLoop is a visual-first DSA learning product. Keep the learning experience split into three concerns:

1. **Content** — topic descriptions, lessons, examples, question metadata and learning objectives. Content is data, not JSX.
2. **Algorithm engine** — deterministic, side-effect-free functions that turn validated input into ordered trace frames. Engines do not import React, Zustand, browser APIs or styling.
3. **Presentation** — pages and reusable visual components that render a trace, accept user input and control playback. Presentation must not reimplement algorithm logic.

## Frontend structure

```text
frontend/src/
  components/
    layout/             # app shell, navigation, page chrome
    visualizer/         # trace player, variable inspector, pseudocode
    learning/           # lesson sections, examples, callouts
  data/
    content.ts          # topics and question catalogue
    lessons.ts          # structured lesson content
  engine/
    traceTypes.ts       # renderer-agnostic trace contract
    binarySearch.ts
    arrays.ts
    strings.ts
    linkedLists.ts
  pages/                # route-level screens
  store/                # persisted UI/user progress state
```

The current app is still route-composed in `App.tsx`; move one page at a time into `pages/` rather than performing a risky all-at-once rewrite.

## Trace contract

A trace is an immutable sequence of snapshots. Each `TraceFrame` contains:

- `step`: zero-based frame number
- `line`: pseudocode line identifier
- `message`: explanation of the transition
- `values`: visible data snapshot
- `pointers`: named index references
- `active`: indices to emphasize
- `variables`: values for an inspector
- `status`: running, found, complete or not-found

Engines should clone mutable input, validate assumptions, and return deterministic output. They must never mutate caller-owned input.

## Playback responsibilities

The shared player should own current step, play/pause, speed and reset. It should derive the displayed frame from the trace instead of duplicating algorithm state. Keep playback timing in the UI layer; keep trace generation synchronous and testable.

## Content model

Lessons are structured records with an objective, sections, a worked example, complexity notes and common mistakes. Render lesson records through reusable components. Avoid embedding lesson prose inside route components.

## Quality gates

Before merging a feature:

- Run `npm run typecheck` and `npm run build` from `frontend/`.
- Add deterministic tests for empty input, one-element input, duplicates, negative values and not-found cases where relevant.
- Verify that engines do not mutate their input.
- Check keyboard operation, visible focus, reduced-motion behavior and narrow-screen layouts.
- Keep algorithm complexity claims tied to the actual implementation.
