export type TopicId = "binary-search" | "arrays" | "strings" | "linked-lists";
export type Question = {
  id: string; title: string; topic: TopicId; difficulty: "Easy" | "Medium";
  pattern: string; summary: string; minutes: number; visual: boolean;
};
export const topics = [
  { id: "binary-search" as const, name: "Binary Search", count: 4, level: "Core technique", description: "Cut the search space in half with every decision.", icon: "⌕", tint: "violet", tags: ["Sorted data", "Divide & conquer"] },
  { id: "arrays" as const, name: "Arrays", count: 4, level: "Foundations", description: "Work confidently with indexed collections and in-place operations.", icon: "▦", tint: "cyan", tags: ["Two pointers", "Prefix sums"] },
  { id: "strings" as const, name: "Strings", count: 4, level: "Foundations", description: "Explore characters, frequency maps and sliding windows.", icon: "Aa", tint: "orange", tags: ["Hashing", "Sliding window"] },
  { id: "linked-lists" as const, name: "Linked Lists", count: 4, level: "Core structures", description: "Understand nodes, references and pointer rewiring.", icon: "⌁", tint: "green", tags: ["Pointers", "Fast & slow"] },
];
export const questions: Question[] = [
  { id: "bs-01", title: "Binary Search", topic: "binary-search", difficulty: "Easy", pattern: "Search space", summary: "Find a target in a sorted array in logarithmic time.", minutes: 15, visual: true },
  { id: "bs-02", title: "Search Insert Position", topic: "binary-search", difficulty: "Easy", pattern: "Lower bound", summary: "Find the index where a target belongs.", minutes: 20, visual: true },
  { id: "bs-03", title: "First and Last Position", topic: "binary-search", difficulty: "Medium", pattern: "Boundary search", summary: "Find the first and last occurrence of a target.", minutes: 25, visual: true },
  { id: "bs-04", title: "Search in Rotated Sorted Array", topic: "binary-search", difficulty: "Medium", pattern: "Modified binary search", summary: "Search efficiently despite a rotation pivot.", minutes: 30, visual: false },
  { id: "ar-01", title: "Two Sum", topic: "arrays", difficulty: "Easy", pattern: "Hash map", summary: "Find two values that add up to a target.", minutes: 15, visual: true },
  { id: "ar-02", title: "Best Time to Buy and Sell Stock", topic: "arrays", difficulty: "Easy", pattern: "Running minimum", summary: "Maximize profit with one buy and one sell.", minutes: 20, visual: true },
  { id: "ar-03", title: "Maximum Subarray", topic: "arrays", difficulty: "Medium", pattern: "Kadane's algorithm", summary: "Find the contiguous subarray with the largest sum.", minutes: 25, visual: true },
  { id: "ar-04", title: "Move Zeroes", topic: "arrays", difficulty: "Easy", pattern: "Two pointers", summary: "Move zeroes to the end while preserving order.", minutes: 20, visual: true },
  { id: "st-01", title: "Valid Palindrome", topic: "strings", difficulty: "Easy", pattern: "Two pointers", summary: "Check whether a normalized string reads the same both ways.", minutes: 15, visual: true },
  { id: "st-02", title: "Valid Anagram", topic: "strings", difficulty: "Easy", pattern: "Frequency counting", summary: "Compare character frequencies between two strings.", minutes: 15, visual: true },
  { id: "st-03", title: "Longest Common Prefix", topic: "strings", difficulty: "Easy", pattern: "String traversal", summary: "Find the shared prefix across a collection of strings.", minutes: 20, visual: true },
  { id: "st-04", title: "Longest Substring Without Repeating Characters", topic: "strings", difficulty: "Medium", pattern: "Sliding window", summary: "Find the longest substring containing unique characters.", minutes: 30, visual: true },
  { id: "ll-01", title: "Reverse Linked List", topic: "linked-lists", difficulty: "Easy", pattern: "Pointer reversal", summary: "Reverse the links between nodes iteratively.", minutes: 20, visual: true },
  { id: "ll-02", title: "Middle of the Linked List", topic: "linked-lists", difficulty: "Easy", pattern: "Fast & slow pointers", summary: "Find the middle node in one traversal.", minutes: 15, visual: true },
  { id: "ll-03", title: "Merge Two Sorted Lists", topic: "linked-lists", difficulty: "Easy", pattern: "Dummy node", summary: "Merge two sorted linked lists into one sorted list.", minutes: 25, visual: true },
  { id: "ll-04", title: "Linked List Cycle", topic: "linked-lists", difficulty: "Easy", pattern: "Floyd's algorithm", summary: "Detect whether a linked list contains a cycle.", minutes: 20, visual: true },
];
export const topicName = (id: TopicId) => topics.find(t => t.id === id)?.name ?? id;
