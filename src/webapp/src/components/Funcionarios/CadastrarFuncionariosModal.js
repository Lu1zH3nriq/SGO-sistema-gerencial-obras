import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useUIContextController } from "../../context/index.js";

const CadastrarFuncionariosModal = ({ visible, setVisible, funcionario }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleSubmit = (values) => {};

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
    backgroundColor: "#47FF63",
    color: "#FFFFFF",
    border: "none",
  };

  const checkboxStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const initialValues = {
    nome: funcionario?.nome || "",
    cpf: funcionario?.cpf || "",
    sexo: funcionario?.sexo || "",
    cargo: funcionario?.cargo || "",
    email: funcionario?.email || "",
    telefone: funcionario?.telefone || "",
    tipo: funcionario?.tipo.toLowerCase() || "", // Certifique-se de que o valor está em minúsculas
    dataContratacao: funcionario?.dataContratacao || "",
    status: funcionario?.status.toLowerCase() || "", // Certifique-se de que o valor está em minúsculas
    dataDemissao: funcionario?.dataDemissao || "",
  };

  return (
    <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        {!funcionario ? "Cadastrar Funcionário" : "Editar Funcionário"}
      </ModalHeader>
      <ModalBody style={formStyle}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
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
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <Field
                      type="text"
                      name="cpf"
                      className="form-control"
                      style={inputStyle}
                    />
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="sexo">Sexo</label>
                    <Field
                      as="select"
                      name="sexo"
                      className="form-control"
                      style={inputStyle}
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </Field>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="cargo">Cargo</label>
                    <Field
                      type="text"
                      name="cargo"
                      className="form-control"
                      style={inputStyle}
                    />
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      style={inputStyle}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <Field
                      type="text"
                      name="telefone"
                      className="form-control"
                      style={inputStyle}
                    />
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <div>
                      <Field
                        type="radio"
                        name="tipo"
                        value="terceirizado"
                        className="form-check-input"
                        style={checkboxStyle}
                        checked={values.tipo === "terceirizado"}
                        onChange={(e) => {
                          setFieldValue("tipo", e.target.value);
                          setFieldValue("status", funcionario?.status || "");
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="terceirizado"
                      >
                        Terceirizado
                      </label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        name="tipo"
                        value="efetivo"
                        className="form-check-input"
                        style={checkboxStyle}
                        checked={values.tipo === "efetivo"}
                        onChange={(e) => {
                          setFieldValue("tipo", e.target.value);
                          setFieldValue(
                            "dataContratacao",
                            funcionario?.dataContratacao || ""
                          );
                          setFieldValue("status", funcionario?.status || "");
                        }}
                      />
                      <label className="form-check-label" htmlFor="efetivo">
                        Efetivo
                      </label>
                    </div>
                  </div>
                </Col>
                {values.tipo === "efetivo" && (
                  <>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="dataContratacao">
                          Data de Contratação
                        </label>
                        <Field
                          type="date"
                          name="dataContratacao"
                          className="form-control"
                          style={inputStyle}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <div>
                          <Field
                            type="radio"
                            name="status"
                            value="contratado"
                            className="form-check-input"
                            style={checkboxStyle}
                            checked={values.status === "contratado"}
                            onChange={(e) => {
                              setFieldValue("status", e.target.value);
                              if (e.target.value === "demitido") {
                                setFieldValue("dataDemissao", "");
                              }
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="contratado"
                          >
                            Contratado
                          </label>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="status"
                            value="demitido"
                            className="form-check-input"
                            style={checkboxStyle}
                            checked={values.status === "demitido"}
                            onChange={(e) => {
                              setFieldValue("status", e.target.value);
                              if (e.target.value === "demitido") {
                                setFieldValue("dataDemissao", "");
                              }
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="demitido"
                          >
                            Demitido
                          </label>
                        </div>
                      </div>
                    </Col>
                    {values.status === "demitido" && (
                      <Col md={6}>
                        <div className="form-group">
                          <label htmlFor="dataDemissao">Data de Demissão</label>
                          <Field
                            type="date"
                            name="dataDemissao"
                            className="form-control"
                            style={inputStyle}
                          />
                        </div>
                      </Col>
                    )}
                  </>
                )}
                {values.tipo === "terceirizado" && (
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <div>
                        <Field
                          type="radio"
                          name="status"
                          value="em atividade"
                          className="form-check-input"
                          style={checkboxStyle}
                          checked={values.status === "em atividade"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="em atividade"
                        >
                          Em Atividade
                        </label>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="status"
                          value="inativo"
                          className="form-check-input"
                          style={checkboxStyle}
                          checked={values.status === "inativo"}
                        />
                        <label className="form-check-label" htmlFor="inativo">
                          Inativo
                        </label>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
      <ModalFooter style={modalStyle}>
        <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
          Fechar
        </Button>
        <Button
          color="primary"
          type="submit"
          form="form"
          style={saveButtonStyle}
        >
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CadastrarFuncionariosModal;