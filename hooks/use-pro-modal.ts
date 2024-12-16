import { create } from "zustand";

type CardModal = {
    isOpen:  boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useProModal = create<CardModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
