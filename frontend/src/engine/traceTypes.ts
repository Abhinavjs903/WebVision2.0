/** Shared, renderer-agnostic contract for algorithm visualizations. */
export type TraceScalar = number | string | boolean | null;
export type TraceStatus = "running" | "found" | "complete" | "not-found";

export type TraceFrame = {
  /** Zero-based frame position in the generated trace. */
  step: number;
  /** Stable identifier for the algorithm/pseudocode line. */
  line: number;
  /** Human-readable explanation for this state transition. */
  message: string;
  /** Snapshot of the values being visualized. */
  values: TraceScalar[];
  /** Named pointers/indices; null means the pointer is not currently set. */
  pointers: Record<string, number | null>;
  /** Indices that should be visually emphasized in the current frame. */
  active: number[];
  /** Optional algorithm-specific values for an inspector panel. */
  variables: Record<string, TraceScalar>;
  status: TraceStatus;
};

export type TraceInputError = { field: string; message: string };

export function frame(
  step: number,
  line: number,
  message: string,
  values: TraceScalar[],
  pointers: Record<string, number | null> = {},
  active: number[] = [],
  variables: Record<string, TraceScalar> = {},
  status: TraceStatus = "running",
): TraceFrame {
  return { step, line, message, values: [...values], pointers: { ...pointers }, active: [...active], variables: { ...variables }, status };
}
