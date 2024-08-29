import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useUIContextController } from '../../context/index.js';

const DeleteEquipamentoModal = ({ visible, setVisible, onConfirm, equipamento }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const toggleModal = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    border: 'none',
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#676767' : '#CECFCB',
    color: darkMode ? '#FFFFFF' : '#343A40',
    border: 'none',
  };

  const confirmButtonStyle = {
    backgroundColor: '#FF4747',
    color: '#FFFFFF',
    border: 'none',
  };

  return (
    <Modal
      isOpen={visible}
      toggle={toggleModal}
      centered
    >
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        Confirmar Exclusão
      </ModalHeader>
      <ModalBody style={modalStyle}>
        Tem certeza que deseja excluir o equipamento {equipamento?.nome}?
      </ModalBody>
      <ModalFooter style={modalStyle}>
        <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
          Cancelar
        </Button>
        <Button color="danger" onClick={handleConfirm} style={confirmButtonStyle}>
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteEquipamentoModal;