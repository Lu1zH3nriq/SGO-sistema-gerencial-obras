import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { useUIContextController } from '../../context/index.js';

const CadastrarObraModal = ({ visible, setVisible }) => {
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
    };

    const buttonStyle = {
        backgroundColor: darkMode ? '#676767' : '#CECFCB',
        color: darkMode ? '#FFFFFF' : '#343A40',
        border: 'none',
    };

    return (
        <Modal
            size='lg'
            isOpen={visible}
            toggle={toggleModal}
            centered
            style={modalStyle}
        >
            <ModalHeader toggle={toggleModal} style={modalStyle}>
                Cadastrar Obra
            </ModalHeader>
            <ModalBody>
                <Formik initialValues={{}} onSubmit={handleSubmit}>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <Field type="text" name="nome" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endereco">Endereço</label>
                            <Field type="text" name="endereco" className="form-control" />
                        </div>
                        {/* Adicione mais campos do formulário aqui */}
                    </Form>
                </Formik>
            </ModalBody>
            <ModalFooter style={modalStyle}>
                <Button color="secondary" onClick={toggleModal} style={buttonStyle}>
                    Fechar
                </Button>
                <Button color="primary" type="submit" form="form" style={{
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    border: 'none',
                }}>
                    Salvar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CadastrarObraModal;