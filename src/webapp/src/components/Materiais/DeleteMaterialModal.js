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
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import axios from "axios";

const DeleteMaterialModal = ({
  visible,
  setVisible,
  material,
  getMaterials,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [state] = useUIContextController();
  const { darkMode } = state;
  const [confirmacaoModal, setConfirmacaoModal] = React.useState({
    visivel: false,
    mensagem: "",
    sucesso: false,
  });
  const [loading, setLoading] = React.useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`${URL_API}/api/materiais/deleteMaterial?id=${material.id}`)
      .then(() => {
        setConfirmacaoModal({
          visivel: true,
          mensagem: "Material excluído com sucesso!",
          sucesso: true,
        });
        getMaterials();
      })
      .catch(() => {
        setConfirmacaoModal({
          visivel: true,
          mensagem: "Erro ao excluir o material!",
          sucesso: false,
        });
      })
      .finally(() => {
        setLoading(false);
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
        <ModalBody>
          <p>Tem certeza que deseja excluir o material: </p>
          <p>
            nome: <span>{material?.nome}</span>
          </p>
          <p>
            codigo: <span>{material?.codigo}</span>
          </p>
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
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
        visible={confirmacaoModal.visivel}
        setVisible={setConfirmacaoModal}
        mensagem={confirmacaoModal.mensagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </>
  );
};

export default DeleteMaterialModal;
