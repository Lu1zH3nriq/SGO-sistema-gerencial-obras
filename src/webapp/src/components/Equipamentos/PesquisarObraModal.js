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
import { FaCheckSquare } from "react-icons/fa";

const PesquisarObraModal = ({ visible, setVisible, onSelectObra }) => {
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

  const handleSearch = (values) => {
    setLoading(true);
    axios
      .get(`${URL_API}/api/obras/buscaObraQuery`, {
        params: {
          nome: values.nome,
          contrato: values.contrato,
          alvara: values.alvara,
        },
      })
      .then((response) => {
        setResultados(response.data || []);
      })
      .catch((error) => {
        setConfirmacaoVisible({
          visible: true,
          mensagem: "Erro ao buscar as obras",
          sucesso: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSelect = (obra) => {
    onSelectObra(obra);
    setVisible(false);
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
    backgroundColor: "#1ED760",
    color: "#FFFFFF",
    border: "none",
  };

  const tableStyle = {
    borderRadius: "0.5rem",
    marginTop: "2%",
    tableLayout: "auto",
    backgroundColor: darkMode ? "#333333" : "#FFFFFF",
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

  return (
    <Container>
      <Modal
        size="xl"
        isOpen={visible}
        toggle={() => setVisible(false)}
        centered
      >
        <ModalHeader
          toggle={() => {
            setVisible(false);
            setResultados([]);
            setLoading(false);
            setConfirmacaoVisible({
              visible: false,
              mensagem: "",
              sucesso: false,
            });
          }}
          style={{
            ...modalStyle,
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          Pesquisar Obra
        </ModalHeader>
        <ModalBody
          style={{ backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF" }}
        >
          <Formik
            initialValues={{ nome: "", contrato: "", alvara: "" }}
            onSubmit={handleSearch}
          >
            {(
              { setFieldValue, values }
            ) => (
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
                  <Row className="mt-3">
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="nome">Nome da Obra</label>
                        <Field
                          type="text"
                          name="nome"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            setFieldValue("nome", e.target.value)
                          } 
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="contrato">Número do Contrato</label>
                        <Field
                          type="text"
                          name="contrato"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            setFieldValue("contrato", e.target.value)
                          } 
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="form-group">
                        <label htmlFor="alvara">Alvará</label>
                        <Field
                          type="text"
                          name="alvara"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            setFieldValue("alvara", e.target.value)
                          } 
                        />
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
                <th style={tableHeaderStyle}>Nome da obra</th>
                <th style={tableHeaderStyle}>Cliente</th>
                <th style={tableHeaderStyle}>Contrato</th>
                <th style={tableHeaderStyle}>Alvará</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((obra, index) => (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleSelect(obra);
                    }}
                  >
                    <td style={tableCellStyle}>{obra.nome || "--"}</td>
                    <td style={tableCellStyle}>{obra.cliente || "--"}</td>
                    <td style={tableCellStyle}>{obra.contrato || "--"}</td>
                    <td style={tableCellStyle}>{obra.alvara || "--"}</td>
                    <td style={tableCellStyle}>
                      <div onClick={() => handleSelect(obra)}>
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
            color="secondary"
            onClick={() => {
              setVisible(false);
              setResultados([]);
              setLoading(false);
              setConfirmacaoVisible({
                visible: false,
                mensagem: "",
                sucesso: false,
              });
            }}
            style={{
              backgroundColor: darkMode ? "#424242" : "#7A7A7A",
              color: darkMode ? "#FFFFFF" : "#FFFFFF",
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
    </Container>
  );
};

export default PesquisarObraModal;
