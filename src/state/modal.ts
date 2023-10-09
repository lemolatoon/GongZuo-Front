import { create } from "zustand";

type GongZuoEditModalState = {
  gongzuoId: number | null;
  open(gongzuoId: number): void;
  close(): void;
};
export const useGongZuoEditModal = create<GongZuoEditModalState>((set) => ({
  gongzuoId: null,
  open: (gongzuoId: number) => set({ gongzuoId }),
  close: () => set({ gongzuoId: null }),
}));
