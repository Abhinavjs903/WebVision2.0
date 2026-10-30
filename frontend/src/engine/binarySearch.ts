export type TraceAction = "check" | "discard-left" | "discard-right" | "found" | "not-found";
export type BinarySearchStep = {
  index: number; low: number; high: number; mid: number | null; action: TraceAction;
  array: number[]; explanation: string; codeLine: number; foundIndex: number | null;
};
export function createBinarySearchTrace(input: number[], target: number): BinarySearchStep[] {
  const array = [...input].sort((a, b) => a - b);
  const steps: BinarySearchStep[] = [];
  let low = 0, high = array.length - 1, index = 0;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    steps.push({ index: index++, low, high, mid, action: "check", array: [...array],
      explanation: `Check the middle value ${array[mid]}. Compare it with target ${target}.`, codeLine: 3, foundIndex: null });
    if (array[mid] === target) {
      steps.push({ index: index++, low, high, mid, action: "found", array: [...array],
        explanation: `Found ${target} at index ${mid}. The search is complete.`, codeLine: 4, foundIndex: mid });
      return steps;
    }
    if (array[mid] < target) {
      steps.push({ index: index++, low, high, mid, action: "discard-left", array: [...array],
        explanation: `${array[mid]} is smaller than ${target}. Discard the left half and move low to mid + 1.`, codeLine: 6, foundIndex: null });
      low = mid + 1;
    } else {
      steps.push({ index: index++, low, high, mid, action: "discard-right", array: [...array],
        explanation: `${array[mid]} is larger than ${target}. Discard the right half and move high to mid - 1.`, codeLine: 8, foundIndex: null });
      high = mid - 1;
    }
  }
  steps.push({ index: index++, low, high, mid: null, action: "not-found", array: [...array],
    explanation: `The search range is empty. ${target} is not present in this array.`, codeLine: 10, foundIndex: null });
  return steps;
}
