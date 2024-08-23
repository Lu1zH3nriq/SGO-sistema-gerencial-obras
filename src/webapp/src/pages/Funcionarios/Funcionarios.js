import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Button, Input, Table } from "reactstrap";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ListaFuncionarios from "./ListaFuncionarios.js"; // Importar a lista de funcionários
import CadastrarFuncionariosModal from "components/Funcionarios/CadastrarFuncionariosModal.js";
import DeleteFuncionarioModal from "components/Funcionarios/DeleteFuncionarioModal.js";

const Funcionarios = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    funcionario: null,
  });
  const [deleteFuncionarioModal, setDeleteFuncionarioModal] = React.useState({
    visible: false,
    funcionario: null,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#343A40",
    borderRadius: "20px",
  };

  const tableHeaderStyle = {
    textAlign: "center",
  };

  const tableCellStyle = {
    textAlign: "center",
    padding: "1%",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
  };

  const cadastrarFunc = () => {
    setModalVisible({ visible: true, funcionario: null });
  };

  const editarFunc = (funcionario) => {
    setModalVisible({ visible: true, funcionario: funcionario });
  };

  const excluirFunc = (funcionario) => {
    setDeleteFuncionarioModal({ visible: true, funcionario: funcionario });
  };

  // Função para mudar a página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Dividir a lista de funcionários em páginas
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFuncionarios = ListaFuncionarios.slice(startIndex, endIndex);

  return (
    <Layout rotaAtual="Funcionários">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "5%",
          alignItems: "center",
        }}
      >
        <Container>
          {/* Linha com botão "Adicionar" e campo de pesquisa */}
          <Row className="mb-4" style={{ marginTop: "2%" }}>
            <Col md={6} className="d-flex align-items-center">
              <Button
                color="secondary"
                className="d-flex align-items-center"
                style={buttonStyle}
                onClick={cadastrarFunc}
              >
                <FaPlus className="me-2" /> Adicionar
              </Button>
            </Col>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-end"
            >
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Pesquisar nome:
              </Typography>
              <Input type="text" className="me-2" style={inputStyle} />
              <Button outline color="secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
          </Row>

          <Container fluid style={{ maxWidth: "100%", marginTop: "5%" }}>
            {/* Tabela */}
            <Table
              
              responsive
              size="sm"
              bordered
              dark={darkMode}
              style={{ borderRadius: "0px", marginTop: "2%" }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Nome</th>
                  <th style={tableHeaderStyle}>CPF</th>
                  <th style={tableHeaderStyle}>Cargo</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Telefone</th>
                  <th style={tableHeaderStyle}>Tipo</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentFuncionarios.map((funcionario, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{funcionario.nome}</td>
                    <td style={tableCellStyle}>{funcionario.cpf || "N/A"}</td>
                    <td style={tableCellStyle}>{funcionario.cargo}</td>
                    <td style={tableCellStyle}>{funcionario.email || "N/A"}</td>
                    <td style={tableCellStyle}>{funcionario.telefone || "N/A"}</td>
                    <td style={tableCellStyle}>{funcionario.tipo}</td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <FaEdit
                          style={{
                            cursor: "pointer",
                            marginRight: "10px",
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                          size={20}
                          title="Editar"
                          onClick={() => editarFunc(funcionario)}
                        />
                        <FaTrash
                          style={{
                            cursor: "pointer",
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                          size={20}
                          title="Excluir"
                          onClick={() => excluirFunc(funcionario)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Botões de navegação */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2%",
                paddingBottom: "2%",
                alignItems: "center",
              }}
            >
              <Button
                variant="secondary"
                style={{ ...buttonStyle, marginRight: "5px" }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                size="sm"
              >
                <FaChevronLeft size={10} />
              </Button>
              <Typography
                variant="subtitle1"
                style={{
                  color: darkMode ? "#FFFFFF" : "#343A40",
                  padding: "0% 1% 0% 1%",
                }}
              >
                Página {currentPage} de {Math.ceil(ListaFuncionarios.length / itemsPerPage)} (Total: {ListaFuncionarios.length} funcionários)
              </Typography>
              <Button
                variant="secondary"
                style={{ ...buttonStyle, marginLeft: "5px" }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(ListaFuncionarios.length / itemsPerPage)}
                size="sm"
              >
                <FaChevronRight size={10} />
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>

      <CadastrarFuncionariosModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, funcionario: null })}
        funcionario={modalVisible.funcionario}
      />

      <DeleteFuncionarioModal
        visible={deleteFuncionarioModal.visible}
        setVisible={() => setDeleteFuncionarioModal({ visible: false, funcionario: null })}
        funcionario={deleteFuncionarioModal.funcionario}
      />
    </Layout>
  );
};

export default Funcionarios;
