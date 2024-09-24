import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Spinner } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { useUIContextController } from '../../context/index.js';
import axios from 'axios';

import PesquisarClienteModal from './PesquisarClienteModal.js';
import PesquisarResponsavelModal from './PesquisarResponsavelModal.js';
import { formatarCPF, formatarCNPJ, formatarTelefone } from '../utils/utilsMask.js';

const CadastrarObraModal = ({ visible, setVisible, obra }) => {
    const URL_API = process.env.REACT_APP_URL_API;

    const [state] = useUIContextController();
    const { darkMode } = state;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [clienteDaObra, setClienteDaObra] = useState({});
    const [funcionarioResponsavel, setFuncionarioResponsavel] = useState({});
    const [viewClientModal, setViewClientModal] = useState(false);
    const [viewResponsibleModal, setViewResponsibleModal] = useState(false);

    const [formValues, setFormValues] = useState({
        nome: obra?.nome || '',
        identificador: obra?.identificador || '',
        endereco: obra?.endereco || '',
        clienteId: obra?.clienteId || null,
        dataInicio: obra?.dataInicio || '',
        dataPrevistaTermino: obra?.dataFinal || '',
        contrato: obra?.contrato || '',
        alvara: obra?.alvara || '',
        orcamento: obra?.orcamento || '',
        responsavel: obra?.responsavel || '',
        responsavelId: obra?.responsavelId || null,
    });

    useEffect(() => {
        if (obra) {
            getClienteDaObra(obra.clienteId);
            getFuncionarioResponsavel(obra.responsavelId);
        }
    }, [obra]);

    const getClienteDaObra = async (id) => {
        axios.get(`${URL_API}/api/clientes/cliente?id=${id}`)
            .then((response) => {
                setClienteDaObra(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getFuncionarioResponsavel = async (id) => {
        axios.get(`${URL_API}/api/funcionarios/funcionario?id=${id}`)
            .then((response) => {
                setFuncionarioResponsavel(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = (values) => {
        setLoading(true);

        const data = {
            ...values,
            clienteId: clienteDaObra.id,
            responsavelId: funcionarioResponsavel.id,
            responsavel: funcionarioResponsavel.nome,
        };


        console.log('OBRA A SER CADASTRADA:  ',data);


        setLoading(false);
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
            nome: '',
            identificador: '',
            endereco: '',
            clienteId: null,
            dataInicio: '',
            dataPrevistaTermino: '',
            contrato: '',
            alvara: '',
            orcamento: '',
            responsavel: '',
            responsavelId: null,
        });
        
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
        backgroundColor: "#1ED760",
        color: '#FFFFFF',
        border: 'none',
    };

    const uploadButtonStyle = {
        backgroundColor: darkMode ? '#676767' : '#CECFCB',
        color: darkMode ? '#FFFFFF' : '#343A40',
        border: 'none',
        marginBottom: '10px', // Espaçamento vertical entre o botão de upload e os botões de ação
    };

    return (
        <>
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
                    <Formik
                        initialValues={formValues}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, handleChange }) => (
                            <Form style={formStyle} id="form">
                                <Row form>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginBottom: '10px',
                                        borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(103, 103, 103, 0.5)'}`,
                                    }}>
                                        <h5 style={{
                                            opacity: 0.8,
                                            color: darkMode ? '#FFFFFF' : '#676767',
                                        }}>Informações do Cliente</h5>
                                    </div>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="nomeCliente">Cliente:</label>
                                            <Field
                                                type="text"
                                                name="nomeCliente"
                                                className="form-control"
                                                style={inputStyle}
                                                value={clienteDaObra.nome || ''}
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
                                                value={clienteDaObra.tipoPessoa === "Fisica" ? formatarCPF(clienteDaObra?.cpf) : formatarCNPJ(clienteDaObra?.cnpj) || ''}
                                                readOnly
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="enderecoCliente">Endereço do cliente:</label>
                                            <Field type="text" name="enderecoCliente" className="form-control" style={inputStyle}
                                                value={clienteDaObra.endereco || ''} readOnly />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="telefoneCliente">Telefone do cliente</label>
                                            <Field type="text" name="telefoneCliente" className="form-control" style={inputStyle} 
                                                value={formatarTelefone(clienteDaObra.telefone) || ''} readOnly
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'start',
                                    margin: '1.5rem 0',
                                    borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(103, 103, 103, 0.5)'}`,
                                }}>
                                    <h5 style={{
                                        opacity: 0.8,
                                        color: darkMode ? '#FFFFFF' : '#676767',
                                    }}>Informações da Obra</h5>
                                </div>
                                <Row form>
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
                                                    setFormValues({ ...formValues, nome: e.target.value });
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
                                                    setFormValues({ ...formValues, identificador: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row form>
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
                                                    setFormValues({ ...formValues, endereco: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="dataInicio">Data de início:</label>
                                            <Field
                                                type="date"
                                                name="dataInicio"
                                                className="form-control"
                                                style={inputStyle}
                                                value={values.dataInicio}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFormValues({ ...formValues, dataInicio: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="previsaoTermino">Previsão de término:</label>
                                            <Field
                                                type="date"
                                                name="previsaoTermino"
                                                className="form-control"
                                                style={inputStyle}
                                                value={values.dataPrevistaTermino}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFormValues({ ...formValues, dataPrevistaTermino: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row form>
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
                                                    setFormValues({ ...formValues, contrato: e.target.value });
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
                                                    setFormValues({ ...formValues, alvara: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row form>
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
                                                    setFormValues({ ...formValues, orcamento: e.target.value });
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
                                                value={funcionarioResponsavel.nome || ''}
                                                readOnly
                                                onClick={() => {
                                                    setViewResponsibleModal(true);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {!obra && (
                                    <Row form>
                                        <Col md={12}>
                                            <div className="form-group" style={{
                                                marginTop: '2rem',
                                            }}>
                                                <label htmlFor="documento">Documento contratual:</label>
                                                <input type="file" name="documento" className="form-control" onChange={handleFileChange} style={inputStyle} />
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                {/* Adicione mais campos do formulário aqui */}
                                </Form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button style={saveButtonStyle} onClick={() => document.getElementById('form').submit()}>
                        {loading ? <Spinner size="sm" color="light" /> : 'Salvar'}
                    </Button>
                    <Button style={buttonStyle} onClick={toggleModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <PesquisarClienteModal
                visible={viewClientModal}
                setVisible={setViewClientModal}
                setCliente={(cliente) => { setClienteDaObra(cliente) }}
            />

            <PesquisarResponsavelModal
                visible={viewResponsibleModal}
                setVisible={setViewResponsibleModal}
                setFuncionario={(funcionario) => { setFuncionarioResponsavel(funcionario) }}
            />
        </>
    );
};

export default CadastrarObraModal;