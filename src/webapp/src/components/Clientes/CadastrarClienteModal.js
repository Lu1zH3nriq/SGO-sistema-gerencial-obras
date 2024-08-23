import React from "react";
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

const CadastrarClienteModal = ({ visible, setVisible, cliente }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleSubmit = (values) => {
    
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
    marginBottom: "10px",
  };

  const saveButtonStyle = {
    backgroundColor: "#47FF63",
    color: "#FFFFFF",
    border: "none",
  };

  const initialValues = {
    nome: cliente?.nome || "",
    cpf: cliente?.cpf || "",
    email: cliente?.email || "",
    telefone: cliente?.telefone || "",
    sexo: cliente?.sexo?.toLowerCase() || "", 
  };

  return (
    <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        {!cliente ? "Cadastrar Cliente" : "Editar Cliente"}
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
                    <label htmlFor="status">Sexo</label>
                    <div>
                      <Field
                        type="radio"
                        name="status"
                        value="ativo"
                        className="form-check-input"
                        style={buttonStyle}
                        checked={values.sexo === "masculino"}
                        onChange={(e) => setFieldValue("status", e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="ativo">
                        Masculino
                      </label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        name="status"
                        value="inativo"
                        className="form-check-input"
                        style={buttonStyle}
                        checked={values.sexo === "feminino"}
                        onChange={(e) => setFieldValue("status", e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="inativo">
                        Feminino
                      </label>
                    </div>
                  </div>
                </Col>
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

export default CadastrarClienteModal;