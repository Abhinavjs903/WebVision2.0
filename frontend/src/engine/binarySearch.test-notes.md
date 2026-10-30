# Binary Search trace invariants

The visualizer's seeded input must be sorted. The trace generator sorts the supplied numeric values before tracing, so the displayed order and the algorithm's input always agree.

Expected edge cases for automated tests:
- Empty array: one terminal `not-found` step; no invalid midpoint access.
- One element found: check followed by found.
- One element missing: check, boundary discard, not-found.
- Duplicate values: a matching index is returned; this implementation does not promise first/last occurrence.
- Target lower than all values or greater than all values: terminate with not-found.
- Negative integers and zero: supported.
- Non-finite inputs should be filtered by the input adapter before trace generation.

Future tests should assert that low/high shrink monotonically, midpoint always lies in the active range during check steps, foundIndex matches the target, and all emitted snapshots are deterministic.