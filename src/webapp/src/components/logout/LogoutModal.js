import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useUIContextController } from "../../context/index.js";

const LogoutModal = ({ visible, setVisible }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleClose = () => setVisible();

  const handleLogout = () => {
    sessionStorage.setItem("userLogin", "false");
    sessionStorage.setItem("userType", null);
    sessionStorage.setItem("userToken", null);
    sessionStorage.setItem("userName", null);
    sessionStorage.setItem("userId", null);
    window.location.reload();
    handleClose();
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: 'none',
  };

  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        centered
        style={modalStyle}
      >
        <Modal.Header closeButton style={modalStyle}>
          <Modal.Title>Atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente sair do sistema?
        </Modal.Body>
        <Modal.Footer style={modalStyle}>
          <Button variant="secondary" onClick={handleClose} style={buttonStyle}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout} style={{
            backgroundColor: "#FF0000",
            color: "#FFFFFF",
            border: 'none',
          }}>
            Encerrar sessão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;