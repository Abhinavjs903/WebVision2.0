import { createBinarySearchTrace } from "./binarySearch";
import { frame, type TraceFrame } from "./traceTypes";

/** Adapt the existing Binary Search trace to the shared renderer contract. */
export function createBinarySearchFrames(input: number[], target: number): TraceFrame[] {
  return createBinarySearchTrace(input, target).map(step => {
    const status = step.action === "found" ? "found" : step.action === "not-found" ? "not-found" : "running";
    const active = step.mid === null ? [] : [step.mid];
    return frame(
      step.index,
      step.codeLine,
      step.explanation,
      step.array,
      { low: step.low, mid: step.mid, high: step.high },
      active,
      { low: step.low, mid: step.mid, high: step.high, target, foundIndex: step.foundIndex },
      status,
    );
  });
}
