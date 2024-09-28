import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Button, Input, Table, Spinner } from "reactstrap";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import CadastrarFuncionariosModal from "components/Funcionarios/CadastrarFuncionariosModal.js";
import DeleteFuncionarioModal from "components/Funcionarios/DeleteFuncionarioModal.js";
import axios from "axios";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import { formatarCPF } from "components/utils/utilsMask.js";
import { formatarTelefone } from "components/utils/utilsMask.js";

const Funcionarios = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [ListaFuncionarios, setListaFuncionarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchCpf, setSearchCpf] = React.useState("");
  const [confirmacaoModal, setConfirmacaoModal] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const getFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL_API}/api/funcionarios/funcionarios`
      );
      setListaFuncionarios(response.data);
      setLoading(false);
    } catch (error) {
      setConfirmacaoModal({
        visible: true,
        mensagem: "Erro ao buscar funcionários.",
        sucesso: false,
      });
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getFuncionarios();
  }, []);

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const tableHeaderStyle = {
    textAlign: "center",
    backgroundColor: darkMode ? "#4A4A4A" : "#F8F9FA",
    color: darkMode ? "#FFFFFF" : "#4A4A4A",
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#535353" : "#FFFFFF",
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: darkMode ? "#FFFFFF" : "#4A4A4A",
    fontWeight: "normal",
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

  // Função para atualizar o termo de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };
  const handleSearchCpfChange = (event) => {
    setSearchCpf(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  // Filtrar a lista de funcionários com base no termo de pesquisa
  const filteredFuncionarios = ListaFuncionarios.filter((funcionario) => {
    if (searchTerm === "") {
      return funcionario.cpf.toLowerCase().includes(searchCpf.toLowerCase());
    } else if (searchCpf === "") {
      return funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        funcionario.cpf.toLowerCase().includes(searchCpf.toLowerCase())
      );
    }
  });

  // Dividir a lista de funcionários em páginas
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFuncionarios = filteredFuncionarios.slice(startIndex, endIndex);

  return (
    <Layout rotaAtual="Funcionários">
      <Container
        style={{
          marginTop: "8vh",
        }}
      >
        {/* Linha com botão "Adicionar" e campo de pesquisa */}
        <Row
          className="d-flex align-items-center mb-4"
          style={{
            marginTop: "2%",
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
              : "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Col className="d-flex align-items-center justify-content-between flex-wrap">
            <Button
              color="secondary"
              className="d-flex align-items-center mb-2"
              style={buttonStyle}
              onClick={cadastrarFunc}
            >
              <FaPlus className="me-2" /> Adicionar
            </Button>
            <div className="d-flex align-items-center mb-2 ms-auto me-4">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Funcionário:
              </Typography>
              <Input
                type="text"
                className="me-2"
                style={inputStyle}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button outline color="secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Cpf:
              </Typography>
              <Input
                type="text"
                className="me-2"
                style={inputStyle}
                value={searchCpf}
                onChange={handleSearchCpfChange}
              />
              <Button outline color="secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </div>
          </Col>
        </Row>

        {/* Tabela */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              height: "100vh",
            }}
          >
            <Spinner color="secondary" />
          </Box>
        ) : (
          <Table
            responsive
            size="sm"
            bordered
            dark={darkMode}
            style={{
              borderRadius: "0.5rem",
              marginTop: "2%",
              tableLayout: "auto",
              backgroundColor: darkMode ? "#333333" : "#FFFFFF",
              color: darkMode ? "#FFFFFF" : "#4A4A4A",
              boxShadow: darkMode
                ? "0px 0px 10px 0px #7F7F7F"
                : "0px 0px 10px 0px #7A7A7A",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Nome</th>
                <th style={tableHeaderStyle}>CPF</th>
                <th style={tableHeaderStyle}>Cargo</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Telefone</th>
                <th style={tableHeaderStyle}>Tipo</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentFuncionarios.length > 0 ? (
                currentFuncionarios.map((funcionario, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{funcionario.nome}</td>
                    <td style={tableCellStyle}>
                      {formatarCPF(funcionario?.cpf) || "--"}
                    </td>
                    <td style={tableCellStyle}>{funcionario.cargo}</td>
                    <td style={tableCellStyle}>{funcionario.email || "--"}</td>
                    <td style={tableCellStyle}>
                      {formatarTelefone(funcionario?.telefone) || "--"}
                    </td>
                    <td style={tableCellStyle}>{funcionario.tipo}</td>
                    <td style={tableCellStyle}>{funcionario.status}</td>
                    <td style={tableCellStyle}>
                      <div>
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{ ...tableCellStyle, textAlign: "center" }}
                  >
                    Nenhum Funcionário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
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
            Página {currentPage} de{" "}
            {Math.ceil(filteredFuncionarios.length / itemsPerPage)} (Total:{" "}
            {filteredFuncionarios.length} funcionários)
          </Typography>
          <Button
            variant="secondary"
            style={{ ...buttonStyle, marginLeft: "5px" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredFuncionarios.length / itemsPerPage)
            }
            size="sm"
          >
            <FaChevronRight size={10} />
          </Button>
        </Box>
      </Container>

      <CadastrarFuncionariosModal
        visible={modalVisible.visible}
        setVisible={() =>
          setModalVisible({ visible: false, funcionario: null })
        }
        funcionario={modalVisible.funcionario}
        getFuncionarios={getFuncionarios}
      />

      <DeleteFuncionarioModal
        visible={deleteFuncionarioModal.visible}
        setVisible={() =>
          setDeleteFuncionarioModal({ visible: false, funcionario: null })
        }
        funcionario={deleteFuncionarioModal.funcionario}
        getFuncionarios={getFuncionarios}
      />

      <ConfirmacaoModal
        visible={confirmacaoModal.visible}
        setVisible={() =>
          setConfirmacaoModal({
            visible: false,
            mensagem: "",
            sucesso: false,
          })
        }
        mensagem={confirmacaoModal.mensagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </Layout>
  );
};

export default Funcionarios;
