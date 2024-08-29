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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CadastrarUsuarioModal = ({ visible, setVisible, usuario }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleSubmit = (values) => {
    // Lógica para salvar os dados do formulário
    console.log(values);
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

  const datePickerStyle = {
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    width: "100%",
    padding: ".375rem .75rem",
  };

  const saveButtonStyle = {
    backgroundColor: "#47FF63",
    color: "#FFFFFF",
    border: "none",
  };

  const initialValues = {
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    telefone: usuario?.telefone || "",
    cargo: usuario?.cargo || "",
    dataCadastro: usuario?.dataCadastro
      ? new Date(usuario.dataCadastro)
      : new Date(),
    status: usuario?.status || "ativo",
    nivelUsuario: usuario?.nivelUsuario || "Usuario Comum",
    tipo: usuario?.tipo || "Interno",
  };

  return (
    <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        {!usuario ? "Cadastrar Usuário" : "Editar Usuário"}
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
                    />
                  </div>
                </Col>
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
              </Row>
              <Row form>
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
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="dataCadastro">Data de Cadastro</label>
                    <div style={{ width: "100%" }}>
                      <Field
                        type="date"
                        name="dataCadastro"
                        className="form-control"
                        style={inputStyle}
                        
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <Field
                      as="select"
                      name="status"
                      className="form-control"
                      style={inputStyle}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </Field>
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="nivelUsuario">Nível de Usuário</label>
                    <Field
                      as="select"
                      name="nivelUsuario"
                      className="form-control"
                      style={inputStyle}
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Usuario Comum">Usuário Comum</option>
                    </Field>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <Field
                      as="select"
                      name="tipo"
                      className="form-control"
                      style={inputStyle}
                    >
                      <option value="Interno">Interno</option>
                      <option value="Externo">Externo</option>
                    </Field>
                  </div>
                </Col>
              </Row>
              <ModalFooter style={modalStyle}>
                <Button
                  color="secondary"
                  onClick={toggleModal}
                  style={buttonStyle}
                >
                  Fechar
                </Button>
                <Button color="primary" type="submit" style={saveButtonStyle}>
                  Salvar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default CadastrarUsuarioModal;
