import { create } from "zustand";

type EditModalStore = {
  editModalIsOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

export const useEditModalStore = create<EditModalStore>((set) => ({
  editModalIsOpen: false,
  openEditModal: () => set({ editModalIsOpen: true }),
  closeEditModal: () => set({ editModalIsOpen: false }),
}));

export default useEditModalStore;
