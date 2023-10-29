import { useEffect, useState } from "react";
import axios from "axios";
import Client from "./Client";
import useSearchStore from "../stores/useSearchStore";
import useAddModalStore from "../stores/useAddModalStore";
import useEditModalStore from "../stores/useEditModalStore";
import { motion } from "framer-motion";
import type { ClientProps } from "../types/clientTypes";

export default function ClientsList() {
  const [clientList, setClientList] = useState<ClientProps[]>();
  const { search } = useSearchStore();
  const { addModalIsOpen } = useAddModalStore();
  const { editModalIsOpen } = useEditModalStore();

  useEffect(() => {
    fetchClientsList();
  }, [addModalIsOpen, editModalIsOpen]);

  async function fetchClientsList() {
    try {
      const response = await axios.get<ClientProps[]>(
        "https://outros.opea-uat.solutions/prova/front/api/clients"
      );
      setClientList(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  return (
    <div>
      {clientList &&
        clientList
          .filter((client) => {
            return search.toLowerCase() === ""
              ? client
              : client.name.toLowerCase().includes(search) ||
                  client.email.toLowerCase().includes(search) ||
                  client.cnpj.toLowerCase().includes(search);
          })
          .map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Client
                id={client.id}
                name={client.name}
                cnpj={client.cnpj}
                email={client.email}
              />
            </motion.div>
          ))}
    </div>
  );
}
