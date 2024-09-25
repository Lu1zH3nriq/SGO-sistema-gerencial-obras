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
import { formatarCPF, removerFormatacaoCPF } from "../utils/utilsMask.js";
import { FaCheckSquare } from "react-icons/fa";

const PesquisarFuncionarioModal = ({
  visible,
  setVisible,
  onSelectFuncionario,
}) => {
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
  const [erroCPF, setErroCPF] = React.useState("");

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`${URL_API}/api/funcionarios/buscaFuncionarioQuery`, {
        params: {
          nome: searchValues.nome,
          email: searchValues.email,
          cpf: removerFormatacaoCPF(searchValues.cpf),
        },
      })
      .then((response) => {
        setResultados(response.data || []);
      })
      .catch((error) => {
        setConfirmacaoVisible({
          visible: true,
          mensagem: "Erro ao buscar funcionários",
          sucesso: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSelect = (funcionario) => {
    onSelectFuncionario(funcionario);
    setSearchValues({ nome: "", email: "", cpf: "" });
    setResultados([]);
    setVisible(false);
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
    backgroundColor: darkMode ? '#424242':  "#7A7A7A",
    color: "#FFFFFF",
    border: "none",
  };

  const tableHeaderStyle = {
    textAlign: "center",
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
          Pesquisar Funcionário
        </ModalHeader>
        <ModalBody
          style={{ backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF" }}
        >
          <Formik initialValues={searchValues} onSubmit={handleSearch}>
            {() => (
              <Form style={modalStyle}>
                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome do Funcionário</label>
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
                    <div className="form-group">
                      <label htmlFor="cpf">Cpf</label>
                      <Field
                        type="text"
                        name="cpf"
                        className="form-control"
                        style={inputStyle}
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
                          setSearchValues({
                            ...searchValues,
                            cpf: formatedValue,
                          });
                        }}
                        value={searchValues.cpf}
                      />
                    </div>
                    <div style={{ marginTop: "-15px" }}>
                      <small style={{ color: "Grey", fontSize: "11px" }}>
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
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={12} className="text-center">
                    <Button type="submit" style={saveButtonStyle}>
                      {loading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Pesquisar"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          <Table
            responsive
            size="sm"
            bordered
            dark={darkMode}
            style={{
              borderRadius: "0px",
              marginTop: "2%",
              tableLayout: "auto",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Nome</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Cpf</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((funcionario, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{funcionario.nome || "--"}</td>
                    <td style={tableCellStyle}>{funcionario.email || "--"}</td>
                    <td style={tableCellStyle}>{ formatarCPF(funcionario.cpf) || "--"}</td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelect(funcionario)}
                      >
                        <FaCheckSquare size={20} color={ darkMode ? "#FFFFFF" : "#7A7A7A" } title="Selecionar" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Nenhum resultado encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button
            onClick={() => setVisible(false)}
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
    </Container>
  );
};

export default PesquisarFuncionarioModal;
