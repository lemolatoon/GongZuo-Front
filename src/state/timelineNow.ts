import { create } from "zustand";
import dayjs from "dayjs";

export type TimelineNowState = {
  now: Date;
  reset(): void;
  previousDay(): void;
  nextDay(): void;
};
export const useTimelineNow = create<TimelineNowState>((set) => ({
  now: new Date(),
  reset: () => set({ now: new Date() }),
  previousDay: () =>
    set((state) => ({ now: dayjs(state.now).subtract(1, "day").toDate() })),
  nextDay: () =>
    set((state) => ({ now: dayjs(state.now).add(1, "day").toDate() })),
}));

export const selectNow = (state: TimelineNowState) => state.now;
