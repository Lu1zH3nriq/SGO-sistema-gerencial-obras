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
      .get(`${URL_API}/obras`)
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

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
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

  const tableHeaderStyle = {
    textAlign: "center",
  };

  const tableCellStyle = {
    textAlign: "center",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    padding: "0.5rem",
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
          Pesquisar Obra
        </ModalHeader>
        <ModalBody
          style={{ backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF" }}
        >
          <Formik
            initialValues={{ nome: "", contrato: "", alvara: "" }}
            onSubmit={handleSearch}
          >
            {(setFieldValues, values) => (
              <Form style={modalStyle}>
                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome da Obra</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => setFieldValues('nome',e.target.value)}
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
                        onChange={(e) => setFieldValues('contrato',e.target.value)}
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
                        onChange={(e) => setFieldValues('alvara',e.target.value)}
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
                <th style={tableHeaderStyle}>Nome da obra</th>
                <th style={tableHeaderStyle}>Cliente</th>
                <th style={tableHeaderStyle}>Contrato</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((obra, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{obra.nome || "--"}</td>
                    <td style={tableCellStyle}>{obra.cliente || "--"}</td>
                    <td style={tableCellStyle}>{obra.contrato || "--"}</td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => handleSelect(obra)}
                        >
                          Selecionar
                        </Button>
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
            color="secondary"
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

export default PesquisarObraModal;
