import type { TopicId } from "./content";

export type LessonSection = {
  heading: string;
  body: string;
  takeaway?: string;
};
export type Lesson = {
  id: string;
  topic: TopicId;
  title: string;
  estimatedMinutes: number;
  objective: string;
  sections: LessonSection[];
  example: { input: string; output: string; explanation: string };
  complexity: { time: string; space: string };
  commonMistakes: string[];
  nextLessonId?: string;
};

/** First-party learning content; UI components should render this data rather than hard-code lesson copy. */
export const lessons: Lesson[] = [
  {
    id: "binary-search-foundations", topic: "binary-search", title: "Think in halves", estimatedMinutes: 8,
    objective: "Explain why a sorted array lets each comparison eliminate half of the remaining candidates.",
    sections: [
      { heading: "The prerequisite: sorted data", body: "Binary search relies on order. If the values are sorted, comparing the middle value with the target tells you which half cannot contain the answer." },
      { heading: "Keep a search interval", body: "Use low and high as inclusive boundaries. Calculate mid as low + floor((high - low) / 2), then either return mid or shrink one boundary." },
      { heading: "Know when to stop", body: "Continue while low is less than or equal to high. When low passes high, every candidate has been ruled out.", takeaway: "The interval is the algorithm's state. Every step must make it strictly smaller." }
    ],
    example: { input: "[4, 9, 13, 21, 28, 35, 42], target = 28", output: "index 4", explanation: "Check index 3 (21), discard the left side, then check index 5 (35), then index 4 (28)." },
    complexity: { time: "O(log n)", space: "O(1)" },
    commonMistakes: ["Applying binary search to unsorted data.", "Using low < high and accidentally skipping the final candidate.", "Updating a boundary to mid instead of mid ± 1, which can cause an infinite loop."]
  },
  {
    id: "arrays-indexing", topic: "arrays", title: "Arrays are indexed sequences", estimatedMinutes: 7,
    objective: "Use indices to read, update and traverse a contiguous sequence safely.",
    sections: [
      { heading: "Index versus value", body: "An index identifies a position; the value is the data stored there. The first valid index is 0 and the last is length - 1." },
      { heading: "Traversal", body: "A loop visits positions in a predictable order. Track the loop boundary carefully to avoid reading beyond the final index." },
      { heading: "In-place updates", body: "An in-place algorithm changes the existing array. Two-pointer techniques often separate the position being inspected from the position being written.", takeaway: "Name pointers by their job: read, write, left, right, slow or fast." }
    ],
    example: { input: "[0, 3, 0, 5, 8]", output: "[3, 5, 8, 0, 0]", explanation: "A read pointer scans every value while a write pointer marks the next non-zero destination. Relative order is preserved." },
    complexity: { time: "O(n) for a full traversal", space: "O(1) for in-place updates" },
    commonMistakes: ["Confusing an element's value with its index.", "Using <= length as an array-loop condition.", "Overwriting a value before it has been read."]
  },
  {
    id: "strings-character-windows", topic: "strings", title: "Strings, characters and windows", estimatedMinutes: 9,
    objective: "Choose between two pointers, frequency counting and a sliding window for common string tasks.",
    sections: [
      { heading: "Treat text as a sequence", body: "A string can be traversed character by character. Be explicit about whether the task is case-sensitive and whether spaces or punctuation count." },
      { heading: "Frequency maps", body: "A map from character to count is useful when order does not matter, such as checking whether two strings are anagrams." },
      { heading: "Sliding windows", body: "A window is a contiguous range. Expand its right edge as you scan; when a constraint breaks, move the left edge until the window is valid again.", takeaway: "A sliding window is efficient when each boundary only moves forward." }
    ],
    example: { input: '"abca"', output: '"abc" (length 3)', explanation: "When the second 'a' appears, move the left boundary past the previous 'a'. The valid window becomes 'bca'." },
    complexity: { time: "O(n) expected with a hash map", space: "O(min(n, alphabet))" },
    commonMistakes: ["Moving the left edge backward when a repeated character was outside the current window.", "Assuming every substring problem is a sliding-window problem.", "Ignoring Unicode/code-point requirements."]
  },
  {
    id: "linked-list-pointers", topic: "linked-lists", title: "Follow the links", estimatedMinutes: 9,
    objective: "Trace how node references connect a linked list and how pointer rewiring changes its structure.",
    sections: [
      { heading: "Nodes, not positions", body: "A linked list is a chain of nodes. Each node stores a value and a reference to the next node; unlike an array, nodes are not addressed by constant-time numeric indices." },
      { heading: "Save before rewiring", body: "When reversing a list, store current.next before changing it. Otherwise the remainder of the chain becomes unreachable." },
      { heading: "Fast and slow pointers", body: "Move slow by one link and fast by two. When fast reaches the end, slow is at the middle.", takeaway: "Draw the references before and after each pointer update." }
    ],
    example: { input: "1 → 2 → 3 → null", output: "3 → 2 → 1 → null", explanation: "Keep previous, current and next. Reverse current.next to previous, then advance both saved pointers." },
    complexity: { time: "O(n) for traversal", space: "O(1) auxiliary for iterative pointer techniques" },
    commonMistakes: ["Overwriting next before saving it.", "Forgetting to set the new tail's next to null.", "Using node values instead of node identity when duplicate values exist."]
  }
];

export const getLessonByTopic = (topic: TopicId): Lesson | undefined =>
  lessons.find(lesson => lesson.topic === topic);
