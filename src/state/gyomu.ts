import { ContentKindExt } from "@/lib/contentKind";
import { create } from "zustand";

type GyomuState = {
  contentKind: ContentKindExt;
  toggle(): void;
  setGyomu(kind: ContentKindExt): void;
};
export const useGyomu = create<GyomuState>((set) => ({
  contentKind: ContentKindExt.WORK,
  toggle: () =>
    set((state) => ({
      contentKind:
        state.contentKind === ContentKindExt.WORK
          ? ContentKindExt.NOT_WORK
          : ContentKindExt.WORK,
    })),
  setGyomu: (contentKind: ContentKindExt) => set(() => ({ contentKind })),
}));

export const selectKind = (state: GyomuState) => state.contentKind;
