import React, { useState } from "react";
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

const DeleteEquipamentoModal = ({
  visible,
  setVisible,
  onConfirm,
  equipamento,
  getEquipamentos,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [loading, setLoading] = useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });
  const [state] = useUIContextController();
  const { darkMode } = state;

  const toggleModal = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setLoading(true);

    if (equipamento.status === "Em uso") {
      setConfirmacaoVisible({
        visible: true,
        mensagem: "Equipamento não pode ser excluído pois está em uso",
        sucesso: false,
      });
      setLoading(false);
      return;
    } else {
      axios
        .delete(
          `${URL_API}/api/equipamentos/deleteEquipamento?id=${equipamento?.id}`
        )
        .then(() => {
          getEquipamentos();
          toggleModal();
          setLoading(false);
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Equipamento excluído com sucesso",
            sucesso: true,
          });
          
        })
        .catch(() => {
          setLoading(false);
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Erro ao excluir equipamento",
            sucesso: false,
          });
        })
        .finally(() => setLoading(false));
    }
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

  const confirmButtonStyle = {
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
          Tem certeza que deseja excluir o equipamento {equipamento?.nome}?
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={handleConfirm}
            style={confirmButtonStyle}
          >
            {loading ? <Spinner size="sm" color="light" /> : "Excluir"}
          </Button>
        </ModalFooter>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacaoVisible.visible}
        setVisible={setConfirmacaoVisible}
        mensagem={confirmacaoVisible.mensagem}
        sucesso={confirmacaoVisible.sucesso}
      />
    </>
  );
};

export default DeleteEquipamentoModal;
