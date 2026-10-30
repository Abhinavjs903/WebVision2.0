import { create } from "zustand";
type ProgressState = { completed: string[]; complete: (id: string) => void; reset: () => void };
export const useProgressStore = create<ProgressState>((set) => ({
  completed: [],
  complete: (id) => set((state) => ({ completed: state.completed.includes(id) ? state.completed : [...state.completed, id] })),
  reset: () => set({ completed: [] }),
}));