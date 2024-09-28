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

import CadastrarFuncionariosModal from "../Funcionarios/CadastrarFuncionariosModal.js";

const PesquisarResponsavelModal = ({ visible, setVisible, setFuncionario }) => {
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
  });
  const [erroCPF, setErroCPF] = useState("");
  const [tipoFuncionario, setTipoFuncionario] = useState({
    efetivo: false,
    terceirizado: false,
    todos: true,
  });
  const [viewCadastrarFuncionario, setViewCadastrarFuncionario] =
    useState(false);

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`${URL_API}/api/funcionarios/buscaFuncionarioQuery`, {
        params: {
          nome: searchValues.nome,
          email: searchValues.email,
          cpf: removerFormatacaoCPF(searchValues.cpf),
          tipoFuncionario: tipoFuncionario.efetivo
            ? "Efetivo"
            : tipoFuncionario.terceirizado
            ? "Terceirizado"
            : "Todos",
        },
      })
      .then((response) => {
        setResultados(response.data || []);
      })
      .catch((error) => {
        let mensagemErro = "Erro ao buscar funcionário.";
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

  const handleSelect = (funcionario) => {
    setFuncionario(funcionario);
    setSearchValues({ nome: "", email: "", cpf: "", cnpj: "" });
    setResultados([]);
    setVisible(false);
    setTipoFuncionario({
      efetivo: false,
      terceirizado: false,
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

  const buttonStyle = {
    backgroundColor: darkMode ? "#424242" : "#7A7A7A",
    color: darkMode ? "#FFFFFF" : "#FFFFFF",
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
    backgroundColor: darkMode ? "#4A4A4A" : "#F8F9FA", 
    color: darkMode ? "#FFFFFF" : "#4A4A4A", 
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#535353" : "#FFFFFF", 
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: darkMode ? "#FFFFFF" : "#4A4A4A", 
    fontWeight: "normal", 
  };

  const checkboxStyle = {
    backgroundColor: darkMode ? "#4A4A4A" : "#7A7A7A",
    borderColor: darkMode ? "#FFFFFF" : "#7A7A7A",
  };

  return (
    <Container>
      <Modal
        size="lg"
        isOpen={visible}
        toggle={() => setVisible(false)}
        centered
      >
        <ModalHeader toggle={() => setVisible(false)} style={modalStyle}>
          Pesquisar Funcionario
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
                  <Row style={{ padding: "0rem 0rem 1rem 0rem" }}>
                    <Col md={12}>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tipoCliente"
                          id="clienteFisico"
                          checked={tipoFuncionario.todos}
                          onChange={() => {
                            setTipoFuncionario({
                              efetivo: false,
                              terceirizado: false,
                              todos: true,
                            });
                          }}
                          style={tipoFuncionario.todos ? checkboxStyle : {}}
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
                          checked={tipoFuncionario.terceirizado}
                          onChange={() => {
                            setTipoFuncionario({
                              efetivo: false,
                              terceirizado: true,
                              todos: false,
                            });
                          }}
                          style={
                            tipoFuncionario.terceirizado ? checkboxStyle : {}
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clienteJuridico"
                          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
                        >
                          Terceirizado
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tipoCliente"
                          id="clienteJuridico"
                          checked={tipoFuncionario.efetivo}
                          onChange={() => {
                            setTipoFuncionario({
                              efetivo: true,
                              terceirizado: false,
                              todos: false,
                            });
                          }}
                          style={tipoFuncionario.efetivo ? checkboxStyle : {}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clienteJuridico"
                          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
                        >
                          Efetivo
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="nome">Nome do funcionário</label>
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
                            setViewCadastrarFuncionario(true);
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
                <th style={tableHeaderStyle}>Cpf</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Selecionar
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((funcionario, index) => (
                  <tr
                    key={index}
                    onClick={() => handleSelect(funcionario)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={tableCellStyle}>{funcionario.nome || "--"}</td>
                    <td style={tableCellStyle}>{funcionario.email || "--"}</td>
                    <td style={tableCellStyle}>
                      {formatarCPF(funcionario.cpf) || "--"}
                    </td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelect(funcionario)}
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
              setSearchValues({ nome: "", email: "", cpf: "" });
              setResultados([]);
              setTipoFuncionario({
                efetivo: false,
                terceirizado: false,
                todos: true,
              });
            }}
            style={buttonStyle}
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

      <CadastrarFuncionariosModal
        visible={viewCadastrarFuncionario}
        setVisible={setViewCadastrarFuncionario}
        funcionario={null}
        cadastroAoPesquisar={true}
        returnFuncionario={(func) => {
          handleSelect(func);
        }}
      />
    </Container>
  );
};

export default PesquisarResponsavelModal;
