import { create } from "zustand";

type TUseStoreModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useStoreModal = create<TUseStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
