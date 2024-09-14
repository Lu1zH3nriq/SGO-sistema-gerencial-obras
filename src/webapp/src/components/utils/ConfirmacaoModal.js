import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useUIContextController } from "../../context/index.js";

const ConfirmacaoModal = ({ visible, setVisible, mensagem, sucesso }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const toggleModal = () => {
    setVisible(false);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: "none",
  };

  return (
    <Modal isOpen={visible} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        {sucesso ? "Sucesso" : "Erro"}
      </ModalHeader>
      <ModalBody style={modalStyle}>
        {mensagem}
      </ModalBody>
      <ModalFooter style={modalStyle}>
        <Button color="primary" onClick={toggleModal} style={buttonStyle}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmacaoModal;