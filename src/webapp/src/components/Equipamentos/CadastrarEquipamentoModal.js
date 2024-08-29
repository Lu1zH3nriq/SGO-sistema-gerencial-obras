import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { useUIContextController } from '../../context/index.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CadastrarEquipamentoModal = ({ visible, setVisible, equipamento }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const handleSubmit = (values) => {
    // Lógica para salvar os dados do formulário
    console.log(values);
  };

  const toggleModal = () => {
    setVisible(false);
  };

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    border: 'none',
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#676767' : '#CECFCB',
    color: darkMode ? '#FFFFFF' : '#343A40',
    border: 'none',
  };

  const formStyle = {
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    border: 'none',
  };

  const inputStyle = {
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    marginBottom: '10px', // Espaçamento vertical entre os inputs
  };

  const datePickerStyle = {
    backgroundColor: darkMode ? '#6E6E6E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#000000',
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
    width: '100%',
    padding: '.375rem .75rem',
  };

  const saveButtonStyle = {
    backgroundColor: '#47FF63',
    color: '#FFFFFF',
    border: 'none',
  };

  const initialValues = {
    nome: equipamento?.nome || '',
    identificador: equipamento?.identificador || '',
    peso: equipamento?.peso || '',
    status: equipamento?.status || 'Em uso',
    obra: equipamento?.obra || '',
    dataCadastro: equipamento?.dataCadastro ? new Date(equipamento.dataCadastro) : new Date(),
    dataAlocacao: equipamento?.dataAlocacao ? new Date(equipamento.dataAlocacao) : new Date(),
    responsavel: equipamento?.responsavel || '',
  };

  return (
    <Modal
      size='lg'
      isOpen={visible}
      toggle={toggleModal}
      centered
    >
      <ModalHeader toggle={toggleModal} style={modalStyle}>
        {!equipamento ? 'Cadastrar Equipamento' : 'Editar Equipamento'}
      </ModalHeader>
      <ModalBody style={formStyle}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form style={formStyle}>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <Field type="text" name="nome" className="form-control" style={inputStyle} />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="identificador">Identificador</label>
                    <Field type="text" name="identificador" className="form-control" style={inputStyle} />
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="peso">Peso</label>
                    <Field type="text" name="peso" className="form-control" style={inputStyle} />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <Field as="select" name="status" className="form-control" style={inputStyle}>
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
                    <Field type="text" name="obra" className="form-control" style={inputStyle} />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="dataCadastro">Data de Cadastro</label>
                    <div>
                      <DatePicker
                        selected={values.dataCadastro}
                        onChange={(date) => setFieldValue('dataCadastro', date)}
                        className="form-control"
                        style={datePickerStyle}
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
                      <DatePicker
                        selected={values.dataAlocacao}
                        onChange={(date) => setFieldValue('dataAlocacao', date)}
                        className="form-control"
                        style={datePickerStyle}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="responsavel">Responsável</label>
                    <Field type="text" name="responsavel" className="form-control" style={inputStyle} />
                  </div>
                </Col>
              </Row>
              <ModalFooter style={modalStyle}>
                <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
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
  );
};

export default CadastrarEquipamentoModal;