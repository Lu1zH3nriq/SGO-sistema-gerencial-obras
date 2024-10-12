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
  Table,
  Container,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useUIContextController } from "../../context/index.js";
import axios from "axios";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import {
  formatarCPF,
  removerFormatacaoCPF,
  formatarCNPJ,
  removerFormatacaoCNPJ,
} from "../utils/utilsMask.js";
import { FaCheckSquare } from "react-icons/fa";

import CadastrarClienteModal from "../Clientes/CadastrarClienteModal.js";
import boxShadow from "assets/theme/functions/boxShadow.js";

const PesquisarClienteModal = ({ visible, setVisible, setCliente }) => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [confirmacaoVisible, setConfirmacaoVisible] = useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });
  const [searchValues, setSearchValues] = useState({
    nome: "",
    email: "",
    cpf: "",
    cnpj: "",
  });
  const [erroCPF, setErroCPF] = useState("");
  const [erroCNPJ, setErroCNPJ] = useState("");
  const [tipoCliente, setTipoCliente] = useState({
    clienteFisico: false,
    clienteJuridico: false,
    todos: true,
  });
  const [viewCadastrarCliente, setViewCadastrarCliente] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`${URL_API}/api/clientes/buscaClienteQuery`, {
        params: {
          nome: searchValues.nome,
          email: searchValues.email,
          cpf: tipoCliente.clienteFisico
            ? removerFormatacaoCPF(searchValues.cpf)
            : "",
          cnpj: tipoCliente.clienteJuridico
            ? removerFormatacaoCNPJ(searchValues.cnpj)
            : "",
          tipoCliente: tipoCliente.todos
            ? "Todos"
            : tipoCliente.clienteFisico
            ? "Fisica"
            : "Juridica",
        },
      })
      .then((response) => {
        setResultados(response.data || []);
      })
      .catch((error) => {
        let mensagemErro = "Erro ao buscar cliente.";
        if (error.response && error.response.status === 404) {
          mensagemErro = error.response.data.error || mensagemErro;
        }
        setConfirmacaoVisible({
          visible: true,
          mensagem: mensagemErro,
          sucesso: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSelect = (cliente) => {
    setCliente(cliente);
    setSearchValues({ nome: "", email: "", cpf: "", cnpj: "" });
    setResultados([]);
    setVisible(false);
    setTipoCliente({
      clienteFisico: false,
      clienteJuridico: false,
      todos: true,
    });
  };

  const modalStyle = {
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: darkMode ? "#424242" : "#7A7A7A",
    color: "#FFFFFF",
    border: "none",
  };

  const tableStyle = {
    borderRadius: "0.5rem",
    marginTop: "2%",
    tableLayout: "auto",
    backgroundColor: darkMode ? "#333333" : "#FFFFFF", // Cor de fundo da tabela
    color: darkMode ? "#FFFFFF" : "#4A4A4A",
    boxShadow: darkMode
      ? "0px 0px 10px 0px #7F7F7F"
      : "0px 0px 10px 0px #7A7A7A",
  };

  const tableHeaderStyle = {
    textAlign: "center",
    backgroundColor: darkMode ? "#4A4A4A" : "#F8F9FA", // Cor de fundo do cabeçalho
    color: darkMode ? "#FFFFFF" : "#4A4A4A", // Cor do texto do cabeçalho
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#535353" : "#FFFFFF", // Cor de fundo das células
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: darkMode ? "#FFFFFF" : "#4A4A4A", // Cor do texto das células
    fontWeight: "normal", // Texto sem negrito
  };

  const checkboxStyle = {
    backgroundColor: darkMode ? "#4A4A4A" : "#7A7A7A",
    borderColor: darkMode ? "#FFFFFF" : "#7A7A7A",
  };

  return (
    <Container>
      <Modal
        size="xl"
        isOpen={visible}
        toggle={() => setVisible(false)}
        centered
      >
        <ModalHeader
          toggle={() => setVisible(false)}
          style={{
            ...modalStyle,
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          Pesquisar Cliente
        </ModalHeader>
        <ModalBody
          style={{ backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF" }}
        >
          <Formik initialValues={searchValues} onSubmit={handleSearch}>
            {() => (
              <Form style={modalStyle}>
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    border: darkMode
                      ? "1px solid #FFFFFF"
                      : "1px solid rgba(122, 122, 122, 0.5)",
                    boxShadow: darkMode
                      ? "0px 0px 10px 0px #7F7F7F"
                      : "0px 0px 10px 0px #7A7A7A",
                  }}
                >
                  <Row
                    style={{
                      padding: "0rem 0rem 1rem 0rem",
                      margin: "0rem 0rem 1rem 0rem",
                      borderBottom: darkMode
                        ? "1px solid #FFFFFF"
                        : "1px solid rgba(122, 122, 122, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Col md={12}>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tipoCliente"
                          id="clienteFisico"
                          checked={tipoCliente.todos}
                          onChange={() => {
                            setTipoCliente({
                              clienteFisico: false,
                              clienteJuridico: false,
                              todos: true,
                            });
                          }}
                          style={tipoCliente.todos ? checkboxStyle : {}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clienteFisico"
                          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
                        >
                          Todos
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tipoCliente"
                          id="clienteJuridico"
                          checked={tipoCliente.clienteFisico}
                          onChange={() => {
                            setTipoCliente({
                              clienteFisico: true,
                              clienteJuridico: false,
                              todos: false,
                            });
                          }}
                          style={tipoCliente.clienteFisico ? checkboxStyle : {}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clienteJuridico"
                          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
                        >
                          Pessoa Física
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tipoCliente"
                          id="clienteJuridico"
                          checked={tipoCliente.clienteJuridico}
                          onChange={() => {
                            setTipoCliente({
                              clienteFisico: false,
                              clienteJuridico: true,
                              todos: false,
                            });
                          }}
                          style={
                            tipoCliente.clienteJuridico ? checkboxStyle : {}
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clienteJuridico"
                          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
                        >
                          Pessoa Jurídica
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="nome">Nome do Cliente</label>
                        <Field
                          type="text"
                          name="nome"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) => {
                            setSearchValues({
                              ...searchValues,
                              nome: e.target.value,
                            });
                          }}
                          value={searchValues.nome}
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <Field
                          type="text"
                          name="email"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) => {
                            setSearchValues({
                              ...searchValues,
                              email: e.target.value,
                            });
                          }}
                          value={searchValues.email}
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      {tipoCliente.clienteFisico ? (
                        <>
                          <div className="form-group">
                            <label htmlFor="cpf">Cpf</label>
                            <Field
                              type="text"
                              name="cpf"
                              className="form-control"
                              style={inputStyle}
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
                                setSearchValues({
                                  ...searchValues,
                                  cpf: formatedValue,
                                });
                              }}
                              value={searchValues.cpf}
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
                        </>
                      ) : null}
                      {tipoCliente.clienteJuridico ? (
                        <>
                          <div className="form-group">
                            <label htmlFor="cnpj">Cnpj</label>
                            <Field
                              type="text"
                              name="cnpj"
                              className="form-control"
                              style={{
                                ...inputStyle,
                                borderColor: erroCNPJ ? "red" : "",
                              }}
                              value={searchValues.cnpj}
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
                                setSearchValues({
                                  ...searchValues,
                                  cnpj: formatedValue,
                                });
                              }}
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
                        </>
                      ) : null}
                      <div style={{ marginTop: "-15px" }}>
                        {erroCPF ? (
                          <small style={{ color: "red", fontSize: "11px" }}>
                            {erroCPF}
                          </small>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <Col md={2} className="text-center">
                        <Button type="submit" style={saveButtonStyle}>
                          {loading ? (
                            <Spinner size="sm" color="light" />
                          ) : (
                            "Pesquisar"
                          )}
                        </Button>
                      </Col>
                      <Col md={2} className="text-center">
                        <Button
                          style={saveButtonStyle}
                          onClick={() => {
                            setViewCadastrarCliente(true);
                          }}
                        >
                          Cadastrar
                        </Button>
                      </Col>
                    </div>
                  </Row>
                </div>
              </Form>
            )}
          </Formik>

          <Table
            responsive
            size="sm"
            bordered
            dark={darkMode}
            style={{
              ...tableStyle,
              marginTop: "4vh",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Nome</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Cpf / Cnpj</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Selecionar
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((cliente, index) => (
                  <tr
                    key={index}
                    onClick={() => handleSelect(cliente)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={tableCellStyle}>{cliente.nome || "--"}</td>
                    <td style={tableCellStyle}>{cliente.email || "--"}</td>
                    <td style={tableCellStyle}>
                      {cliente.tipoPessoa === "Fisica"
                        ? formatarCPF(cliente.cpf)
                        : formatarCNPJ(cliente.cnpj)}
                    </td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelect(cliente)}
                      >
                        <FaCheckSquare
                          size={20}
                          color={darkMode ? "#FFFFFF" : "#7A7A7A"}
                          title="Selecionar"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ ...tableCellStyle, textAlign: "center" }}
                  >
                    Nenhum resultado encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button
            onClick={() => {
              setVisible(false);
              setSearchValues({ nome: "", email: "", cpf: "", cnpj: "" });
              setResultados([]);
              setTipoCliente({
                clienteFisico: false,
                clienteJuridico: false,
                todos: true,
              });
            }}
            style={{
              backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#4A4A4A",
              border: "none",
            }}
          >
            Fechar
          </Button>
        </ModalFooter>
      </Modal>

      <ConfirmacaoModal
        visible={confirmacaoVisible.visible}
        setVisible={setConfirmacaoVisible}
        mensagem={confirmacaoVisible.mensagem}
        sucesso={confirmacaoVisible.sucesso}
      />

      <CadastrarClienteModal
        visible={viewCadastrarCliente}
        setVisible={setViewCadastrarCliente}
        cliente={null}
        cadastroAoPesquisar={true}
        returnCliente={(cliente) => {
          handleSelect(cliente);
        }}
      />
    </Container>
  );
};

export default PesquisarClienteModal;
