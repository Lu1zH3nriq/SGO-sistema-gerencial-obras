import React from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import {
  formatarTelefone,
  removerFormatacaoTelefone,
  formatarDataISO,
} from "components/utils/utilsMask.js";
import axios from "axios";
import ConfirmacaoModal from "./ConfirmacaoModal"; 

const CadastrarUsuarioModal = ({
  visible,
  setVisible,
  usuario,
  newListUsers,
}) => {
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [loading, setLoading] = React.useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = React.useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = React.useState("");
  const [sucesso, setSucesso] = React.useState(false);

  const API_URL = process.env.REACT_APP_URL_API;

  const handleSubmit = (values) => {
    setLoading(true);
    const _usuario = {
      nome: values.nome,
      email: values.email,
      telefone: removerFormatacaoTelefone(values.telefone),
      cargo: values.cargo,
      dataCadastro: formatarDataISO(values.dataCadastro),
      status: values.status,
      nivelUsuario: mapearNivelUsuario(values.nivelUsuario), // Remover parseInt
      tipo: values.tipo,
    };

    if (usuario) {
      axios
        .put(`${API_URL}/api/users/alterarUsuario?id=${usuario.id}`, _usuario, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          axios
            .get(`${API_URL}/api/users/usuarios`)
            .then((response) => {
              newListUsers(response.data);
              setMensagemConfirmacao("Usuário alterado com sucesso!");
              setSucesso(true);
            })
            .catch((error) => {
              console.error(error);
              setMensagemConfirmacao("Erro ao buscar usuários.");
              setSucesso(false);
            })
            .finally(() => {
              setVisible(false);
              setConfirmacaoVisible(true);
            });
        })
        .catch((error) => {
          console.error("Erro:", error);
          setMensagemConfirmacao("Erro ao alterar usuário.");
          setSucesso(false);
          setConfirmacaoVisible(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(`${API_URL}/api/users/novoUsuario`, _usuario, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          axios
            .get(`${API_URL}/api/users/usuarios`)
            .then((response) => {
              newListUsers(response.data);
              setMensagemConfirmacao("Usuário cadastrado com sucesso!");
              setSucesso(true);
            })
            .catch((error) => {
              console.error(error);
              setMensagemConfirmacao("Erro ao buscar usuários.");
              setSucesso(false);
            })
            .finally(() => {
              setVisible(false);
              setConfirmacaoVisible(true);
            });
        })
        .catch((error) => {
          console.error("Erro:", error);
          setMensagemConfirmacao("Erro ao cadastrar usuário.");
          setSucesso(false);
        })
        .finally(() => {
          setLoading(false);
          setConfirmacaoVisible(true);
        });
    }
  };


  function mapearNivelUsuario(nivelUsuario) {
    if (nivelUsuario === "Administrador") {
      return 1;
    } else if (nivelUsuario === "Usuario Comum") {
      return 2;
    }
    return 1; // Valor padrão
  }

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
    backgroundColor: "#1ED760",
    color: "#FFFFFF",
    border: "none",
  };

  const initialValues = {
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    telefone: formatarTelefone(usuario?.telefone) || "",
    cargo: usuario?.cargo || "",
    dataCadastro: usuario?.dataCadastro
      ? new Date(usuario.dataCadastro).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    status: usuario?.status || "Ativo",
    nivelUsuario:
      parseInt(usuario?.nivelUsuario) === 1 ? "Administrador" : "Usuario Comum",
    tipo: usuario?.tipo || "Interno",
  };

  return (
    <>
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
                        value={values.telefone}
                        onChange={(e) => {
                          const formattedPhone = formatarTelefone(
                            e.target.value
                          );
                          setFieldValue("telefone", formattedPhone);
                        }}
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
                          onChange={(e) =>
                            setFieldValue("dataCadastro", e.target.value)
                          }
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
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
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
                        <option value="Usuario Comum">Usuario Comum</option>
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
                    {loading ? <Spinner color="light" size="sm"/> : "Salvar"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <ConfirmacaoModal
        visible={confirmacaoVisible}
        setVisible={setConfirmacaoVisible}
        mensagem={mensagemConfirmacao}
        sucesso={sucesso}
      />
    </>
  );
};

export default CadastrarUsuarioModal;
