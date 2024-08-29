import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { useUIContextController } from '../../context/index.js';

const CadastrarMaterialModal = ({ visible, setVisible, material }) => {
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

    

    const initialValues = {
        nome: material?.nome || '',
        codigo: material?.codigo || '',
        principalFornecedor: material?.principalFornecedor || '',
        unidade: material?.unidade || '',
        dataUltCompra: material?.dataUltCompra || '',
        validade: material?.validade || '',
        notaFiscal: material?.notaFiscal || '',
    };

    return (
        <Modal
            size='lg'
            isOpen={visible}
            toggle={toggleModal}
            centered
        >
            <ModalHeader toggle={toggleModal} style={modalStyle}>
                {!material ? 'Cadastrar Material' : 'Editar Material'}
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
                                    <label htmlFor="codigo">Código</label>
                                    <Field type="text" name="codigo" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="fornecedor">Principal Fornecedor</label>
                                    <Field type="text" name="fornecedor" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="quantidade">Unidade de Medida</label>
                                    <Field type="number" name="quantidade" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="dataCompra">Data Última Compra</label>
                                    <Field type="date" name="dataCompra" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="validade">Validade</label>
                                    <Field type="date" name="validade" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="notaFiscal">Nota Fiscal</label>
                                    <Field type="text" name="notaFiscal" className="form-control" style={inputStyle} />
                                </div>
                            </Col>
                        </Row>
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

export default CadastrarMaterialModal;