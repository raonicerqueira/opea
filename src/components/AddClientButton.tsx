import "../styles/components/add-client-button.scss";

import IconClient from "../img/icon-client.svg";
import { useAddModalStore } from "../stores/useAddModalStore";

export default function AddClientButton() {
  const { openAddModal } = useAddModalStore();

  return (
    <button id="add-client-button" onClick={openAddModal}>
      <img id="icon-company" src={IconClient} alt="Ícone de empresa" />
      <p>Adicionar Empresa</p>
      <div></div>
    </button>
  );
}
