import IconClient from "../img/icon-client.svg";
import useClientStore from "../stores/useClientStore";
import useEditModalStore from "../stores/useEditModalStore";
import "../styles/components/client.scss";
import type { ClientProps } from "../types/clientTypes";
import { formatCNPJ } from "../utils/formatCnpjUtils";

export default function Client({ id, name, cnpj, email }: ClientProps) {
  const { setSelectedClient } = useClientStore();
  const { openEditModal } = useEditModalStore();

  function handleClientClick() {
    setSelectedClient({ id, name, cnpj, email });
    openEditModal();
  }

  return (
    <div id="client-container" onClick={handleClientClick}>
      <img id="icon-client" src={IconClient} alt="Ícone do cliente" />
      <div>
        <p id="name">{name}</p>
        <div id="information">
          <p id="cnpj">CNPJ: {formatCNPJ(cnpj)}</p>
          <p id="email">{`- Email: ${email}`}</p>
          <p id="email-responsive">{`Email: ${email}`}</p>
        </div>
      </div>
    </div>
  );
}
