import { create } from "zustand";

type Client = {
  id: string;
  name: string;
  email: string;
  cnpj: string;
};

type ClientStore = {
  clientList: Client[];
  selectedClient: Client | null;
  showClientModal: (client: Client) => void;
  hideClientModal: () => void;
  setSelectedClient: (client: Client) => void;
};

const useClientStore = create<ClientStore>((set) => ({
  clientList: [],
  selectedClient: null,
  showClientModal: (client) => set({ selectedClient: client }),
  hideClientModal: () => set({ selectedClient: null }),
  setSelectedClient: (client) => set({ selectedClient: client }),
}));

export default useClientStore;
