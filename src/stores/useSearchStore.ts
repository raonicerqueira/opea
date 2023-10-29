import { create } from "zustand";

type SearchStoreState = {
  search: string;
  setSearch: (newSearch: string) => void;
};

const useSearchStore = create<SearchStoreState>((set) => ({
  search: "",
  setSearch: (newSearch) => set({ search: newSearch }),
}));

export default useSearchStore;
