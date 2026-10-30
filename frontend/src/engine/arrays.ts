import { frame, type TraceFrame } from "./traceTypes";

function assertFiniteArray(values: number[]): void {
  if (!Array.isArray(values) || values.some(value => !Number.isFinite(value))) {
    throw new TypeError("Expected an array containing only finite numbers.");
  }
}

/** Trace Two Sum using a one-pass hash map. Returns the first pair found. */
export function createTwoSumTrace(values: number[], target: number): TraceFrame[] {
  assertFiniteArray(values);
  if (!Number.isFinite(target)) throw new TypeError("Target must be a finite number.");
  const seen = new Map<number, number>();
  const trace: TraceFrame[] = [];
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    const complement = target - value;
    const match = seen.get(complement);
    if (match !== undefined) {
      trace.push(frame(trace.length, 4, `Found ${complement} + ${value} = ${target}.`, values, { current: index, match }, [match, index], { value, complement, target, resultLeft: match, resultRight: index }, "found"));
      return trace;
    }
    trace.push(frame(trace.length, 2, `No earlier ${complement} was seen. Store ${value} at index ${index}.`, values, { current: index, match: null }, [index], { value, complement, target, seenCount: seen.size }));
    seen.set(value, index);
  }
  trace.push(frame(trace.length, 5, "No pair adds up to the target.", values, {}, [], { target }, "not-found"));
  return trace;
}

/** Trace stable in-place Move Zeroes with read/write pointers. */
export function createMoveZeroesTrace(input: number[]): TraceFrame[] {
  assertFiniteArray(input);
  const values = [...input];
  const trace: TraceFrame[] = [frame(0, 1, "Start with read and write at index 0.", values, { read: 0, write: 0 }, [], { zeroesMoved: 0 })];
  let write = 0;
  for (let read = 0; read < values.length; read += 1) {
    if (values[read] !== 0) {
      const moved = read !== write;
      [values[write], values[read]] = [values[read], values[write]];
      trace.push(frame(trace.length, moved ? 4 : 3, moved ? `Move ${values[write]} into the next write slot.` : `${values[read]} is already in the correct relative position.`, values, { read, write }, moved ? [read, write] : [read], { readValue: values[write], writeIndex: write }));
      write += 1;
    } else {
      trace.push(frame(trace.length, 2, "Skip this zero; the write pointer stays in place.", values, { read, write }, [read], { zeroesMoved: read - write }));
    }
  }
  trace.push(frame(trace.length, 5, "All non-zero values remain in order; zeroes are at the end.", values, { read: null, write }, [], { nonZeroCount: write }, "complete"));
  return trace;
}

/** Trace Kadane's algorithm, including the best range found so far. */
export function createMaximumSubarrayTrace(values: number[]): TraceFrame[] {
  assertFiniteArray(values);
  if (values.length === 0) throw new RangeError("Maximum subarray requires at least one value.");
  let current = values[0];
  let best = values[0];
  let start = 0;
  let bestStart = 0;
  let bestEnd = 0;
  const trace = [frame(0, 1, "Initialize the running and best sums from the first value.", values, { current: 0, start: 0, bestStart: 0, bestEnd: 0 }, [0], { currentSum: current, bestSum: best })];
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] > current + values[i]) { current = values[i]; start = i; }
    else current += values[i];
    if (current > best) { best = current; bestStart = start; bestEnd = i; }
    trace.push(frame(trace.length, 2, `At index ${i}, compare starting fresh with extending the current subarray.`, values, { current: i, start, bestStart, bestEnd }, [i, bestStart, bestEnd], { currentSum: current, bestSum: best, bestRange: `${bestStart}..${bestEnd}` }));
  }
  trace.push(frame(trace.length, 3, `Maximum sum is ${best}, from index ${bestStart} through ${bestEnd}.`, values, { current: null, start: null, bestStart, bestEnd }, Array.from({ length: bestEnd - bestStart + 1 }, (_, i) => bestStart + i), { maxSum: best, start: bestStart, end: bestEnd }, "complete"));
  return trace;
}
