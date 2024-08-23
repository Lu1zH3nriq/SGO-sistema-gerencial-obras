import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { useUIContextController } from '../../context/index.js';

const CadastrarObraModal = ({ visible, setVisible, obra }) => {
    const [state] = useUIContextController();
    const { darkMode } = state;
    const [file, setFile] = useState(null);

    const handleSubmit = (values) => {
        // Lógica para salvar os dados do formulário
        console.log(values);
        console.log(file);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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

    const saveButtonStyle = {
        backgroundColor: '#47FF63',
        color: '#FFFFFF',
        border: 'none',
    };

    const uploadButtonStyle = {
        backgroundColor: darkMode ? '#676767' : '#CECFCB',
        color: darkMode ? '#FFFFFF' : '#343A40',
        border: 'none',
        marginBottom: '10px', // Espaçamento vertical entre o botão de upload e os botões de ação
    };

    const initialValues = {
        nome: obra?.nome || '',
        identificador: obra?.identificador || '',
        cliente: obra?.cliente || '',
        telefoneCliente: obra?.telefoneCliente || '',
        dataInicio: obra?.dataInicio || '',
        dataPrevistaTermino: obra?.dataPrevistaTermino || '',
        contrato: obra?.contrato || '',
        alvara: obra?.alvara || '',
    };

    return (
        <Modal
            size='lg'
            isOpen={visible}
            toggle={toggleModal}
            centered
        >
            <ModalHeader toggle={toggleModal} style={modalStyle}>
                {!obra ? 'Cadastrar Obra' : 'Editar Obra'}
            </ModalHeader>
            <ModalBody style={formStyle}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                                    <label htmlFor="cliente">Cliente</label>
                                    <Field type="text" name="cliente" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="telefoneCliente">Telefone do Cliente</label>
                                    <Field type="text" name="telefoneCliente" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="dataInicio">Data Início</label>
                                    <Field type="date" name="dataInicio" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="dataPrevistaTermino">Data Prevista para Término</label>
                                    <Field type="date" name="dataPrevistaTermino" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="contrato">Contrato</label>
                                    <Field type="text" name="contrato" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="alvara">Alvará</label>
                                    <Field type="text" name="alvara" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        {!obra && (
                            <Row form>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="documento">Documento</label>
                                        <input type="file" name="documento" className="form-control" onChange={handleFileChange} style={inputStyle} />
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {/* Adicione mais campos do formulário aqui */}
                    </Form>
                </Formik>
            </ModalBody>
            <ModalFooter style={modalStyle}>
                <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
                    Fechar
                </Button>
                <Button color="primary" type="submit" form="form" style={saveButtonStyle}>
                    Salvar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CadastrarObraModal;