import { frame, type TraceFrame } from "./traceTypes";

/** Compare characters from both ends; comparison is case-sensitive by default. */
export function createPalindromeTrace(input: string): TraceFrame[] {
  const chars = Array.from(input);
  let left = 0;
  let right = chars.length - 1;
  const trace: TraceFrame[] = [frame(0, 1, "Place one pointer at each end of the string.", chars, { left, right }, chars.length ? [left, right] : [], { length: chars.length })];
  while (left < right) {
    const equal = chars[left] === chars[right];
    trace.push(frame(trace.length, 2, equal ? `'${chars[left]}' matches '${chars[right]}'. Move both pointers inward.` : `'${chars[left]}' does not match '${chars[right]}'. The string is not a palindrome.`, chars, { left, right }, [left, right], { leftChar: chars[left], rightChar: chars[right] }, equal ? "running" : "not-found"));
    if (!equal) return trace;
    left += 1;
    right -= 1;
  }
  trace.push(frame(trace.length, 3, "The pointers met or crossed. Every mirrored pair matched.", chars, { left, right }, [], { isPalindrome: true }, "found"));
  return trace;
}

/** Count character frequencies in the first string, then consume them with the second. */
export function createAnagramTrace(first: string, second: string): TraceFrame[] {
  const a = Array.from(first);
  const b = Array.from(second);
  const chars = [...a, "·", ...b];
  const counts = new Map<string, number>();
  const trace: TraceFrame[] = [frame(0, 1, "Count each character in the first string.", chars, {}, [], { firstLength: a.length, secondLength: b.length })];
  a.forEach((char, index) => {
    counts.set(char, (counts.get(char) ?? 0) + 1);
    trace.push(frame(trace.length, 2, `Count '${char}' from the first string.`, chars, { current: index }, [index], { character: char, frequency: counts.get(char) }));
  });
  for (let index = 0; index < b.length; index += 1) {
    const char = b[index];
    const count = counts.get(char) ?? 0;
    if (count === 0) {
      trace.push(frame(trace.length, 4, `'${char}' has no remaining match. These strings are not anagrams.`, chars, { current: a.length + 1 + index }, [a.length + 1 + index], { character: char, remaining: count }, "not-found"));
      return trace;
    }
    counts.set(char, count - 1);
    trace.push(frame(trace.length, 3, `Consume one occurrence of '${char}'.`, chars, { current: a.length + 1 + index }, [a.length + 1 + index], { character: char, remaining: count - 1 }));
  }
  const isAnagram = [...counts.values()].every(count => count === 0);
  trace.push(frame(trace.length, 5, isAnagram ? "All character counts balance to zero. The strings are anagrams." : "Unused characters remain, so the strings are not anagrams.", chars, {}, [], { isAnagram }, isAnagram ? "found" : "not-found"));
  return trace;
}

/** Sliding-window trace for the longest substring without repeated characters. */
export function createLongestUniqueSubstringTrace(input: string): TraceFrame[] {
  const chars = Array.from(input);
  const lastSeen = new Map<string, number>();
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;
  const trace: TraceFrame[] = [frame(0, 1, "Start with an empty sliding window.", chars, { left: 0, right: null }, [], { bestLength: 0 })];
  for (let right = 0; right < chars.length; right += 1) {
    const previous = lastSeen.get(chars[right]);
    if (previous !== undefined && previous >= left) left = previous + 1;
    lastSeen.set(chars[right], right);
    const length = right - left + 1;
    if (length > bestLength) { bestLength = length; bestStart = left; }
    trace.push(frame(trace.length, 2, previous !== undefined && previous >= left - 1 ? `Move the left edge past the previous '${chars[right]}'.` : `Extend the window to include '${chars[right]}'.`, chars, { left, right }, Array.from({ length }, (_, i) => left + i), { windowLength: length, bestLength, bestSubstring: chars.slice(bestStart, bestStart + bestLength).join("") }));
  }
  trace.push(frame(trace.length, 3, `Longest unique substring has length ${bestLength}.`, chars, { left: bestStart, right: bestStart + bestLength - 1 }, Array.from({ length: bestLength }, (_, i) => bestStart + i), { bestLength, substring: chars.slice(bestStart, bestStart + bestLength).join("") }, "complete"));
  return trace;
}
