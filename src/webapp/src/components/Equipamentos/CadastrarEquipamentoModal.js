import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useUIContextController } from "../../context/index.js";
import "react-datepicker/dist/react-datepicker.css";
import PesquisarObraModal from "./PesquisarObraModal";
import PesquisarFuncionarioModal from "./PesquisarFuncionarioModal";

const CadastrarEquipamentoModal = ({ visible, setVisible, equipamento }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [pesquisarObraVisible, setPesquisarObraVisible] = useState(false);
  const [pesquisarFuncionarioVisible, setPesquisarFuncionarioVisible] =
    useState(false);
  const [obraSelecionada, setObraSelecionada] = useState(null);

  const handleSubmit = (values) => {
    // Lógica para salvar os dados do formulário
    console.log(values);
  };

  const toggleModal = () => {
    setVisible(false);
  };

  const handleSelectObra = (obra) => {
    setObraSelecionada(obra);
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

  const datePickerStyle = {
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    width: "100%",
    padding: ".375rem .75rem",
  };

  const saveButtonStyle = {
    backgroundColor: "#47FF63",
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
    obra: obraSelecionada?.nome || "Compra do equipamento",
  };

  return (
    <>
      <Modal size="lg" isOpen={visible} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={modalStyle}>
          {!equipamento ? "Cadastrar Equipamento" : "Editar Equipamento"}
        </ModalHeader>
        <ModalBody style={formStyle}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
              <Form style={formStyle}>
                <Row form>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <Field
                        type="text"
                        name="nome"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("nome", e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="identificador">Identificador</label>
                      <Field
                        type="text"
                        name="identificador"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("identificador", e.target.value);
                        }}
                      />
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
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Field
                        as="select"
                        name="status"
                        className="form-control"
                        style={inputStyle}
                        onChange={(e) => {
                          setFieldValue("status", e.target.value);
                        }}
                      >
                        <option value="Em uso">Em uso</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Manutenção">Manutenção</option>
                      </Field>
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
                        value={values.obra}
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
                      >
                        <option value="Compra do equipamento">Compra do equipamento</option>
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
                    Salvar
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
        onSelectObra={handleSelectObra}
      />
      <PesquisarFuncionarioModal
        visible={pesquisarFuncionarioVisible}
        setVisible={setPesquisarFuncionarioVisible}
        onSelectFuncionario={() => {}}
      />
    </>
  );
};

export default CadastrarEquipamentoModal;
