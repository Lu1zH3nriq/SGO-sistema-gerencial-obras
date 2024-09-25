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
import CadastrarMaterialModal from "components/Materiais/CadastrarMaterialModal.js";
import DeleteMaterialModal from "components/Materiais/DeleteMaterialModal.js";
import axios from "axios";
import { formatarData } from "../../components/utils/utilsMask.js";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const Materiais = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [ListaMateriais, setListaMateriais] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [confirmacaoModal, setConfirmacaoModal] = React.useState({
    visible: false,
    mensagem: "",
    sucesso: false,
  });

  const getMaterials = async () => {
    setLoading(true);
    axios
      .get(`${URL_API}/api/materiais/materiais`)
      .then((response) => {
        setListaMateriais(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setConfirmacaoModal({
          visible: true,
          mensagem: "Erro ao buscar materiais.",
          sucesso: false,
        });
      });
  };

  React.useEffect(() => {
    getMaterials();
  }, []);

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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const tableCellStyle = {
    textAlign: "start",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    padding: "0.3rem 1rem 0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
      <Container
        style={{
          marginTop: "8vh",
        }}
      >
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
                    <td style={tableCellStyle}>
                      {material.unidadeMedida || "--"}
                    </td>
                    <td style={tableCellStyle}>
                      {formatarData(material?.dataUltimaCompra) || "--"}
                    </td>
                    <td style={tableCellStyle}>
                      {formatarData(material?.dataValidade) || "--"}
                    </td>
                    <td style={tableCellStyle}>
                      {material.numeroNotaFiscal || "--"}
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
                    Nenhum material encontrado
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
            {Math.ceil(filteredMateriais.length / itemsPerPage)} (Total:{" "}
            {filteredMateriais.length} materiais)
          </Typography>
          <Button
            variant="secondary"
            style={{ ...buttonStyle, marginLeft: "5px" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredMateriais.length / itemsPerPage)
            }
            size="sm"
          >
            <FaChevronRight size={10} />
          </Button>
        </Box>
      </Container>

      <CadastrarMaterialModal
        visible={modalVisible.visible}
        setVisible={() => setModalVisible({ visible: false, material: null })}
        material={modalVisible.material}
        getMaterials={getMaterials}
      />

      <DeleteMaterialModal
        visible={deleteMaterialModal.visible}
        setVisible={() =>
          setDeleteMaterialModal({ visible: false, material: null })
        }
        material={deleteMaterialModal.material}
        getMaterials={getMaterials}
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
        getMaterials={getMaterials}
      />
    </Layout>
  );
};

export default Materiais;
