import React, { useState, useEffect } from "react";
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

import PesquisarClienteModal from "./PesquisarClienteModal.js";
import PesquisarResponsavelModal from "./PesquisarResponsavelModal.js";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import {
  formatarCPF,
  formatarCNPJ,
  formatarTelefone,
} from "../utils/utilsMask.js";

const CadastrarObraModal = ({ visible, setVisible, obra, getObras }) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [state] = useUIContextController();
  const { darkMode } = state;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [clienteDaObra, setClienteDaObra] = useState({});
  const [funcionarioResponsavel, setFuncionarioResponsavel] = useState({});
  const [viewClientModal, setViewClientModal] = useState(false);
  const [viewResponsibleModal, setViewResponsibleModal] = useState(false);
  const [visibleConfirmacao, setVisibleConfirmacao] = useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const [formValues, setFormValues] = useState({
    nome: obra?.nome || "",
    identificador: obra?.identificador || "",
    endereco: obra?.endereco || "",
    clienteId: obra?.clienteId || null,
    dataInicio: obra?.dataInicio
      ? new Date(obra?.dataInicio).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    dataFinal: obra?.dataFinal
      ? new Date(obra?.dataInicio).toISOString().split("T")[0]
      : "",
    contrato: obra?.contrato || "",
    alvara: obra?.alvara || "",
    orcamento: obra?.orcamento || "",
    responsavel: obra?.responsavel || "",
    responsavelId: obra?.responsavelId || null,
    status: obra?.status || "Não iniciada",
  });

  useEffect(() => {
    if (obra) {
      getClienteDaObra(obra.clienteId);
      getFuncionarioResponsavel(obra.responsavelId);
      setFormValues({
        nome: obra.nome,
        identificador: obra.identificador,
        endereco: obra.endereco,
        clienteId: obra.clienteId,
        dataInicio: obra?.dataInicio
          ? new Date(obra?.dataInicio).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        dataFinal: obra?.dataFinal
          ? new Date(obra?.dataFinal).toISOString().split("T")[0]
          : "",
        contrato: obra.contrato,
        alvara: obra.alvara,
        orcamento: obra.orcamento,
        responsavel: obra.responsavel,
        responsavelId: obra.responsavelId,
        status: obra.status,
      });
    }
  }, [obra]);

  const getClienteDaObra = async (id) => {
    axios
      .get(`${URL_API}/api/clientes/cliente?id=${id}`)
      .then((response) => {
        setClienteDaObra(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFuncionarioResponsavel = async (id) => {
    axios
      .get(`${URL_API}/api/funcionarios/funcionario?id=${id}`)
      .then((response) => {
        setFuncionarioResponsavel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    // Preparar os dados da obra
    const data = {
      ...values,
      clienteId: clienteDaObra.id,
      responsavelId: funcionarioResponsavel.id,
      responsavel: funcionarioResponsavel.nome,
      cliente: clienteDaObra.nome,
      status: values.status || "Não iniciada",
    };

    if (obra) {
      data.id = obra.id;
      try {
        const res = await axios.put(
          `${URL_API}/api/obras/alterarObra?id=${obra.id}`,
          data
        );
        console.log("Res: ", res);
        setVisibleConfirmacao({
          visible: true,
          mensagem: res.data.message,
          sucesso: true,
        });
        getObras();
      } catch (error) {
        console.log("Error: ", error);
        setVisibleConfirmacao({
          visible: true,
          mensagem: "Erro ao editar a obra.",
          sucesso: false,
        });
      } finally {
        setLoading(false);
        toggleModal();
      }
    } else {
      const formData = new FormData();
      if (file) {
        formData.append("contrato", file);
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }

      try {
        // Enviar a requisição com o FormData
        const res = await axios.post(
          `${URL_API}/api/obras/novaObra`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Res: ", res);
        setVisibleConfirmacao({
          visible: true,
          mensagem: res.data.message,
          sucesso: true,
        });
        getObras();
      } catch (error) {
        console.log("Error: ", error);
        setVisibleConfirmacao({
          visible: true,
          mensagem: "Erro ao salvar a obra.",
          sucesso: false,
        });
      } finally {
        setLoading(false);
        toggleModal();
      }
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const toggleModal = () => {
    setVisible(false);
    setClienteDaObra({});
    setFuncionarioResponsavel({});
    setViewClientModal(false);
    setViewResponsibleModal(false);
    setFormValues({
      nome: "",
      identificador: "",
      endereco: "",
      clienteId: null,
      dataInicio: "",
      dataPrevistaTermino: "",
      contrato: "",
      alvara: "",
      orcamento: "",
      responsavel: "",
      responsavelId: null,
    });
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
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

  const uploadButtonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: "none",
    marginBottom: "10px",
  };

  return (
    <>
      <Modal
        size="xl"
        isOpen={visible}
        toggle={toggleModal}
        centered
        style={{ zIndex: 3000 }}
      >
        <ModalHeader
          toggle={toggleModal}
          style={{
            ...modalStyle,
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(52, 58, 64, 0.2)",
          }}
        >
          {!obra ? "Cadastrar Obra" : "Editar Obra"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <Formik
            initialValues={formValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, handleChange }) => (
              <Form style={formStyle} id="form">
                <Row form={true.toString()}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                      marginBottom: "10px",
                      borderBottom: `1px solid ${
                        darkMode
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(103, 103, 103, 0.5)"
                      }`,
                    }}
                  >
                    <h5
                      style={{
                        opacity: 0.8,
                        color: darkMode ? "#FFFFFF" : "#676767",
                      }}
                    >
                      Informações do Cliente
                    </h5>
                  </div>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nomeCliente">Cliente:</label>
                      <Field
                        type="text"
                        name="nomeCliente"
                        className="form-control"
                        style={inputStyle}
                        value={clienteDaObra.nome || ""}
                        onClick={() => {
                          setViewClientModal(true);
                        }}
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="cpfCliente">Cpf do cliente:</label>
                      <Field
                        type="text"
                        name="cpfCliente"
                        className="form-control"
                        style={inputStyle}
                        value={
                          clienteDaObra.tipoPessoa === "Fisica"
                            ? formatarCPF(clienteDaObra?.cpf)
                            : formatarCNPJ(clienteDaObra?.cnpj) || ""
                        }
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="enderecoCliente">
                        Endereço do cliente:
                      </label>
                      <Field
                        type="text"
                        name="enderecoCliente"
                        className="form-control"
                        style={inputStyle}
                        value={clienteDaObra.endereco || ""}
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="telefoneCliente">
                        Telefone do cliente
                      </label>
                      <Field
                        type="text"
                        name="telefoneCliente"
                        className="form-control"
                        style={inputStyle}
                        value={formatarTelefone(clienteDaObra.telefone) || ""}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    margin: "1.5rem 0",
                    borderBottom: `1px solid ${
                      darkMode
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(103, 103, 103, 0.5)"
                    }`,
                  }}
                >
                  <h5
                    style={{
                      opacity: 0.8,
                      color: darkMode ? "#FFFFFF" : "#676767",
                    }}
                  >
                    Informações da Obra
                  </h5>
                </div>
                <Row form={true.toString()}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Obra:</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        style={inputStyle}
                        value={values.nome}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            nome: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="identificador">Identificador:</label>
                      <Field
                        type="text"
                        name="identificador"
                        className="form-control"
                        style={inputStyle}
                        value={values.identificador}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            identificador: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="endereco">Endereço:</label>
                      <Field
                        type="text"
                        name="endereco"
                        className="form-control"
                        style={inputStyle}
                        value={values.endereco}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            endereco: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="dataInicio">Data de início:</label>
                      <Field
                        type="date"
                        name="dataInicio"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            dataInicio: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="previsaoTermino">
                        Previsão de término:
                      </label>
                      <Field
                        type="date"
                        name="dataFinal"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            dataFinal: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="contrato">Contrato:</label>
                      <Field
                        type="text"
                        name="contrato"
                        className="form-control"
                        style={inputStyle}
                        value={values.contrato}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            contrato: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="alvara">Alvará:</label>
                      <Field
                        type="text"
                        name="alvara"
                        className="form-control"
                        style={inputStyle}
                        value={values.alvara}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            alvara: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="orcamento">Orçamento inicial:</label>
                      <Field
                        type="text"
                        name="orcamento"
                        className="form-control"
                        style={inputStyle}
                        value={values.orcamento}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues({
                            ...formValues,
                            orcamento: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="responsavel">Responsável:</label>
                      <Field
                        type="text"
                        name="responsavel"
                        className="form-control"
                        style={inputStyle}
                        value={funcionarioResponsavel.nome || ""}
                        readOnly
                        onClick={() => {
                          setViewResponsibleModal(true);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row form={true.toString()}>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="statusObra">Status da Obra:</label>
                      <Field
                        as="select"
                        name="statusObra"
                        className="form-control"
                        style={inputStyle}
                        value={formValues.status}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            status: e.target.value,
                          });
                        }}
                      >
                        <option value="Não iniciada">Não iniciada</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluida">Concluída</option>
                        <option value="Atrasada">Atrasada</option>
                      </Field>
                    </div>
                  </Col>
                </Row>
                {!obra && (
                  <Row form={true.toString()}>
                    <Col md={12}>
                      <div
                        className="form-group"
                        style={{
                          marginTop: "2rem",
                        }}
                      >
                        <label htmlFor="documento">Documento contratual:</label>
                        <input
                          type="file"
                          name="documento"
                          className="form-control"
                          onChange={handleFileChange}
                          style={inputStyle}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                <ModalFooter
                  style={{
                    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
                    color: darkMode ? "#FFFFFF" : "#000000",
                    border: "none",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: darkMode ? "#4A4A4A" : "#CECFCB",
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      border: "none",
                    }}
                    onClick={toggleModal}
                  >
                    Cancelar
                  </Button>
                  <Button style={saveButtonStyle} type="submit">
                    {loading ? <Spinner size="sm" color="light" /> : "Salvar"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <PesquisarClienteModal
        visible={viewClientModal}
        setVisible={setViewClientModal}
        setCliente={(cliente) => {
          setClienteDaObra(cliente);
        }}
      />

      <PesquisarResponsavelModal
        visible={viewResponsibleModal}
        setVisible={setViewResponsibleModal}
        setFuncionario={(funcionario) => {
          setFuncionarioResponsavel(funcionario);
        }}
      />

      <ConfirmacaoModal
        visible={visibleConfirmacao.visible}
        setVisible={setVisibleConfirmacao}
        mensagem={visibleConfirmacao.mensagem}
        sucesso={visibleConfirmacao.sucesso}
      />
    </>
  );
};

export default CadastrarObraModal;
