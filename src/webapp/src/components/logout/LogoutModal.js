import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useUIContextController } from "../../context/index.js";

const LogoutModal = ({ visible, setVisible }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleClose = () => setVisible(false);

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    border: 'none',
    width: '100%',
    maxWidth: '500px', 
    margin: '0 auto', 
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#676767' : '#CECFCB',
    color: darkMode ? '#FFFFFF' : '#343A40',
    border: 'none',
  };

  const logoutButtonStyle = {
    backgroundColor: '#FF6347',
    color: '#FFFFFF',
    border: 'none',
  };

  return (
    <Modal
      isOpen={visible}
      toggle={handleClose}
      centered
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <ModalHeader toggle={handleClose} style={modalStyle}>
        Confirmar Logout
      </ModalHeader>
      <ModalBody style={modalStyle}>
        Tem certeza de que deseja sair?
      </ModalBody>
      <ModalFooter style={modalStyle}>
        <Button color="secondary" onClick={handleClose} style={buttonStyle}>
          Cancelar
        </Button>
        <Button color="danger" onClick={handleLogout} style={logoutButtonStyle}>
          Deslogar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LogoutModal;