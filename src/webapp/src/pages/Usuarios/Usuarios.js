import React, { useEffect } from "react";
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
import CadastrarUsuarioModal from "components/Usuarios/CadastrarUsuarioModal.js";
import DeleteUsuarioModal from "components/Usuarios/DeleteUsuarioModal.js";
import {
  formatarTelefone,
  removerFormatacaoTelefone,
  formatarData,
} from "components/utils/utilsMask.js";
import axios from "axios";

import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const Usuarios = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [loading, setLoading] = React.useState(true);
  const [ListaUsuarios, setListaUsuarios] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    usuario: null,
  });
  const [deleteUsuarioModal, setDeleteUsuarioModal] = React.useState({
    visible: false,
    usuario: null,
  });
  const [confirmacao, setConfirmacao] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchEmail, setSearchEmail] = React.useState("");

  const nivelUsuario = {
    1: "Administrador",
    2: "Comum",
  };

  const getUsuarios = () => {
    setLoading(true);
    axios
      .get(`${URL_API}/api/users/usuarios`)
      .then((response) => {
        setListaUsuarios(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setConfirmacao({
          visible: true,
          mensagem: "Erro ao buscar usuários!",
          sucesso: false,
        });
        console.error("Erro ao buscar usuários:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsuarios();
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "0rem 1rem 0rem 1rem",
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const cadastrarUsuario = () => {
    setModalVisible({ visible: true, usuario: null });
  };

  const editarUsuario = (usuario) => {
    setModalVisible({ visible: true, usuario: usuario });
  };

  const excluirUsuario = (usuario) => {
    setDeleteUsuarioModal({ visible: true, usuario: usuario });
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
  const handleSearchEmail = (event) => {
    setSearchEmail(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  // Filtrar a lista de usuários com base no termo de pesquisa
  const filteredUsuarios = ListaUsuarios.filter((usuario) => {
    if (searchEmail === "") {
      return usuario.nome.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTerm === "") {
      return usuario.email.toLowerCase().includes(searchEmail.toLowerCase());
    } else {
      return (
        usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        usuario.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }
  });

  // Dividir a lista de usuários em páginas
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsuarios = filteredUsuarios.slice(startIndex, endIndex);

  return (
    <Layout rotaAtual="Usuários">
      <Container
        style={{
          marginTop: "2vh",
        }}
      >
        {/* Linha com botão "Adicionar" e campo de pesquisa */}
        <Row
          className="mb-4"
          style={{
            marginTop: "2%",
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
              : "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col className="d-flex align-items-center justify-content-between">
            <Button
              color="secondary"
              className="d-flex align-items-center"
              style={buttonStyle}
              onClick={cadastrarUsuario}
            >
              <FaPlus className="me-2" /> Adicionar
            </Button>
            <div
              className="d-flex align-items-center"
              style={{ whiteSpace: "nowrap" }}
            >
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Usuário:
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
              <Typography
                variant="subtitle1"
                className="me-2 ms-4"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                E-mail:
              </Typography>
              <Input
                type="text"
                className="me-2"
                style={inputStyle}
                value={searchEmail}
                onChange={handleSearchEmail}
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
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Telefone</th>
                <th style={tableHeaderStyle}>Cargo</th>
                <th style={tableHeaderStyle}>Data de Cadastro</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Usuário</th>
                <th style={tableHeaderStyle}>Tipo</th>
                <th style={tableHeaderStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentUsuarios.length > 0 ? (
                currentUsuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{usuario.nome}</td>
                    <td style={tableCellStyle}>{usuario.email || "--"}</td>
                    <td style={tableCellStyle}>
                      {formatarTelefone(usuario.telefone) || "--"}
                    </td>
                    <td style={tableCellStyle}>{usuario.cargo || "--"}</td>
                    <td style={tableCellStyle}>
                      {formatarData(usuario.dataCadastro) || "--"}
                    </td>
                    <td style={tableCellStyle}>{usuario.status || "--"}</td>
                    <td style={tableCellStyle}>
                      {nivelUsuario[usuario.nivelUsuario] || "--"}
                    </td>
                    <td style={tableCellStyle}>{usuario.tipo || "--"}</td>
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
                          onClick={() => editarUsuario(usuario)}
                        />
                        <FaTrash
                          style={{
                            cursor: "pointer",
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                          size={20}
                          title="Excluir"
                          onClick={() => excluirUsuario(usuario)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    style={{ ...tableCellStyle, textAlign: "center" }}
                  >
                    Nenhum usuário encontrado
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
            {Math.ceil(filteredUsuarios.length / itemsPerPage)} (Total:{" "}
            {filteredUsuarios.length} usuários)
          </Typography>
          <Button
            variant="secondary"
            style={{ ...buttonStyle, marginLeft: "5px" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredUsuarios.length / itemsPerPage)
            }
            size="sm"
          >
            <FaChevronRight size={10} />
          </Button>
        </Box>
      </Container>

      <CadastrarUsuarioModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, usuario: null })}
        usuario={modalVisible.usuario}
        newListUsers={(list) => {
          setListaUsuarios(list);
        }}
      />

      <DeleteUsuarioModal
        visible={deleteUsuarioModal.visible}
        setVisible={() =>
          setDeleteUsuarioModal({ visible: false, usuario: null })
        }
        usuario={deleteUsuarioModal.usuario}
        newListUsers={(list) => {
          setListaUsuarios(list);
        }}
      />

      <ConfirmacaoModal
        visible={confirmacao.visible}
        setVisible={setConfirmacao}
        mensagem={confirmacao.mensagem}
        sucesso={confirmacao.sucesso}
      />
    </Layout>
  );
};

export default Usuarios;
