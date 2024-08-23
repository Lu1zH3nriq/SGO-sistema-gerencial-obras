import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useUIContextController } from "../../context/index.js";

const DeleteFuncionarioModal = ({ visible, setVisible, funcionario, onDelete }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const toggleModal = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    onDelete(funcionario);
    toggleModal();
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
    backgroundColor: "#FF6347", // Vermelho
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <Modal isOpen={visible} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        Confirmar Exclusão
      </ModalHeader>
      <ModalBody style={modalStyle}>
        {funcionario ? (
          <>
            Tem certeza de que deseja excluir o funcionário "{funcionario.nome}" com o CPF "{funcionario.cpf}"?
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </ModalBody>
      <ModalFooter style={modalStyle}>
        <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
          Cancelar
        </Button>
        <Button color="danger" onClick={handleDelete} style={deleteButtonStyle}>
          Excluir
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteFuncionarioModal;