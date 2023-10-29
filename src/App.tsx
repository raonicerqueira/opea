import SearchBar from "./components/SearchBar";
import AddCompanyButton from "./components/AddClientButton";
import ClientsList from "./components/ClientsList";
import AddClientModal from "./components/AddClientModal";
import { useAddModalStore } from "./stores/useAddModalStore";
import { useEditModalStore } from "./stores/useEditModalStore";
import EditClientModal from "./components/EditClientModal";

function App() {
  const { addModalIsOpen, closeAddModal } = useAddModalStore();
  const { editModalIsOpen, closeEditModal } = useEditModalStore();
  return (
    <main>
      <SearchBar />
      <AddCompanyButton />
      <ClientsList />
      <AddClientModal addModalIsOpen={addModalIsOpen} onClose={closeAddModal} />
      <EditClientModal
        editModalIsOpen={editModalIsOpen}
        onClose={closeEditModal}
      />
    </main>
  );
}

export default App;
