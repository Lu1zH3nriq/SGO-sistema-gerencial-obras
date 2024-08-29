import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useUIContextController } from '../../context/index.js';

const DeleteMaterialModal = ({ visible, setVisible, material }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleDelete = () => {
    // Lógica para deletar o material
    console.log(`Material deletado: ${material.nome}`);
    setVisible(false);
  };

  const toggleModal = () => {
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

  const deleteButtonStyle = {
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
        Tem certeza que deseja excluir o material "{material?.nome}" com código {material?.codigo} ?
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

export default DeleteMaterialModal;