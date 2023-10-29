import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../styles/components/add-client-modal.scss";
import IconClose from "../img/icon-close.svg";
import IconDelete from "../img/icon-delete.svg";
import { motion } from "framer-motion";
import { formatCNPJ } from "../utils/formatCnpjUtils";
import type { FormData } from "../types/formTypes";
import { modalVariants, modalTransition } from "../utils/framerMotionUtils";
import { AddClientModalProps } from "../types/modalTypes";

export default function AddClientModal({
  addModalIsOpen,
  onClose,
}: AddClientModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cnpj: "",
    email: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cnpj" ? formatCNPJ(value) : value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    axios
      .post(
        "https://outros.opea-uat.solutions/prova/front/api/clients",
        formData
      )
      .then(() => {
        onClose();
      })
      .catch(() => {
        console.error("Erro ao enviar dados:");
      });
  }

  if (!addModalIsOpen) return null;

  return (
    <motion.div
      id="add-client-modal"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      transition={modalTransition}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLElement) {
          if (event.target.id === "add-client-modal") {
            onClose();
          }
        }
      }}
    >
      <motion.div id="add-client-modal-content">
        <div id="add-client-modal-header">
          <h1 id="add-client-modal-title">Cadastrar Empresa</h1>

          <img
            id="close-add-client-modal-icon"
            onClick={onClose}
            src={IconClose}
            alt="Botão de fechar"
          />
        </div>
        <form id="add-client-modal-form" onSubmit={handleSubmit}>
          <div id="add-client-modal-input-field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div id="add-client-modal-input-field">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
            />
          </div>
          <div id="add-client-modal-input-field">
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
        <div id="add-client-modal-buttons-area">
          <img
            id="client-delete-button-add-modal"
            src={IconDelete}
            alt="Botão para deletar"
          />
          <div id="cancel-add-area">
            <button id="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button id="add-button" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
