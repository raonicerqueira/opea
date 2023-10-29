import { create } from "zustand";

type AddModalStore = {
  addModalIsOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
};

export const useAddModalStore = create<AddModalStore>((set) => ({
  addModalIsOpen: false,
  openAddModal: () => set({ addModalIsOpen: true }),
  closeAddModal: () => set({ addModalIsOpen: false }),
}));

export default useAddModalStore;
