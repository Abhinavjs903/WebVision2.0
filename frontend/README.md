# LogicLoop Frontend

React + Vite + TypeScript frontend for LogicLoop.

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run typecheck
npm run build
```

## Routes

- `/` — overview dashboard
- `/learn` — learning library
- `/learn/:topicId` — topic learning path
- `/visualize` — interactive Binary Search lab
- `/questions` — searchable question bank
- `/questions/:questionId` — guided question detail

## Source layout

- `src/data` — typed topic and question seed content
- `src/engine` — deterministic algorithm trace generators
- `src/store` — client-side learning state
- `src/App.tsx` — routes and experience composition
- `src/styles.css` — hybrid theme and responsive components

The Binary Search visualizer currently supports trace playback, manual stepping, target and array input, sorted rendering, pseudocode synchronization and a prediction check. Arrays, Strings and Linked Lists are represented in the learning and question catalogue; their dedicated trace engines are the next implementation milestone.

Progress is currently in memory and resets after refresh. Persistence and API integration are planned for the backend phase.
