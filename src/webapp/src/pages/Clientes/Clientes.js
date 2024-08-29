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
import ListaClientes from "./ListaClientes.js"; // Importar a lista de clientes
import CadastrarClienteModal from "components/Clientes/CadastrarClienteModal.js";
import DeleteClienteModal from "components/Clientes/DeleteClienteModal.js";

const Clientes = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    cliente: null,
  });
  const [deleteClienteModal, setDeleteClienteModal] = React.useState({
    visible: false,
    cliente: null,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchCpf, setSearchCpf] = React.useState("");

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

  const cadastrarCliente = () => {
    setModalVisible({ visible: true, cliente: null });
  };

  const editarCliente = (cliente) => {
    setModalVisible({ visible: true, cliente: cliente });
  };

  const excluirCliente = (cliente) => {
    setDeleteClienteModal({ visible: true, cliente: cliente });
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
  const handleSearchCpf = (event) => {
    setSearchCpf(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  // Filtrar a lista de clientes com base no termo de pesquisa
  const filteredClientes = ListaClientes.filter((cliente) => {
    if (searchCpf === "") {
      return cliente.nome.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTerm === "") {
      return cliente.cpf.toLowerCase().includes(searchCpf.toLowerCase());
    } else {
      return (
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        cliente.cpf.toLowerCase().includes(searchCpf.toLowerCase())
      );
    }
  });

  // Dividir a lista de clientes em páginas
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClientes = filteredClientes.slice(startIndex, endIndex);

  return (
    <Layout rotaAtual="Clientes">
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
            <Col className="d-flex align-items-center justify-content-between flex-wrap">
              <Button
                color="secondary"
                className="d-flex align-items-center mb-2"
                style={buttonStyle}
                onClick={cadastrarCliente}
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
                  Cliente:
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
                  onChange={handleSearchCpf}
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
                  <th style={tableHeaderStyle}>CPF</th>
                  <th style={tableHeaderStyle}>Endereço</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Telefone</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentClientes.length > 0 ? (
                  currentClientes.map((cliente, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{cliente.nome}</td>
                      <td style={tableCellStyle}>{cliente.cpf || "N/A"}</td>
                      <td style={tableCellStyle}>
                        {cliente.endereco || "N/A"}
                      </td>
                      <td style={tableCellStyle}>{cliente.email || "N/A"}</td>
                      <td style={tableCellStyle}>
                        {cliente.telefone || "N/A"}
                      </td>
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
                            onClick={() => editarCliente(cliente)}
                          />
                          <FaTrash
                            style={{
                              cursor: "pointer",
                              color: darkMode ? "#FFFFFF" : "#343A40",
                            }}
                            size={20}
                            title="Excluir"
                            onClick={() => excluirCliente(cliente)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        color: darkMode ? "#FFFFFF" : "#343A40",
                      }}
                    >
                      Cliente não encontrado.
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
                {Math.ceil(filteredClientes.length / itemsPerPage)} (Total:{" "}
                {filteredClientes.length} clientes)
              </Typography>
              <Button
                variant="secondary"
                style={{ ...buttonStyle, marginLeft: "5px" }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredClientes.length / itemsPerPage)
                }
                size="sm"
              >
                <FaChevronRight size={10} />
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>

      <CadastrarClienteModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, cliente: null })}
        cliente={modalVisible.cliente}
      />

      <DeleteClienteModal
        visible={deleteClienteModal.visible}
        setVisible={() =>
          setDeleteClienteModal({ visible: false, cliente: null })
        }
        cliente={deleteClienteModal.cliente}
      />
    </Layout>
  );
};

export default Clientes;
