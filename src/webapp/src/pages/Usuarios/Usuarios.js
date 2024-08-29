import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Button, Input, Table } from "reactstrap";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ListaUsuarios from "./ListaUsuarios.js"; // Importar a lista de usuários
import CadastrarUsuarioModal from "components/Usuarios/CadastrarUsuarioModal.js";
import DeleteUsuarioModal from "components/Usuarios/DeleteUsuarioModal.js";

const Usuarios = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    usuario: null,
  });
  const [deleteUsuarioModal, setDeleteUsuarioModal] = React.useState({
    visible: false,
    usuario: null,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchEmail, setSearchEmail] = React.useState("");

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
  };

  const tableCellStyle = {
    textAlign: "center",
    padding: "1%",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
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
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Telefone</th>
                  <th style={tableHeaderStyle}>Cargo</th>
                  <th style={tableHeaderStyle}>Data de Cadastro</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Nível de Usuário</th>
                  <th style={tableHeaderStyle}>Tipo</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsuarios.length > 0 ? (
                  currentUsuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{usuario.nome}</td>
                      <td style={tableCellStyle}>{usuario.email || "N/A"}</td>
                      <td style={tableCellStyle}>
                        {usuario.telefone || "N/A"}
                      </td>
                      <td style={tableCellStyle}>{usuario.cargo || "N/A"}</td>
                      <td style={tableCellStyle}>
                        {usuario.dataCadastro || "N/A"}
                      </td>
                      <td style={tableCellStyle}>{usuario.status || "N/A"}</td>
                      <td style={tableCellStyle}>
                        {usuario.nivelUsuario || "N/A"}
                      </td>
                      <td style={tableCellStyle}>{usuario.tipo || "N/A"}</td>
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
                      style={{
                        textAlign: "center",
                        color: darkMode ? "#FFFFFF" : "#343A40",
                      }}
                    >
                      Usuário não encontrado.
                    </td>
                  </tr>
                )}
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
                Página {currentPage} de{" "}
                {Math.ceil(filteredUsuarios.length / itemsPerPage)} (Total:{" "}
                {filteredUsuarios.length} usuários)
              </Typography>
              <Button
                variant="secondary"
                style={{ ...buttonStyle, marginLeft: "5px" }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredUsuarios.length / itemsPerPage)
                }
                size="sm"
              >
                <FaChevronRight size={10} />
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>

      <CadastrarUsuarioModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, usuario: null })}
        usuario={modalVisible.usuario}
      />

      <DeleteUsuarioModal
        visible={deleteUsuarioModal.visible}
        setVisible={() =>
          setDeleteUsuarioModal({ visible: false, usuario: null })
        }
        usuario={deleteUsuarioModal.usuario}
      />
    </Layout>
  );
};

export default Usuarios;
