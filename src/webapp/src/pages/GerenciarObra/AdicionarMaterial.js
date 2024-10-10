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
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import { useUIContextController } from "../../context/index.js";
import { FaCheckSquare } from "react-icons/fa";
import CadastrarMaterialModal from "components/Materiais/CadastrarMaterialModal.js";

const PesquisarProdutoModal = ({ visible, setVisible }) => {
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
    codigo: "",
  });

  const [cadstrarMaterialModal, setCadastrarMaterialModal] = useState(false);
  const [selectQuantidadeModal, setSelectQuantidadeModal] = useState({
    state: false,
    produto: {},
  });

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`${URL_API}/api/materiais/buscaMateriaisQuery`, {
        params: {
          nome: searchValues.nome || "",
          codigo: searchValues.codigo || "",
        },
      })
      .then((response) => {
        setResultados(response.data || []);
      })
      .catch((error) => {
        const mensagemErro =
          error.response?.data?.error || "Erro ao buscar material.";
        setConfirmacaoVisible({
          visible: true,
          mensagem: mensagemErro,
          sucesso: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSelect = (produto) => {
    setSearchValues({ nome: "", categoria: "", codigo: "" });
    setResultados([]);
    setVisible(false);
  };

  const modalStyle = {
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
  };

  const saveButtonStyle = {
    backgroundColor: darkMode ? "#424242" : "#7A7A7A",
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <Container>
      <Modal
        size="xl"
        isOpen={visible}
        toggle={() => {
          setVisible(false);
          setSearchValues({ nome: "", categoria: "", codigo: "" });
          setResultados([]);
        }}
        centered
      >
        <ModalHeader toggle={() => setVisible(false)} style={{ ...modalStyle }}>
          Pesquisar Material
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
                      <label htmlFor="nome">Nome do Material</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        value={searchValues.nome}
                        onChange={(e) =>
                          setSearchValues({
                            ...searchValues,
                            nome: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="categoria">Categoria</label>
                      <Field
                        type="text"
                        name="categoria"
                        className="form-control"
                        value={searchValues.categoria}
                        onChange={(e) =>
                          setSearchValues({
                            ...searchValues,
                            categoria: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="codigo">Código do Produto</label>
                      <Field
                        type="text"
                        name="codigo"
                        className="form-control"
                        value={searchValues.codigo}
                        onChange={(e) =>
                          setSearchValues({
                            ...searchValues,
                            codigo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "2rem" }}
                  >
                    <div style={{ marginRight: "1rem" }}>
                      <Col>
                        <Button type="submit" style={saveButtonStyle}>
                          {loading ? (
                            <Spinner size="sm" color="light" />
                          ) : (
                            "Pesquisar"
                          )}
                        </Button>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <Button
                          style={saveButtonStyle}
                          onClick={() => {
                            setCadastrarMaterialModal(true);
                          }}
                        >
                          Cadastrar
                        </Button>
                      </Col>
                    </div>
                  </div>
                </Row>
              </Form>
            )}
          </Formik>

          <Table
            responsive
            size="sm"
            bordered
            dark={darkMode}
            style={{ marginTop: "2vh" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Nome
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Código
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Fornecedor
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Unidade de Medida
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Última Compra
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Validade
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Nota Fiscal
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Selecionar
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((produto, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      setSelectQuantidadeModal({
                        state: true,
                        produto: produto,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.nome}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.codigo}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.principalFornecedor}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.unidadeMedida}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.dataUltimaCompra
                        ? new Date(
                            produto.dataUltimaCompra
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.dataValidade
                        ? new Date(produto.dataValidade).toLocaleDateString()
                        : ""}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {produto.numeroNotaFiscal}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <FaCheckSquare
                        size={20}
                        color={darkMode ? "#FFFFFF" : "#7A7A7A"}
                        title="Selecionar"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
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
              setSearchValues({ nome: "", categoria: "", codigo: "" });
              setResultados([]);
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

      <CadastrarMaterialModal
        visible={cadstrarMaterialModal}
        setVisible={() => {
          setCadastrarMaterialModal(false);
        }}
      />

      <Modal
        size="sm"
        isOpen={selectQuantidadeModal.state}
        toggle={() => {
          setSelectQuantidadeModal({
            state: false,
            produto: {},
          });
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setSelectQuantidadeModal({
              state: false,
              produto: {},
            });
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
            border: "none",
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          Selecionar Quantidade
        </ModalHeader>
        <ModalBody
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
            border: "none",
          }}
        >
          <FormGroup>
            <Label for="nomeProduto">Nome</Label>
            <Input
              type="text"
              id="nomeProduto"
              value={selectQuantidadeModal.produto.nome || ""}
              disabled
              style={{
                backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000000",
                marginBottom: "10px",
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="quantidade">Quantidade</Label>
            <Input
              type="number"
              id="quantidade"
              style={{
                backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000000",
                marginBottom: "10px",
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter
          style={{
            border: "none",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
          }}
        >
          <Button
            color="primary"
            style={{
              backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default PesquisarProdutoModal;
