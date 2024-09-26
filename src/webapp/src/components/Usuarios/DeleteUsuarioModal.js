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
import ConfirmacaoModal from "./ConfirmacaoModal";

const DeleteUsuarioModal = ({ visible, setVisible, usuario, newListUsers }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [loading, setLoading] = React.useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = React.useState("");
  const [sucesso, setSucesso] = React.useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = React.useState(false);

  const URL_API = process.env.REACT_APP_URL_API;

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${URL_API}/api/users/deleteUsuario?id=${id}`)
      .then((response) => {
        axios.get(`${URL_API}/api/users/usuarios`).then((response) => {
          newListUsers(response.data);
          setMensagemConfirmacao("Usuário deletado com sucesso.");
          setSucesso(true);
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
        setMensagemConfirmacao("Erro ao deletar usuário.");
        setSucesso(false);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setMensagemConfirmacao("Erro ao deletar usuário.");
        setSucesso(false);
      })
      .finally(() => {
        setLoading(false);
        setConfirmacaoVisible(true);
        setVisible(false);
      });
  };

  const toggleModal = () => {
    setVisible(false);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: "none",
  };

  const deleteButtonStyle = {
    backgroundColor: "#FF4747",
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <>
      <Modal isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={modalStyle}>
          Confirmar Exclusão
        </ModalHeader>
        <ModalBody style={modalStyle}>
          Tem certeza que deseja excluir o usuário "{usuario?.nome}", com
          e-mail: "{usuario?.email}" ?
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={() => handleDelete(usuario?.id)}
            style={deleteButtonStyle}
          >
            {loading ? <Spinner size="sm" color="light" /> : "Excluir"}
          </Button>
        </ModalFooter>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacaoVisible}
        setVisible={setConfirmacaoVisible}
        mensagem={mensagemConfirmacao}
        sucesso={sucesso}
      />
    </>
  );
};

export default DeleteUsuarioModal;
