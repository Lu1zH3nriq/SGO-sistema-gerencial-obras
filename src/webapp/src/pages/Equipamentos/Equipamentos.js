import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Collapse,
} from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Spinner } from "reactstrap";
import CadastrarEquipamentoModal from "components/Equipamentos/CadastrarEquipamentoModal.js";
import DeleteEquipamentoModal from "components/Equipamentos/DeleteEquipamentoModal.js";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";
import axios from "axios";

const Equipamentos = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [expanded, setExpanded] = useState(null);
  const [viewCadastrarEquipamentoModal, setViewCadastrarEquipamentoModal] =
    useState({
      visible: false,
      equipamento: null,
    });
  const [viewDeleteEquipamentoModal, setViewDeleteEquipamentoModal] = useState({
    visible: false,
    equipamento: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [confirmacaoModal, setConfirmacaoModal] = useState({
    visible: false,
    mensagem: "",
    suceso: false,
  });

  const getEquipamentos = async () => {
    setLoading(true);
    axios
      .get(`${URL_API}/api/equipamentos/equipamentos`)
      .then((response) => {
        setEquipamentos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setConfirmacaoModal({
          visible: true,
          mensagem: "Erro ao buscar equipamentos",
          sucesso: false,
        });
        console.log(error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getEquipamentos();
  }, []);

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredEquipamentos = equipamentos.filter((equipamento) => {
    if (searchTerm === "") {
      return equipamento.identificador
        .toLowerCase()
        .includes(searchContract.toLowerCase());
    }
    if (searchContract === "") {
      return equipamento.nome.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        equipamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        equipamento.identificador
          .toLowerCase()
          .includes(searchContract.toLowerCase())
      );
    }
  });

  // Calcular índices de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEquipamentos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEquipamentos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const paginationStyle = {
    fontSize: "0.875rem", // Tamanho menor para o texto
  };

  const iconStyle = {
    fontSize: "1rem", // Tamanho menor para os ícones
  };

  const cadastrarEquipamento = () => {
    setViewCadastrarEquipamentoModal({
      visible: true,
      equipamento: null,
    });
  };

  const editarEquipamento = (equipamento) => {
    setViewCadastrarEquipamentoModal({
      visible: true,
      equipamento: equipamento,
    });
  };

  const deleteEquipamento = (equipamento) => {
    setViewDeleteEquipamentoModal({
      visible: true,
      equipamento: equipamento,
    });
  };

  return (
    <Layout rotaAtual="Equipamentos">
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
            <Col md={2} className="d-flex align-items-center">
              <Button
                variant="secondary"
                className="d-flex align-items-center"
                style={buttonStyle}
                onClick={cadastrarEquipamento}
              >
                <FaPlus className="me-2" /> Adicionar
              </Button>
            </Col>
            <Col
              md={{ size: 4, offset: 2 }}
              className="d-flex align-items-center ml-auto"
            >
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Equipamento
              </Typography>
              <FormControl
                type="text"
                className="me-2"
                style={{ ...inputStyle }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Identificador
              </Typography>
              <FormControl
                type="text"
                style={{ ...inputStyle }}
                value={searchContract}
                onChange={(e) => setSearchContract(e.target.value)}
              />
              <Button variant="outline-secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
          </Row>

          {/* Lista de Cards */}
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
            <Container fluid style={{ maxWidth: "80%", marginTop: "5%" }}>
              {currentItems.length > 0 ? (
                currentItems.map((equipamento, index) => (
                  <Box key={index} sx={{ width: "100%", mb: 2 }}>
                    <Card style={cardStyle}>
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                          >
                            {equipamento.nome}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                          >
                            Cliente: {equipamento.cliente}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                          >
                            Data Início: {equipamento.dataInicio}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => handleExpandClick(index)}
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          {expanded === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </IconButton>
                      </CardContent>
                      <Collapse
                        in={expanded === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography
                            variant="body2"
                            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                          >
                            Descrição: {equipamento.descricao}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                marginRight: "10px",
                                color: darkMode ? "#FFFFFF" : "#343A40",
                              }}
                              onClick={() => {
                                editarEquipamento(equipamento);
                              }}
                              size={20}
                              title="Editar"
                            />
                            <FaTrash
                              style={{
                                cursor: "pointer",
                                color: darkMode ? "#FFFFFF" : "#343A40",
                              }}
                              size={20}
                              title="Excluir"
                              onClick={() => {
                                deleteEquipamento(equipamento);
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="h6"
                  style={{
                    color: darkMode ? "#FFFFFF" : "#343A40",
                    textAlign: "center",
                  }}
                >
                  Nenhum equipamento encontrado
                </Typography>
              )}
            </Container>
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
              style={{ ...buttonStyle, ...iconStyle }}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size="sm"
            >
              <FaChevronLeft size={10} />
            </Button>
            <Typography
              variant="subtitle1"
              style={{
                ...paginationStyle,
                color: darkMode ? "#FFFFFF" : "#343A40",
                padding: "0% 1% 0% 1%",
              }}
            >
              Página {currentPage} de{" "}
              {Math.ceil(filteredEquipamentos.length / itemsPerPage)} (Total:{" "}
              {filteredEquipamentos.length} equipamentos)
            </Typography>
            <Button
              variant="secondary"
              style={{ ...buttonStyle, ...iconStyle }}
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(filteredEquipamentos.length / itemsPerPage)
              }
              size="sm"
            >
              <FaChevronRight size={10} />
            </Button>
          </Box>
        </Container>

        {/* Modal para cadastrar equipamento */}
        <CadastrarEquipamentoModal
          visible={viewCadastrarEquipamentoModal.visible}
          setVisible={setViewCadastrarEquipamentoModal}
          equipamento={viewCadastrarEquipamentoModal.equipamento}
          getEquipamentos={getEquipamentos}
        />

        {/* Modal para excluir equipamento */}
        <DeleteEquipamentoModal
          visible={viewDeleteEquipamentoModal.visible}
          setVisible={() =>
            setViewDeleteEquipamentoModal({ visible: false, equipamento: null })
          }
          equipamento={viewDeleteEquipamentoModal.equipamento}
          getEquipamentos={getEquipamentos}
        />
      </Box>

      {/* Modal de confirmação */}
      <ConfirmacaoModal
        visible={confirmacaoModal.visible}
        setVisible={() =>
          setConfirmacaoModal({ visible: false, mensagem: "", sucesso: false })
        }
        mensagem={confirmacaoModal.mensagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </Layout>
  );
};

export default Equipamentos;
