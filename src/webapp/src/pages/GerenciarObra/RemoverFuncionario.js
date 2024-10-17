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

const RemoverFuncionario = ({
  visible,
  setVisible,
  funcionario,
  onDelete,
  getFuncionarios,
  obra,

}) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [loading, setLoading] = React.useState(false);
  const [confirmacaoModal, setConfirmacaoModal] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });
  const [state] = useUIContextController();
  const { darkMode } = state;


  const toggleModal = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setLoading(true);

    let data = {
      ...funcionario,
      obraId: null,
    }
    axios
      .put(`${URL_API}/api/funcionarios/alterarFuncionario?id=${data.id}`, data)
      .then((response) => {
        setConfirmacaoModal({
          visible: true,
          mensagem: "Funcionário removido com sucesso!",
          sucesso: true,
        });
        getFuncionarios(obra.id);
      })
      .catch((error) => {
        setConfirmacaoModal({
          visible: true,
          mensagem: "Erro ao remover este funcionário!",
          sucesso: false,
        });
      })
      .finally(() => {
        setLoading(false);
        setVisible(false);
      });
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };
  const deleteButtonStyle = {
    backgroundColor: "#FF6347", // Vermelho
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <>
      <Modal isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={{
          ...modalStyle,
          borderBottom: darkMode ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(52, 58, 64, 0.2)"
        }}>
          Confirmar remoção
        </ModalHeader>
        <ModalBody
          style={{
            justifyContent: "center",
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
            border: "none",
          }}
        >

          {funcionario ? (
            <>

              <p>Tem certeza que deseja remover {funcionario.nome} dos funcionários alocados na obra: <strong>{obra.nome}</strong></p>

              <p>
                Nome: <strong>{funcionario.nome}</strong>
              </p>
              <p>
                CPF:
                <strong>{funcionario.cpf}</strong>
              </p>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button
            color="secondary"
            onClick={toggleModal}
            style={{
              backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
          >
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={handleDelete}
            style={deleteButtonStyle}
          >
            {loading ? <Spinner size="sm" color="light" /> : "Remover"}
          </Button>
        </ModalFooter>
      </Modal >

      <ConfirmacaoModal
        visible={confirmacaoModal.visible}
        setVisible={setConfirmacaoModal}
        mensagem={confirmacaoModal.mensagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </>
  );
};

export default RemoverFuncionario;
