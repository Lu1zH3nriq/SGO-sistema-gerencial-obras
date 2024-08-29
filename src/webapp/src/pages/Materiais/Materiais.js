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
import ListaMateriais from "./ListaMateriais.js"; // Importar a lista de materiais
import CadastrarMaterialModal from "components/Materiais/CadastrarMaterialModal.js";
import DeleteMaterialModal from "components/Materiais/DeleteMaterialModal.js";

const Materiais = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    material: null,
  });
  const [deleteMaterialModal, setDeleteMaterialModal] = React.useState({
    visible: false,
    material: null,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchCod, setSearchCod] = React.useState("");

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

  const cadastrarMaterial = () => {
    setModalVisible({ visible: true, material: null });
  };

  const editarMaterial = (material) => {
    setModalVisible({ visible: true, material: material });
  };

  const excluirMaterial = (material) => {
    setDeleteMaterialModal({ visible: true, material: material });
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
  const handleSearchCod = (event) => {
    setSearchCod(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  // Filtrar a lista de materiais com base no termo de pesquisa
  const filteredMateriais = ListaMateriais.filter((material) => {
    if (searchCod === "") {
      return material.nome.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTerm === "") {
      return material.codigo.toLowerCase().includes(searchCod.toLowerCase());
    } else {
      return (
        material.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        material.codigo.toLowerCase().includes(searchCod.toLowerCase())
      );
    }
  });

  // Dividir a lista de materiais em páginas
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMateriais = filteredMateriais.slice(startIndex, endIndex);

  return (
    <Layout rotaAtual="Materiais">
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
                onClick={cadastrarMaterial}
              >
                <FaPlus className="me-2" /> Adicionar
              </Button>
              <div className="d-flex align-items-center">
                <Typography
                  variant="subtitle1"
                  className="me-2"
                  color={"secondary"}
                  style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                >
                  Material:
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
                  Código:
                </Typography>
                <Input
                  type="text"
                  className="me-2"
                  style={inputStyle}
                  value={searchCod}
                  onChange={handleSearchCod}
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
                  <th style={tableHeaderStyle}>Código</th>
                  <th style={tableHeaderStyle}>Principal Fornecedor</th>
                  <th style={tableHeaderStyle}>Unidade</th>
                  <th style={tableHeaderStyle}>Última Compra</th>
                  <th style={tableHeaderStyle}>Validade</th>
                  <th style={tableHeaderStyle}>Nota Fiscal</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentMateriais.length > 0 ? (
                  currentMateriais.map((material, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{material.nome}</td>
                      <td style={tableCellStyle}>{material.codigo || "--"}</td>
                      <td style={tableCellStyle}>
                        {material.principalFornecedor || "--"}
                      </td>
                      <td style={tableCellStyle}>{material.unidade || "--"}</td>
                      <td style={tableCellStyle}>
                        {material.dataUltCompra || "--"}
                      </td>
                      <td style={tableCellStyle}>
                        {material.validade || "--"}
                      </td>
                      <td style={tableCellStyle}>
                        {material.notaFiscal || "--"}
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
                            onClick={() => editarMaterial(material)}
                          />
                          <FaTrash
                            style={{
                              cursor: "pointer",
                              color: darkMode ? "#FFFFFF" : "#343A40",
                            }}
                            size={20}
                            title="Excluir"
                            onClick={() => excluirMaterial(material)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign: "center",
                        color: darkMode ? "#FFFFFF" : "#343A40",
                      }}
                    >
                      Material não encontrado.
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
                {Math.ceil(filteredMateriais.length / itemsPerPage)} (Total:{" "}
                {filteredMateriais.length} materiais)
              </Typography>
              <Button
                variant="secondary"
                style={{ ...buttonStyle, marginLeft: "5px" }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredMateriais.length / itemsPerPage)
                }
                size="sm"
              >
                <FaChevronRight size={10} />
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>

      <CadastrarMaterialModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, material: null })}
        material={modalVisible.material}
      />

      <DeleteMaterialModal
        visible={deleteMaterialModal.visible}
        setVisible={() =>
          setDeleteMaterialModal({ visible: false, material: null })
        }
        material={deleteMaterialModal.material}
      />
    </Layout>
  );
};

export default Materiais;
