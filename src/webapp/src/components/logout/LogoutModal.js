import React from "react";
import { Modal, Button } from "react-bootstrap";

const LogoutModal = ({ visible, setVisible }) => {
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

  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        centered
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente sair do sistema?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Encerrar sessão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;
