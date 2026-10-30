# LogicLoop

**See the logic. Understand the flow.**

LogicLoop is a visual-first data structures and algorithms (DSA) learning portal. It connects concept explanations, deterministic algorithm visualizations, guided questions and practice in one learning journey.

> Current milestone: frontend foundation and first interactive learning paths for Binary Search, Arrays, Strings and Linked Lists.

---

## Product direction

LogicLoop is designed for learners at different stages—from people encountering data structures for the first time to students preparing for technical interviews.

The experience is organized around a connected learning loop:

**Learn a concept → see it in motion → predict the next step → practise a question → review the reasoning.**

### Product pillars

1. **Visual learning:** make abstract operations observable through interactive diagrams and step-by-step traces.
2. **Question discovery:** find problems by topic, pattern, difficulty and concept—not only by title.
3. **Guided practice:** connect a question to its concept, worked example, hints and follow-up practice.
4. **Active recall:** ask learners to predict an operation before revealing the next trace state.
5. **Progressive depth:** start with intuition and build toward implementation and complexity analysis.

## Frontend experience

The frontend currently includes:

| Area | Current implementation |
|---|---|
| Overview | Learning dashboard, topic cards, question preview and progress summary |
| Learn concepts | Four topic landing pages and concept checklists |
| Binary Search visual lab | Deterministic trace generation, low/high/mid pointers, pseudocode line, explanations, step navigation and prediction prompt |
| Question explorer | Search across titles, summaries, patterns and topic names; topic/difficulty/visual filters |
| Question detail | Guided learning path, hint reveal, question snapshot and completion action |
| Theme | Hybrid light learning surfaces and dark-theme toggle |
| Responsive layout | Desktop sidebar, mobile navigation drawer and responsive cards/workspaces |

### Initial DSA scope

- **Binary Search:** sorted search, search insert position, first/last position and rotated sorted array.
- **Arrays:** Two Sum, stock profit, maximum subarray and move zeroes.
- **Strings:** palindrome, anagram, common prefix and longest unique substring.
- **Linked Lists:** reverse, middle node, merge sorted lists and cycle detection.

The question bank is curated seed content. It is not an integrated third-party problem database, and the initial question pages do not claim to execute submitted solutions.

## Technology stack

### Frontend

- **React 18** — component-based user interface.
- **Vite** — local development server and production bundler.
- **TypeScript** — explicit contracts for UI state and algorithm traces.
- **React Router** — client-side navigation.
- **Tailwind CSS** — theme tokens and utility styling foundation.
- **Motion / Framer Motion** — interface and visualization transitions.
- **Lucide React** — icon system.
- **Zustand** — lightweight client-side progress state.
- **Recharts** — reserved for future learning analytics.

### Planned backend

- **Python + FastAPI** for question, concept, progress and learning APIs.
- **MongoDB** for accounts, bookmarks, progress and persisted learning data.
- **Pydantic** for API request and response validation.

The current frontend is intentionally able to render from local, typed seed data while backend integration is developed separately. Do not add credentials or secrets to source control.

## Repository structure

```text
WebVision2.0/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── styles.css
│       ├── data/
│       │   └── content.ts
│       ├── engine/
│       │   └── binarySearch.ts
│       └── store/
│           └── useProgressStore.ts
├── backend/                  # planned FastAPI service
├── docs/                     # product and engineering documentation
└── README.md
```

## Design system

LogicLoop uses a **hybrid light/dark visual language** rather than forcing one theme onto every task.

- **Light learning space:** concept pages, question discovery, reading and progress overview. Uses a soft paper background, white surfaces, subtle borders and generous spacing.
- **Dark workspace:** reserved for code execution, debugging and deeper developer tooling. The theme toggle is available now; dedicated editor surfaces will be refined as those modules are implemented.
- **Primary accent:** electric indigo (`#7165F5`).
- **Secondary accent:** aqua (`#38CFC8`).
- **Dark canvas:** `#0B1020`.
- **Light canvas:** `#F7F8FC`.
- **Typography:** Space Grotesk for display headings; DM Sans for interface and reading text.

Design principles:
- High information clarity; avoid visual noise.
- Use motion to communicate state changes, not as decoration.
- Give every visual action a textual explanation.
- Preserve keyboard access, readable contrast and reduced-motion preferences.
- Make mobile layouts usable, not merely scaled-down desktop pages.

## Algorithm visualization architecture

Algorithm correctness is separated from animation rendering.

The algorithm engine produces a deterministic sequence of states. The visual layer reads those states to render highlighted values, pointers, pseudocode and explanations. This allows the same trace to support playback, replay, stepping, prediction checks and future video/story mode.

The initial Binary Search engine is in `frontend/src/engine/binarySearch.ts`.

A trace step contains:
- Step index and action.
- A snapshot of the input array.
- Current low, high and mid boundaries.
- Human-readable explanation.
- Corresponding pseudocode line.
- Result index when found.

Future visualizers should follow the same separation:

```text
Algorithm implementation
        ↓
Deterministic trace events
        ↓
Trace player (play / pause / next / previous / seek)
        ↓
SVG / React visual renderer
        ↓
Pseudocode, variable watch and explanation panels
```

For large or user-defined traces, consider storing compact state changes (deltas) and periodic snapshots instead of duplicating the entire array for every event.

## Local development

### Requirements

- Node.js 20 or newer recommended.
- npm.
- Python 3.11+ once the backend is added.

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Vite serves the app at [http://localhost:5173](http://localhost:5173).

### Validate the frontend

```bash
cd frontend
npm run typecheck
npm run build
npm run preview
```

## Implementation roadmap

Build full-stack **module by module**. A module is considered complete only when its concept content, interaction, question links, loading/empty/error states and tests are present.

### Phase 0 — Foundation (current)

- [x] React + Vite + TypeScript scaffold.
- [x] LogicLoop theme tokens and responsive app shell.
- [x] Overview dashboard and topic navigation.
- [x] Seeded question bank for four starter topics.
- [x] Interactive Binary Search trace and player controls.
- [x] Question discovery and guided question detail pages.
- [ ] Automated frontend tests and accessibility review.
- [ ] Validate install, typecheck and production build in a local environment.

### Phase 1 — Complete the four starter learning paths

1. **Binary Search:** add boundary-search variants, sorted-input validation, edge-case lessons and guided questions.
2. **Arrays:** implement traversal, insert/delete, two pointers and prefix-sum visual traces.
3. **Strings:** implement character traversal, frequency maps, palindrome checks and sliding-window traces.
4. **Linked Lists:** implement node creation, traversal, insertion, deletion, reversal and fast/slow pointers.
5. Connect every topic page to its corresponding visual lab and questions.

### Phase 2 — Learning media and active recall

- Produce short, original animated lessons and recorded walkthroughs.
- Add chapter markers, captions and playback controls.
- Add prediction checkpoints to traces.
- Add progressive hints and worked-example comparisons.
- Connect each lesson and visualization to related questions.

### Phase 3 — Practice Arena

- Add a code editor (Monaco).
- Add language selection and starter templates.
- Implement sample/custom test input and clear execution output.
- Connect practice submissions to question progress.
- Add a secure, isolated code execution service before accepting untrusted user code. Never execute user code inside the primary FastAPI web process.

### Phase 4 — Backend and persistence

Suggested API surface:
- `GET /api/health`
- `GET /api/topics`
- `GET /api/concepts/{concept_id}`
- `GET /api/questions` with query, topic, difficulty and pattern filters
- `GET /api/questions/{question_id}`
- `GET /api/lessons/{lesson_id}`
- `PUT /api/progress/{item_id}`
- `GET /api/progress`

Add authentication, persistence, validation, rate limits and observability after the core learning flow is stable.

### Phase 5 — Analysis and personalization

- Explain time and auxiliary-space complexity with explicit assumptions.
- Compare brute-force and improved approaches.
- Use execution benchmarks as empirical measurements—not as proof of Big-O.
- Add personalized review recommendations based on learning history.
- Add optional AI explanations and hints with source-grounded content and learner-controlled reveal.

## Product differentiators

1. **Question-to-visualization connection:** a question should link to the exact concept, relevant trace, lesson and practice activity.
2. **Learner-controlled execution:** pause, advance, reverse, replay and change inputs.
3. **Predict-before-reveal:** ask learners to forecast a pointer move, comparison or state change.
4. **Visible data structure behaviour:** make indices, references, pointers, nodes and call-stack state explicit.
5. **One continuous learning journey:** concept → animation → question → practice → reflection.

These are product goals and implementation priorities, not claims that other learning platforms lack all such capabilities.

## Quality and security principles

- Keep algorithm logic independent of presentation components.
- Test trace output for empty input, one element, duplicates, missing targets and boundary conditions.
- Validate and constrain user-supplied visualizer inputs.
- Do not execute arbitrary code in the browser backend process.
- Use an isolated, resource-limited runner for future code execution.
- Keep API keys in environment variables; commit only an `.env.example`.
- Respect reduced-motion preferences and provide non-animated explanations.
- Do not mark a feature complete until its UI, behavior and failure states have been checked.

## Current status and limitations

This commit establishes the frontend foundation and the first integrated learning flow. It is not yet a complete production platform:

- The current question bank is local seed data.
- Progress currently uses in-memory client state and resets on refresh.
- Binary Search is the first actual trace-based visualizer.
- Other topic pages contain concept scaffolding and curated question routes; their dedicated visual engines are planned.
- Video lessons, Monaco coding workspace, authenticated user accounts, MongoDB persistence, FastAPI APIs and secure code judging are not implemented yet.

Contributions should follow the existing module boundaries and update this README when implementation status changes.
