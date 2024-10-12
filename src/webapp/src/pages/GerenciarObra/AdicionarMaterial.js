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
import CurrencyInput from "react-currency-input-field";

const AdicionarMaterial = ({ visible, setVisible, obra }) => {
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

  const [loadingAddMaterial, setLoadingAddMaterial] = useState(false);
  const [quantidadeMaterial, setQuantidadeMaterial] = useState(0);
  const [valorMaterial, setValorMaterial] = useState(0);

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

  const handleSelect = () => {
    setLoadingAddMaterial(true);

    const data = {
      ObraId: obra.id,
      MaterialId: selectQuantidadeModal.produto.id,
      quantidade: quantidadeMaterial,
      valor: parseFloat(valorMaterial).toFixed(2),
      dataAlocacao: new Date().toLocaleString().split(",")[0],
      nomeMaterial: selectQuantidadeModal.produto.nome,
      nomeObra: obra.nome,
    };
    console.log("data to send: ", data);
    axios
      .post(`${URL_API}/api/obraMateriais/addMaterialObra`, data)
      .then((res) => {
        setConfirmacaoVisible({
          visible: true,
          mensagem: res.data.message,
          sucesso: true,
        });
        setLoadingAddMaterial(false);
        setSelectQuantidadeModal({
          state: false,
          produto: {},
        });
        setQuantidadeMaterial(0);
        setValorMaterial(0);
        setVisible();
      })
      .catch((error) => {
        console.log(error);
        setConfirmacaoVisible({
          visible: true,
          mensagem: "Erro ao adicionar material a obra!",
          sucesso: false,
        });
        setLoadingAddMaterial(false);
        setSelectQuantidadeModal({
          state: false,
          produto: {},
        });
        setQuantidadeMaterial(0);
        setValorMaterial(0);
        setVisible();
      });
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
          setSearchValues({ nome: "", codigo: "" });
          setResultados([]);
          setValorMaterial(0);
          setQuantidadeMaterial(0);
          setLoadingAddMaterial(false);
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setVisible(false);
            setSearchValues({ nome: "", codigo: "" });
            setResultados([]);
            setValorMaterial(0);
            setQuantidadeMaterial(0);
            setLoadingAddMaterial(false);
          }}
          style={{ ...modalStyle }}
        >
          Pesquisar Material
        </ModalHeader>
        <ModalBody style={modalStyle}>
          <Formik initialValues={searchValues} onSubmit={handleSearch}>
            {() => (
              <Form>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="nome">Nome do Material</Label>
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
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="codigo">Código do Material</Label>
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
                    </FormGroup>
                  </Col>
                </Row>
                <Row
                  className="d-flex justify-content-center mt-3"
                  style={{ marginBottom: "1rem" }}
                >
                  <Col className="d-flex justify-content-end">
                    <Button type="submit" style={saveButtonStyle}>
                      {loading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Pesquisar"
                      )}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      style={saveButtonStyle}
                      onClick={() => setCadastrarMaterialModal(true)}
                    >
                      Cadastrar
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
            className="mt-2"
            style={{ whiteSpace: "nowrap" }}
          >
            <thead>
              <tr>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Nome
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Código
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Fornecedor
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Unidade de Medida
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Última Compra
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Validade
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Nota Fiscal
                </th>
                <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                  Selecionar
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((produto, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      setSelectQuantidadeModal({
                        state: true,
                        produto: produto,
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.nome}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.codigo}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.principalFornecedor}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.unidadeMedida}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.dataUltimaCompra
                        ? new Date(
                            produto.dataUltimaCompra
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.dataValidade
                        ? new Date(produto.dataValidade).toLocaleDateString()
                        : "--"}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
                    >
                      {produto.numeroNotaFiscal || "--"}
                    </td>
                    <td
                      style={{ textAlign: "center", paddingInline: "0.5rem" }}
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
                  <td colSpan="8" style={{ textAlign: "center" }}>
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
              setSearchValues({ nome: "", codigo: "" });
              setResultados([]);
              setValorMaterial(0);
              setQuantidadeMaterial(0);
              setLoadingAddMaterial(false);
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
        setVisible={() => setCadastrarMaterialModal(false)}
        material={null}
        getMaterials={() => {}}
        materialCadastrado={(data) => {
          setResultados((prevResultados) => [...prevResultados, data]);
        }}
      />

      <Modal
        size="sm"
        isOpen={selectQuantidadeModal.state}
        toggle={() => {
          setSelectQuantidadeModal({ state: false, produto: {} });
          setValorMaterial(0);
          setQuantidadeMaterial(0);
          setLoadingAddMaterial(false);
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setSelectQuantidadeModal({ state: false, produto: {} });
            setValorMaterial(0);
            setQuantidadeMaterial(0);
            setLoadingAddMaterial(false);
          }}
          style={{ ...modalStyle }}
        >
          Selecionar Quantidade
        </ModalHeader>
        <ModalBody style={modalStyle}>
          <FormGroup>
            <Label for="nomeProduto">Nome</Label>
            <Input
              type="text"
              id="nomeProduto"
              value={selectQuantidadeModal.produto.nome || "--"}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="nomeProduto">Unidade</Label>
            <Input
              type="text"
              id="unidadeMedida"
              value={selectQuantidadeModal.produto.unidadeMedida || "--"}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="quantidade">Quantidade</Label>
            <Input
              type="number"
              id="quantidade"
              value={quantidadeMaterial}
              onChange={(e) => {
                setQuantidadeMaterial(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="valor">Valor do Material</Label>
            <CurrencyInput
              id="valor"
              name="valor"
              placeholder="R$0,00"
              decimalsLimit={2}
              value={valorMaterial}
              onValueChange={(value) => setValorMaterial(value)}
              prefix="R$"
              decimalSeparator=","
              groupSeparator="."
              style={{ width: "100%" }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={modalStyle}>
          <Button
            color="primary"
            style={{
              backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
            onClick={() => {
              handleSelect();
            }}
          >
            {loadingAddMaterial ? (
              <Spinner size="sm" color="light" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AdicionarMaterial;
