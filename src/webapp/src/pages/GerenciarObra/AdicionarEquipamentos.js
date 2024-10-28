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

import CadastrarEquipamentoModal from "components/Equipamentos/CadastrarEquipamentoModal.js";
import AdicionarFuncionario from "./AdicionarFuncionario.js";

const AdicionarEquipamentos = ({
  visible,
  setVisible,
  obra,
  getEquipamentosDaObra,
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
    identificador: "",
  });
  const [cadastrarEquipamentoModal, setCadastrarEquipamentoModal] =
    useState(false);

  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState({});
  const [loadingEquipamento, setLoadingEquipamento] = useState(false);

  const [selecionarResponsavel, setSelecionarResponsavel] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`${URL_API}/api/equipamentos/buscaEquipamentosQuery`, {
        params: {
          nome: searchValues.nome || "",
          indentificador: searchValues.identificador || "",
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

  const handleSelect = (equipamento, funcionario) => {
    setLoadingEquipamento(true);

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    let data = equipamento;

    data = {
      ...data,
      status: "Em uso",
      dataAlocacao: dataAtual.toISOString(),
      funcionarioId: funcionario.id,
      responsavel: funcionario.nome,
      obraAlocado: obra.nome,
      obraId: obra.id,
    };

    axios
      .put(`${URL_API}/api/equipamentos/alterarEquipamento?id=${data.id}`, data)
      .then((res) => {
        console.log(res.data);
        setConfirmacaoVisible({
          visible: true,
          mensagem: "Equipamento alocado com sucesso!",
          sucesso: true,
        });
        getEquipamentosDaObra();
        setResultados([]);
        setVisible();
      })
      .catch((error) => {
        console.log(error);
        setConfirmacaoVisible({
          visible: true,
          mensagem: "Ocorreu um erro ao alocar este equipamento!",
          sucesso: false,
        });
      })
      .finally(() => {
        setLoadingEquipamento(false);
      });
  };

  return (
    <Container>
      <Modal
        size="xl"
        isOpen={visible}
        toggle={() => {
          setVisible(false);
          setSearchValues({ nome: "", identificador: "" });
          setResultados([]);
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setVisible(false);
            setSearchValues({ nome: "", codigo: "" });
            setResultados([]);
            setCadastrarEquipamentoModal(false);
          }}
          style={{
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          }}
        >
          Pesquisar Equipamento
        </ModalHeader>
        <ModalBody
          style={{
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          }}
        >
          <Formik initialValues={searchValues} onSubmit={handleSearch}>
            {() => (
              <Form>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="nome">Nome do Equipamento</Label>
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
                      <Label for="codigo">Identificador do Equipamento</Label>
                      <Field
                        type="text"
                        name="codigo"
                        className="form-control"
                        value={searchValues.identificador}
                        onChange={(e) =>
                          setSearchValues({
                            ...searchValues,
                            identificador: e.target.value,
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
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: darkMode ? "#424242" : "#7A7A7A",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      {loading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Pesquisar"
                      )}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        backgroundColor: darkMode ? "#424242" : "#7A7A7A",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                      onClick={() => setCadastrarEquipamentoModal(true)}
                    >
                      Cadastrar
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          {loadingEquipamento ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ paddingTop: "1rem" }}
            >
              <Spinner color={darkMode ? "light" : "secondary"} />
            </div>
          ) : (
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
                    Identificador
                  </th>
                  <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                    Peso
                  </th>
                  <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                    Status do Equipamento
                  </th>
                  <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                    Cadastro
                  </th>
                  <th style={{ paddingInline: "0.3rem", textAlign: "center" }}>
                    Derivado de:
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
                      onClick={
                        produto.status !== "Em uso"
                          ? () => {
                            setEquipamentoSelecionado(produto);
                            setSelecionarResponsavel(true);
                          }
                          : null
                      }
                      style={{
                        cursor:
                          produto.status !== "Em uso"
                            ? "pointer"
                            : "not-allowed",
                        backgroundColor:
                          produto.status === "Em uso" ? "#f8d7da" : "inherit",
                      }}
                      title={
                        produto.status !== "Em uso"
                          ? "Selecionar Equipamento"
                          : "Equipamento em uso"
                      }
                    >
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.nome}
                      </td>
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.identificador}
                      </td>
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.peso}
                      </td>
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.status}
                      </td>
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.dataCadastro
                          ? new Date(produto.dataCadastro).toLocaleDateString()
                          : ""}
                      </td>
                      <td
                        style={{ textAlign: "center", paddingInline: "0.5rem" }}
                      >
                        {produto.derivado || "--"}
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
          )}
        </ModalBody>
        <ModalFooter
          style={{
            backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          }}
        >
          <Button
            onClick={() => {
              setVisible(false);
              setSearchValues({ nome: "", indentificador: "" });
              setResultados([]);
              setCadastrarEquipamentoModal(false);
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

      <CadastrarEquipamentoModal
        visible={cadastrarEquipamentoModal}
        setVisible={() => {
          setCadastrarEquipamentoModal(false);
        }}
        equipamento={null}
        getEquipamentos={(data) => {
          setResultados((prevResultados) => [...prevResultados, data]);
        }}
      />


      <AdicionarFuncionario
        visible={selecionarResponsavel}
        setVisible={() => { setSelecionarResponsavel(false) }}
        equipamento={equipamentoSelecionado}
        obra={obra}
        getEquipamentosDaObra={getEquipamentosDaObra}
        addAoEquipamento={true}
        funcionarioSelecionado={(responsavel) => {
          setSelecionarResponsavel(false);
          handleSelect(equipamentoSelecionado, responsavel );
        }}
      />
    </Container>
  );
};

export default AdicionarEquipamentos;
