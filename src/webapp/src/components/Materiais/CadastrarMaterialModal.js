import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useUIContextController } from "../../context/index.js";
import axios from "axios";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const CadastrarMaterialModal = ({
  visible,
  setVisible,
  material,
  getMaterials,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [loading, setLoading] = useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = useState({
    visible: false,
    message: "",
    sucesso: false,
  });

  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleSubmit = (values) => {
    setLoading(true);

    const data = {
      ...values,
    };

    if (data.dataValidade === "--") {
      data.dataValidade = null;
    }

    if (material) {
      axios
        .put(
          `${URL_API}/api/materiais/alterarMaterial?id=${material.id}`,
          data
        )
        .then(() => {
          setConfirmacaoVisible({
            visible: true,
            message: "Material editado com sucesso!",
            sucesso: true,
          });

          getMaterials();
        })
        .catch((error) => {
          console.log(error);
          setConfirmacaoVisible({
            visible: true,
            message: "Erro ao editar material!",
            sucesso: false,
          });
        })
        .finally(() => {
          setLoading(false);
          setVisible(false);
        });
    } else {
      axios
        .post(`${URL_API}/api/materiais/novoMaterial`, data)
        .then(() => {
          setConfirmacaoVisible({
            visible: true,
            message: "Material cadastrado com sucesso!",
            sucesso: true,
          });

          getMaterials();
        })
        .catch((error) => {
          setConfirmacaoVisible({
            visible: true,
            message: "Erro ao cadastrar material!",
            sucesso: false,
          });
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          setVisible(false);
        });
    }
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

  const formStyle = {
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    marginBottom: "10px", // Espaçamento vertical entre os inputs
  };

  const saveButtonStyle = {
    backgroundColor: "#1ED760",
    color: "#FFFFFF",
    border: "none",
  };

  const initialValues = {
    nome: material?.nome || "",
    codigo: material?.codigo || "",
    principalFornecedor: material?.principalFornecedor || "",
    unidadeMedida: material?.unidadeMedida || "",
    dataUltimaCompra: material?.dataUltimaCompra
      ? new Date(material?.dataUltimaCompra).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
      dataValidade: material?.dataValidade
      ? new Date(material?.dataValidade).toISOString().split("T")[0]
      : "--",
      numeroNotaFiscal: material?.numeroNotaFiscal || "",
  };

  return (
    <>
      <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={modalStyle}>
          {!material ? "Cadastrar Material" : "Editar Material"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
              <Form style={formStyle}>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("nome", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="codigo">Código</label>
                      <Field
                        type="text"
                        name="codigo"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("codigo", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="principalFornecedor">Principal Fornecedor</label>
                      <Field
                        type="text"
                        name="principalFornecedor"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("principalFornecedor", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="unidadeMedida">Unidade de Medida</label>
                      <Field
                        type="text"
                        name="unidadeMedida"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("unidadeMedida", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="dataUltimaCompra">Data Última Compra</label>
                      <Field
                        type="date"
                        name="dataUltimaCompra"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("dataUltimaCompra", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="dataValidade">Validade</label>
                      <Field
                        type="date"
                        name="dataValidade"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("dataValidade", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="numeroNotaFiscal">Nota Fiscal</label>
                      <Field
                        type="text"
                        name="numeroNotaFiscal"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("numeroNotaFiscal", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                {/* Adicione mais campos do formulário aqui */}
                <ModalFooter style={modalStyle}>
                  <Button
                    color="secondary"
                    onClick={toggleModal}
                    style={buttonStyle}
                  >
                    Fechar
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    style={saveButtonStyle}
                  >
                    {loading ? <Spinner size="sm" color="light" /> : "Salvar"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacaoVisible.visible}
        setVisible={setConfirmacaoVisible}
        mensagem={confirmacaoVisible.message}
        sucesso={confirmacaoVisible.sucesso}
      />
    </>
  );
};

export default CadastrarMaterialModal;
