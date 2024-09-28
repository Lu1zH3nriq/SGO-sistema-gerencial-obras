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
  Container,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Importando Yup para validação
import { useUIContextController } from "../../context/index.js";
import "react-datepicker/dist/react-datepicker.css";
import PesquisarObraModal from "./PesquisarObraModal";
import PesquisarFuncionarioModal from "./PesquisarFuncionarioModal";
import axios from "axios";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const CadastrarEquipamentoModal = ({
  visible,
  setVisible,
  equipamento,
  getEquipamentos,
}) => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [loading, setLoading] = useState(false);
  const [state] = useUIContextController();
  const { darkMode, userType } = state;
  const [pesquisarObraVisible, setPesquisarObraVisible] = useState(false);
  const [pesquisarFuncionarioVisible, setPesquisarFuncionarioVisible] =
    useState(false);
  const [obraSelecionada, setObraSelecionada] = useState(null);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [confirmacaoVisible, setConfirmacaoVisible] = useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const handleSubmit = (values) => {
    setLoading(true);

    const _equipamento = {
      ...values,
      obraId: obraSelecionada ? obraSelecionada.id : null,
      funcionarioId: funcionarioSelecionado ? funcionarioSelecionado.id : null,
      responsavel: funcionarioSelecionado ? funcionarioSelecionado.nome : null,
      obraAlocado: obraSelecionada ? obraSelecionada.nome : null,
    };

    delete _equipamento.obra;
    delete _equipamento.responsavel;

    if (_equipamento.dataAlocacao === "--") {
      _equipamento.dataAlocacao = null;
    }

    if (equipamento) {
      axios
        .put(
          `${URL_API}/api/equipamentos/alterarEquipamento?id=${equipamento.id}`,
          _equipamento
        )
        .then(() => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Equipamento alterado com sucesso",
            sucesso: true,
          });
          setObraSelecionada(null);
          setFuncionarioSelecionado(null);
          getEquipamentos();
          setLoading(false);
          setVisible(false);
        })
        .catch(() => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Erro ao editar equipamento",
            sucesso: false,
          });
          setLoading(false);
          setVisible(false);
        });
      return;
    } else {
      axios
        .post(`${URL_API}/api/equipamentos/novoEquipamento`, _equipamento)
        .then(() => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Equipamento cadastrado com sucesso",
            sucesso: true,
          });
          getEquipamentos();
          setLoading(false);
          setVisible(false);
        })
        .catch(() => {
          setConfirmacaoVisible({
            visible: true,
            mensagem: "Erro ao cadastrar equipamento",
            sucesso: false,
          });
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

  const initialValues = {
    nome: equipamento?.nome || "",
    identificador: equipamento?.identificador || "",
    peso: equipamento?.peso || "",
    status: equipamento?.status || "Em uso",
    dataCadastro: equipamento?.dataCadastro
      ? new Date(equipamento.dataCadastro).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    dataAlocacao: equipamento?.dataAlocacao
      ? new Date(equipamento.dataAlocacao).toISOString().split("T")[0]
      : "--",
    derivado: equipamento?.derivado || "Compra de Equipamento",
    obra: obraSelecionada?.nome || null,
    responsavel: funcionarioSelecionado?.nome || null,
  };

  // Adicionando validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    identificador: Yup.string().required("Identificador é obrigatório"),
    status: Yup.string().required("Status é obrigatório"),
  });

  useEffect(() => {
    const getObra = async (obraId) => {
      axios.get(`${URL_API}/api/obras/obra?id=${obraId}`)
        .then((response) => {
          setObraSelecionada(response.data || null);
        })
        .catch((error) => {
          console.log("Erro ao buscar obra", error);
          setObraSelecionada(null);
        });
    };
    const getFuncionario = async (funcionarioId) => {
      axios.get(`${URL_API}/api/funcionarios/funcionario?id=${funcionarioId}`)
        .then((response) => {
          setFuncionarioSelecionado(response.data || null);
        })
        .catch((error) => {
          console.log("Erro ao buscar funcionário", error);
          setFuncionarioSelecionado(null);
        });
    };
    if (equipamento) {
      getObra(equipamento.obraId);
      getFuncionario(equipamento.funcionarioId);
    }
  }, [equipamento]);

  useEffect(() => {
    if (initialValues.status === "Disponível") {
      setObraSelecionada(null);
      setFuncionarioSelecionado(null);
    }
  }, [initialValues.status]);

  return (
    <Container>
      <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={modalStyle}>
          {!equipamento ? "Cadastrar Equipamento" : "Editar Equipamento"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} // Adicionando validação ao Formik
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form style={formStyle}>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <Field
                        type="text"
                        name="nome"
                        className={`form-control ${errors.nome && touched.nome ? 'is-invalid' : ''}`}
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("nome", e.target.value);
                        }}
                        disabled={userType === 2}
                      />
                      {errors.nome && touched.nome ? (
                        <div className="invalid-feedback">{errors.nome}</div>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="identificador">Identificador</label>
                      <Field
                        type="text"
                        name="identificador"
                        className={`form-control ${errors.identificador && touched.identificador ? 'is-invalid' : ''}`}
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("identificador", e.target.value);
                        }}
                        disabled={userType === 2}
                      />
                      {errors.identificador && touched.identificador ? (
                        <div className="invalid-feedback">{errors.identificador}</div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="peso">Peso</label>
                      <Field
                        type="text"
                        name="peso"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("peso", e.target.value);
                        }}
                        disabled={userType === 2}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Field
                        as="select"
                        name="status"
                        className={`form-control ${errors.status && touched.status ? 'is-invalid' : ''}`}
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("status", e.target.value);
                          if (e.target.value === "Disponível") {
                            setObraSelecionada(null);
                            setFuncionarioSelecionado(null);
                          }
                        }}
                      >
                        <option value="Em uso">Em uso</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Manutenção">Manutenção</option>
                      </Field>
                      {errors.status && touched.status ? (
                        <div className="invalid-feedback">{errors.status}</div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="obra">Obra</label>
                      <Field
                        type="text"
                        name="obra"
                        className="form-control"
                        style={inputStyle}
                        value={values.obra || obraSelecionada?.nome}
                        onClick={() => setPesquisarObraVisible(true)}
                        readOnly
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="dataCadastro">Data de Cadastro</label>
                      <div>
                        <Field
                          type="date"
                          name="dataCadastro"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            setFieldValue("dataCadastro", e.target.value)
                          }
                          disabled={userType === 2}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="dataAlocacao">Data de Alocação</label>
                      <div>
                        <Field
                          type="date"
                          name="dataAlocacao"
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            setFieldValue("dataAlocacao", e.target.value)
                          }
                          readOnly={userType === 2}
                          disabled={userType === 2}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="responsavel">Responsável</label>
                      <Field
                        type="text"
                        name="responsavel"
                        className="form-control"
                        style={inputStyle}
                        onClick={() => setPesquisarFuncionarioVisible(true)}
                        value={
                          values.responsavel || funcionarioSelecionado?.nome
                        }
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="derivado">Derivado</label>
                      <Field
                        as="select"
                        name="derivado"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("derivado", e.target.value);
                        }}
                        disabled={userType === 2}
                      >
                        <option value="Compra do equipamento">
                          Compra do equipamento
                        </option>
                        <option value="Aluguél">Aluguél</option>
                      </Field>
                    </div>
                  </Col>
                </Row>
                <ModalFooter style={modalStyle}>
                  <Button
                    color="secondary"
                    onClick={toggleModal}
                    style={buttonStyle}
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
      <PesquisarObraModal
        visible={pesquisarObraVisible}
        setVisible={setPesquisarObraVisible}
        onSelectObra={(obra)=>{ setObraSelecionada(obra); }}
      />
      <PesquisarFuncionarioModal
        visible={pesquisarFuncionarioVisible}
        setVisible={setPesquisarFuncionarioVisible}
        onSelectFuncionario={(funcionario) => {
          setFuncionarioSelecionado(funcionario);
        }}
      />

      <ConfirmacaoModal
        visible={confirmacaoVisible.visible}
        setVisible={setConfirmacaoVisible}
        mensagem={confirmacaoVisible.mensagem}
        sucesso={confirmacaoVisible.sucesso}
      />
    </Container>
  );
};

export default CadastrarEquipamentoModal;