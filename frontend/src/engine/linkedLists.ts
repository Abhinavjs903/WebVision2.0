import { frame, type TraceFrame, type TraceScalar } from "./traceTypes";

export type ListNode = { id: string; value: number; next: string | null };
function validateNodes(nodes: ListNode[]): void {
  const ids = new Set<string>();
  for (const node of nodes) {
    if (!node.id || ids.has(node.id)) throw new TypeError("Linked-list node IDs must be non-empty and unique.");
    if (!Number.isFinite(node.value)) throw new TypeError("Linked-list node values must be finite numbers.");
    ids.add(node.id);
  }
  for (const node of nodes) if (node.next !== null && !ids.has(node.next)) throw new TypeError(`Node ${node.id} points to missing node ${node.next}.`);
}
function orderedNodes(nodes: ListNode[], head: string | null): ListNode[] {
  const byId = new Map<string, ListNode>(nodes.map(node => [node.id, node] as const));
  const ordered: ListNode[] = [];
  const visited = new Set<string>();
  let cursor = head;
  while (cursor !== null && !visited.has(cursor)) {
    visited.add(cursor);
    const node = byId.get(cursor);
    if (!node) break;
    ordered.push(node);
    cursor = node.next;
  }
  return ordered;
}
function valuesOf(nodes: ListNode[], head: string | null): TraceScalar[] {
  return orderedNodes(nodes, head).map(node => node.value);
}

/** Visualize iterative pointer reversal without mutating the caller's nodes. */
export function createReverseListTrace(input: ListNode[], head: string | null): TraceFrame[] {
  validateNodes(input);
  const nodes = input.map(node => ({ ...node }));
  const byId = new Map(nodes.map(node => [node.id, node]));
  let previous: string | null = null;
  let current = head;
  const trace: TraceFrame[] = [frame(0, 1, "Initialize previous to null and current to the head.", valuesOf(nodes, current), { previous: null, current: 0 }, [], { previousId: null, currentId: current })];
  let guard = 0;
  while (current !== null) {
    if (guard++ > nodes.length) throw new Error("Unexpected cycle while reversing a linked list.");
    const node = byId.get(current);
    if (!node) throw new Error(`Head references missing node ${current}.`);
    const next = node.next;
    node.next = previous;
    trace.push(frame(trace.length, 2, `Reverse the next pointer of node ${node.id}.`, valuesOf(nodes, current), { previous: previous ? nodes.findIndex(item => item.id === previous) : null, current: nodes.findIndex(item => item.id === current), next: next ? nodes.findIndex(item => item.id === next) : null }, [nodes.findIndex(item => item.id === current)], { previousId: previous, currentId: current, nextId: next }));
    previous = current;
    current = next;
  }
  trace.push(frame(trace.length, 3, "Current is null. Previous is the new head of the reversed list.", valuesOf(nodes, previous), { previous: nodes.findIndex(item => item.id === previous), current: null }, [], { newHead: previous }, "complete"));
  return trace;
}

/** Fast/slow pointer trace. Input is interpreted as a null-terminated chain from head. */
export function createMiddleNodeTrace(input: ListNode[], head: string | null): TraceFrame[] {
  validateNodes(input);
  const byId = new Map<string, ListNode>(input.map(node => [node.id, node] as const));
  const ordered = orderedNodes(input, head);
  const values = ordered.map(node => node.value);
  let slow: string | null = head;
  let fast: string | null = head;
  const trace: TraceFrame[] = [frame(0, 1, "Both pointers begin at the head.", values, { slow: 0, fast: 0 }, values.length ? [0] : [], { slowId: slow, fastId: fast })];
  const indexOf = (id: string | null) => id === null ? null : ordered.findIndex(node => node.id === id);
  let iterations = 0;
  while (fast !== null && byId.get(fast)?.next !== null && byId.get(fast)?.next !== undefined) {
    if (iterations++ >= input.length) throw new Error("Middle-node tracing requires an acyclic linked list.");
    slow = byId.get(slow as string)?.next ?? null;
    const fastNext = byId.get(fast)?.next ?? null;
    fast = fastNext === null ? null : byId.get(fastNext)?.next ?? null;
    trace.push(frame(trace.length, 2, "Move slow by one link and fast by two links.", values, { slow: indexOf(slow), fast: indexOf(fast) }, [indexOf(slow), indexOf(fast)].filter((n): n is number => n !== null), { slowId: slow, fastId: fast }));
  }
  trace.push(frame(trace.length, 3, slow === null ? "The list is empty." : `Slow points to the middle node with value ${byId.get(slow)?.value}.`, values, { slow: indexOf(slow), fast: indexOf(fast) }, slow === null ? [] : [indexOf(slow) as number], { middleId: slow, middleValue: slow === null ? null : byId.get(slow)?.value ?? null }, "complete"));
  return trace;
}
