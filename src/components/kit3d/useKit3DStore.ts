import { create } from "zustand";

interface Kit3DState {
  /** Camera count per zone id. Missing entries mean 0. */
  cameraCounts: Record<string, number>;
  incrementCamera: (zoneId: string) => void;
  decrementCamera: (zoneId: string) => void;
  isNightMode: boolean;
  toggleNightMode: () => void;
}

export const useKit3DStore = create<Kit3DState>((set) => ({
  cameraCounts: {},
  isNightMode: false,

  incrementCamera: (zoneId) =>
    set((state) => ({
      cameraCounts: { ...state.cameraCounts, [zoneId]: (state.cameraCounts[zoneId] ?? 0) + 1 },
    })),

  decrementCamera: (zoneId) =>
    set((state) => {
      const current = state.cameraCounts[zoneId] ?? 0;
      if (current <= 0) return state;
      return { cameraCounts: { ...state.cameraCounts, [zoneId]: current - 1 } };
    }),

  toggleNightMode: () => set((state) => ({ isNightMode: !state.isNightMode })),
}));
