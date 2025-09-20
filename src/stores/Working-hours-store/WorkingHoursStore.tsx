import { create } from "zustand";

type workingHoursStates = {
  count: number;
};

type workingHoursActions = {
  increment: () => void;
};

type workingHoursStore = workingHoursStates & workingHoursActions;

export const useWorkingHours = create<workingHoursStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
