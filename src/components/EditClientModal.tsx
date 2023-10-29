import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import "../styles/components/edit-client-modal.scss";
import IconClose from "../img/icon-close.svg";
import IconDelete from "../img/icon-delete.svg";
import useClientStore from "../stores/useClientStore";
import { motion } from "framer-motion";
import { formatCNPJ } from "../utils/formatCnpjUtils";
import { modalVariants, modalTransition } from "../utils/framerMotionUtils";
import type { FormData } from "../types/formTypes";
import { EditClientModalProps } from "../types/modalTypes";

export default function EditClientModal({
  editModalIsOpen,
  onClose,
}: EditClientModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cnpj: "",
    email: "",
  });

  const { selectedClient, hideClientModal } = useClientStore();

  useEffect(() => {
    if (selectedClient) {
      setFormData({
        name: selectedClient.name,
        cnpj: formatCNPJ(selectedClient.cnpj),
        email: selectedClient.email,
      });
    }
  }, [selectedClient]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cnpj" ? formatCNPJ(value) : value,
    });
  }

  async function handleAction(action: "update" | "delete") {
    if (!selectedClient) return;

    try {
      if (action === "update") {
        await axios.put(
          `https://outros.opea-uat.solutions/prova/front/api/clients/${selectedClient.id}`,
          formData
        );
      } else if (action === "delete") {
        await axios.delete(
          `https://outros.opea-uat.solutions/prova/front/api/clients/${selectedClient.id}`
        );
      }

      useClientStore.setState((state) => ({
        ...state,
        clientList: state.clientList.map((client) => {
          if (client.id === selectedClient.id) {
            return { ...client, ...formData };
          }
          return client;
        }),
      }));

      onClose();
      hideClientModal();
    } catch (error) {
      console.log("Erro ao enviar dados");
    }
  }

  if (!editModalIsOpen || !selectedClient) return null;

  return (
    <motion.div
      id="edit-client-modal"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      transition={modalTransition}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLElement) {
          if (event.target.id === "edit-client-modal") {
            onClose();
            hideClientModal();
          }
        }
      }}
    >
      <motion.div id="edit-client-modal-content">
        <div id="edit-client-modal-header">
          <h1 id="edit-client-modal-title">Editar Empresa</h1>
          <img
            id="close-edit-client-modal-icon"
            onClick={() => {
              onClose();
              hideClientModal();
            }}
            src={IconClose}
            alt="Botão de fechar"
          />
        </div>
        <form id="edit-client-modal-form" onSubmit={(e) => e.preventDefault()}>
          <div id="edit-client-modal-input-field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div id="edit-client-modal-input-field">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
            />
          </div>
          <div id="edit-client-modal-input-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div id="edit-client-modal-buttons-area">
          <img
            onClick={() => handleAction("delete")}
            id="client-delete-button"
            src={IconDelete}
            alt="Botão para deletar"
          />
          <div id="cancel-add-area">
            <button
              id="cancel-button"
              onClick={() => {
                onClose();
                hideClientModal();
              }}
            >
              Cancelar
            </button>
            <button id="add-button" onClick={() => handleAction("update")}>
              Atualizar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
