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
import axios from "axios";
import { useUIContextController } from "../../context/index.js";
import {
  formatarCNPJ,
  formatarCPF,
  formatarTelefone,
  removerFormatacaoCNPJ,
  removerFormatacaoCPF,
  removerFormatacaoTelefone,
} from "../utils/utilsMask.js";
import ConfirmacaoModal from "../utils/ConfirmacaoModal.js";

const CadastrarClienteModal = ({
  visible = false,
  setVisible,
  cliente = null,
  getClientes,
  cadastroAoPesquisar,
  returnCliente,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [state] = useUIContextController();
  const [loading, setLoading] = React.useState(false);
  const [confirmacaoModal, setConfirmacaoModal] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });
  const [erroCPF, setErroCPF] = React.useState("");
  const [erroCNPJ, setErroCNPJ] = React.useState("");
  const { darkMode } = state;

  const handleSubmit = async (values) => {
    setLoading(true);

    let _cliente = {};
    if (values.tipoPessoa === "Fisica") {
      _cliente = {
        ...values,
        cpf: removerFormatacaoCPF(values.cpf),
        cnpj: null,
        razaoSocial: null,
      };
    } else if (values.tipoPessoa === "Juridica") {
      _cliente = {
        ...values,
        cnpj: removerFormatacaoCNPJ(values.cnpj),
        cpf: null,
        sexo: "Masculino",
      };
    }
    try {
      if (cliente) {
        await axios.put(
          `${URL_API}/api/clientes/alterarCliente?id=${cliente.id}`,
          _cliente
        );
      } else {
        const response = await axios.post(
          `${URL_API}/api/clientes/novoCliente`,
          _cliente
        );

        if (cadastroAoPesquisar) {
          returnCliente(response.data);
          setVisible(false);
          setConfirmacaoModal({
            visible: true,
            mensagem: "Cliente salvo com sucesso.",
            sucesso: true,
          });
          return;
        }
      }

      setConfirmacaoModal({
        visible: true,
        mensagem: "Cliente salvo com sucesso.",
        sucesso: true,
      });
      getClientes();
      setVisible(false);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      setConfirmacaoModal({
        visible: true,
        mensagem: "Erro ao salvar cliente",
        sucesso: false,
      });
    } finally {
      setLoading(false);
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
    marginBottom: "10px",
  };

  const saveButtonStyle = {
    backgroundColor: "#1ED760",
    color: "#FFFFFF",
    border: "none",
  };

  const initialValues = {
    nome: cliente?.nome || "",
    cpf: cliente?.cpf ? formatarCPF(cliente?.cpf) : "",
    cnpj: cliente?.cnpj ? formatarCNPJ(cliente?.cnpj) : "",
    razaoSocial: cliente?.razaoSocial || "",
    email: cliente?.email || "",
    telefone: cliente?.telefone ? formatarTelefone(cliente?.telefone) : "",
    sexo: cliente?.sexo || "--",
    tipoPessoa: cliente?.tipoPessoa || "Fisica",
    endereco: cliente?.endereco || "",
  };

  return (
    <>
      <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader
          toggle={toggleModal}
          style={{
            ...modalStyle,
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          {!cliente ? "Cadastrar Cliente" : "Editar Cliente"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <div style={{ padding: "1rem" }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, setFieldValue }) => (
                <Form style={formStyle}>
                  <Row form="true">
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
                  <Row form="true">
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <Field
                          type="text"
                          name="telefone"
                          className="form-control"
                          style={inputStyle}
                          value={formatarTelefone(values.telefone)}
                          onChange={(e) =>
                            setFieldValue(
                              "telefone",
                              removerFormatacaoTelefone(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div style={{ marginTop: "-15px" }}>
                        <small
                          style={{
                            color: darkMode ? "#FFFFFF" : "Grey",
                            fontSize: "11px",
                          }}
                        >
                          * Somente números
                        </small>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="endereco">Endereço</label>
                        <Field
                          type="text"
                          name="endereco"
                          className="form-control"
                          style={inputStyle}
                          value={values.endereco || ""}
                          onChange={(e) =>
                            setFieldValue("endereco", e.target.value)
                          }
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="tipoPessoa">Tipo</label>
                        <div>
                          <Field
                            type="radio"
                            name="tipoPessoa"
                            value="Fisica"
                            className="form-check-input"
                            style={buttonStyle}
                            checked={values.tipoPessoa === "Fisica"}
                            onChange={(e) =>
                              setFieldValue("tipoPessoa", e.target.value)
                            }
                          />
                          <label className="form-check-label" htmlFor="Fisica">
                            Pessoa Física
                          </label>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="tipoPessoa"
                            value="Juridica"
                            className="form-check-input"
                            style={buttonStyle}
                            checked={values.tipoPessoa === "Juridica"}
                            onChange={(e) =>
                              setFieldValue("tipoPessoa", e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Juridica"
                          >
                            Pessoa Jurídica
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {values.tipoPessoa === "Fisica" && (
                    <>
                      <Row form="true">
                        <Col md={6}>
                          <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <Field
                              type="text"
                              name="cpf"
                              className="form-control"
                              style={{
                                ...inputStyle,
                                borderColor: erroCPF ? "red" : "",
                              }}
                              value={values.cpf}
                              onChange={(e) => {
                                const rawValue = removerFormatacaoCPF(
                                  e.target.value
                                );
                                if (rawValue.length !== 11) {
                                  if (rawValue.length === 0) {
                                    setErroCPF("");
                                  } else {
                                    setErroCPF("CPF inválido.");
                                  }
                                } else {
                                  setErroCPF("");
                                }
                                const formatedValue = formatarCPF(rawValue);
                                setFieldValue("cpf", formatedValue);
                              }}
                            />
                            <div style={{ marginTop: "-15px" }}>
                              <small
                                style={{
                                  color: darkMode ? "#FFFFFF" : "Grey",
                                  fontSize: "11px",
                                }}
                              >
                                * Somente números
                              </small>
                            </div>
                            <div style={{ marginTop: "-15px" }}>
                              {erroCPF ? (
                                <small
                                  style={{ color: "red", fontSize: "11px" }}
                                >
                                  {erroCPF}
                                </small>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <label htmlFor="sexo">Sexo</label>
                            <Field
                              as="select"
                              name="sexo"
                              className="form-control"
                              style={inputStyle}
                              value={values.sexo}
                              onChange={(e) =>
                                setFieldValue("sexo", e.target.value)
                              }
                            >
                              <option value="--">--</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                            </Field>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                  {values.tipoPessoa === "Juridica" && (
                    <>
                      <Row form="true">
                        <Col md={6}>
                          <div className="form-group">
                            <label htmlFor="cnpj">CNPJ</label>
                            <Field
                              type="text"
                              name="cnpj"
                              className="form-control"
                              style={{
                                ...inputStyle,
                                borderColor: erroCNPJ ? "red" : "",
                              }}
                              value={values.cnpj}
                              onChange={(e) => {
                                const rawValue = removerFormatacaoCNPJ(
                                  e.target.value
                                );
                                if (rawValue.length !== 14) {
                                  if (rawValue.length === 0) {
                                    setErroCNPJ("");
                                  } else {
                                    setErroCNPJ("CNPJ inválido.");
                                  }
                                } else {
                                  setErroCNPJ("");
                                }
                                const formatedValue = formatarCNPJ(rawValue);
                                setFieldValue("cnpj", formatedValue);
                              }}
                            />
                            <div style={{ marginTop: "-15px" }}>
                              <small
                                style={{
                                  color: darkMode ? "#FFFFFF" : "Grey",
                                  fontSize: "11px",
                                }}
                              >
                                * Somente números
                              </small>
                            </div>
                            <div style={{ marginTop: "-15px" }}>
                              {erroCNPJ ? (
                                <small
                                  style={{ color: "red", fontSize: "11px" }}
                                >
                                  {erroCNPJ}
                                </small>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <label htmlFor="razaoSocial">Razão Social</label>
                            <Field
                              type="text"
                              name="razaoSocial"
                              className="form-control"
                              style={inputStyle}
                              value={values.razaoSocial || ""}
                              onChange={(e) =>
                                setFieldValue("razaoSocial", e.target.value)
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                  <ModalFooter style={modalStyle}>
                    <Button
                      color="secondary"
                      onClick={toggleModal}
                      style={{
                        backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
                        color: darkMode ? "#FFFFFF" : "#4A4A4A",
                        border: "none",
                      }}
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
          </div>
        </ModalBody>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacaoModal.visible}
        setVisible={setConfirmacaoModal}
        mensagem={confirmacaoModal.mensagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </>
  );
};

export default CadastrarClienteModal;
