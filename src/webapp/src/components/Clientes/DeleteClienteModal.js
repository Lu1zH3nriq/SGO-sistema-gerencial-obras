import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";
import { useUIContextController } from "../../context/index.js";
import axios from "axios";
import ConfirmacaoModal from "../utils/ConfirmacaoModal.js";

const DeleteClienteModal = ({ visible, setVisible, cliente, getClientes }) => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [loading, setLoading] = React.useState(false);
  const [confirmacao, setConfirmacao] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const [state] = useUIContextController();
  const { darkMode } = state;

  const toggleModal = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setLoading(true);

    axios
      .delete(`${URL_API}/api/clientes/deleteCliente?id=${cliente.id}`)
      .then((response) => {
        setConfirmacao({
          visible: true,
          mensagem: "Cliente excluído com sucesso!",
          sucesso: true,
        });
        getClientes();
      })
      .catch((error) => {
        setConfirmacao({
          visible: true,
          mensagem: "Erro ao excluir o cliente!",
          sucesso: false,
        });
      })
      .finally(() => {
        setLoading(false);
        setVisible(false);
      });
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };

  const deleteButtonStyle = {
    backgroundColor: "#FF6347", // Vermelho
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <>
      <Modal isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader
          toggle={toggleModal}
          style={{
            ...modalStyle,
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          Confirmar Exclusão
        </ModalHeader>
        <ModalBody
          style={{
            justifyContent: "center",
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
            border: "none",
          }}
        >
          {cliente ? (
            <>
              <p>Tem certeza que deseja excluir o cliente:</p>
              <p>
                Nome: <strong>{cliente.nome}</strong>
              </p>
              <p>
                {cliente.tipoPessoa === "Fisica" ? "CPF: " : "CNPJ: "}
                <strong>
                  {cliente.tipoPessoa === "Fisica" ? cliente.cpf : cliente.cnpj}
                </strong>
              </p>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button
            color="secondary"
            onClick={toggleModal}
            style={{
              backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
          >
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={handleDelete}
            style={deleteButtonStyle}
          >
            {loading ? <Spinner size="sm" color="light" /> : "Excluir"}
          </Button>
        </ModalFooter>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacao.visible}
        setVisible={setConfirmacao}
        mensagem={confirmacao.mensagem}
        sucesso={confirmacao.sucesso}
      />
    </>
  );
};

export default DeleteClienteModal;
