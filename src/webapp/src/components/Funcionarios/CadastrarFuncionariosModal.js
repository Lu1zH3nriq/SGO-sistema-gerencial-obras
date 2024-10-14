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
import {
  formatarCPF,
  formatarTelefone,
  removerFormatacaoCPF,
  removerFormatacaoTelefone,
} from "../../components/utils/utilsMask.js";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const CadastrarFuncionariosModal = ({
  visible,
  setVisible,
  funcionario,
  getFuncionarios,
  cadastroAoPesquisar,
  returnFuncionario,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [loading, setLoading] = useState(false);

  const [state] = useUIContextController();
  const { darkMode } = state;

  const [confirmacaoVisible, setConfirmacaoVisible] = useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });
  const [erroCPF, setErroCPF] = useState("");

  const handleSubmit = (values) => {
    setLoading(true);
    const data = {
      ...values,
      cpf: removerFormatacaoCPF(values.cpf),
      telefone: removerFormatacaoTelefone(values.telefone),
      dataDemissao: values.dataDemissao ? values.dataDemissao : null,
    };
    if (!funcionario) {
      axios
        .post(`${URL_API}/api/funcionarios/novoFuncionario`, data)
        .then((res) => {
          if (cadastroAoPesquisar) {
            returnFuncionario(res.data.funcionario);
            setConfirmacaoVisible({
              visible: true,
              mensagem: "Funcionário cadastrado com sucesso!",
              sucesso: true,
            });
            setVisible(false);
            return;
          }

          setConfirmacaoVisible({
            visible: true,
            mensagem: "Funcionário cadastrado com sucesso!",
            sucesso: true,
          });
          getFuncionarios();
        })
        .catch((error) => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Erro ao cadastrar funcionário!",
            sucesso: false,
          });
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setVisible(false);
        });
    } else {
      axios
        .put(
          `${URL_API}/api/funcionarios/alterarFuncionario?id=${funcionario.id}`,
          data
        )
        .then(() => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Funcionário alterado com sucesso!",
            sucesso: true,
          });
          getFuncionarios();
        })
        .catch((error) => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Erro ao alterar funcionário!",
            sucesso: false,
          });
          console.error(error);
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

  const checkboxStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const initialValues = {
    nome: funcionario?.nome || "",
    telefone: funcionario?.telefone || "",
    email: funcionario?.email || "",
    endereco: funcionario?.endereco || "",
    cpf: funcionario?.cpf || "",
    tipo: funcionario?.tipo || "",
    status: funcionario?.status || "",
    sexo: funcionario?.sexo || "",
    cargo: funcionario?.cargo || "",
    dataContratacao: funcionario?.dataContratacao
      ? new Date(funcionario?.dataContratacao).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0] || "",
    dataDemissao: funcionario?.dataDemissao
      ? new Date(funcionario?.dataDemissao).toISOString().split("T")[0]
      : "" || "",
    isUser: funcionario?.isUser ? true : false,
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
          {!funcionario ? "Cadastrar Funcionário" : "Editar Funcionário"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form style={formStyle}>
                <Row style={{ padding: "0.5rem 0rem 0.5rem 0rem" }}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        style={inputStyle}
                        value={values.nome}
                        onChange={(e) => setFieldValue("nome", e.target.value)}
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
                        style={{
                          ...inputStyle,
                          borderColor: erroCPF ? "red" : "",
                        }}
                        value={values.cpf}
                        onChange={(e) => {
                          const rawValue = removerFormatacaoCPF(e.target.value);
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
                          <small style={{ color: "red", fontSize: "11px" }}>
                            {erroCPF}
                          </small>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="sexo">Sexo</label>
                      <Field
                        as="select"
                        name="sexo"
                        className="form-control"
                        style={inputStyle}
                        value={values.sexo}
                        onChange={(e) => setFieldValue("sexo", e.target.value)}
                      >
                        <option value="--">--</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
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
                        value={values.cargo}
                        onChange={(e) => setFieldValue("cargo", e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        style={inputStyle}
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
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
                        value={formatarTelefone(values.telefone)}
                        onChange={(e) =>
                          setFieldValue("telefone", e.target.value)
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
                        value={values.endereco}
                        onChange={(e) =>
                          setFieldValue("endereco", e.target.value)
                        }
                      />
                    </div>
                  </Col>
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
                        onChange={(e) =>
                          setFieldValue("dataContratacao", e.target.value)
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <div>
                        <Field
                          type="radio"
                          name="tipo"
                          value="Terceirizado"
                          className="form-check-input"
                          style={checkboxStyle}
                          checked={values.tipo === "Terceirizado"}
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
                          value="Efetivo"
                          className="form-check-input"
                          style={checkboxStyle}
                          checked={values.tipo === "Efetivo"}
                          onChange={(e) => {
                            setFieldValue("tipo", e.target.value);
                            setFieldValue("status", funcionario?.status || "");
                          }}
                        />
                        <label className="form-check-label" htmlFor="efetivo">
                          Efetivo
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="isUser">Usuário:</label>
                      <div>
                        <Field
                          type="checkbox"
                          name="isUser"
                          className="form-check-input"
                          style={checkboxStyle}
                          checked={values.isUser ? true : false}
                          onChange={(e) => {
                            setFieldValue("isUser", e.target.checked);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isUser"
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Sim
                        </label>
                      </div>
                    </div>
                  </Col>
                  {values.tipo === "Efetivo" && (
                    <>
                      <Col md={6}>
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <div>
                            <Field
                              type="radio"
                              name="status"
                              value="Contratado"
                              className="form-check-input"
                              style={checkboxStyle}
                              checked={values.status === "Contratado"}
                              onChange={(e) => {
                                setFieldValue("status", e.target.value);
                                if (e.target.value === "Demitido") {
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
                              value="Demitido"
                              className="form-check-input"
                              style={checkboxStyle}
                              checked={values.status === "Demitido"}
                              onChange={(e) => {
                                setFieldValue("status", e.target.value);
                                if (e.target.value === "Demitido") {
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
                      {values.status === "Demitido" && (
                        <Col md={6}>
                          <div className="form-group">
                            <label htmlFor="dataDemissao">
                              Data de Demissão
                            </label>
                            <Field
                              type="date"
                              name="dataDemissao"
                              className="form-control"
                              style={inputStyle}
                              value={values.dataDemissao}
                              onChange={(e) =>
                                setFieldValue("dataDemissao", e.target.value)
                              }
                            />
                          </div>
                        </Col>
                      )}
                    </>
                  )}
                  {values.tipo === "Terceirizado" && (
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <div>
                          <Field
                            type="radio"
                            name="status"
                            value="Em Atividade"
                            className="form-check-input"
                            style={checkboxStyle}
                            checked={values.status === "Em Atividade"}
                            onChange={(e) =>
                              setFieldValue("status", e.target.value)
                            }
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
                            value="Inativo"
                            className="form-check-input"
                            style={checkboxStyle}
                            checked={values.status === "Inativo"}
                            onChange={(e) =>
                              setFieldValue("status", e.target.value)
                            }
                          />
                          <label className="form-check-label" htmlFor="inativo">
                            Inativo
                          </label>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
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
                  <Button color="primary" type="submit" style={saveButtonStyle}>
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
        mensagem={confirmacaoVisible.mensagem}
        sucesso={confirmacaoVisible.sucesso}
      />
    </>
  );
};

export default CadastrarFuncionariosModal;