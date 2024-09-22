import React, { useState, useEffect } from "react";
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
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
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
import { formatarData } from "components/utils/utilsMask.js";

const EquipamentosComum = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUso, setLoadingUso] = useState(false);
  const [state] = useUIContextController();
  const { darkMode, userId } = state;
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
    sucesso: false,
  });

  const [obraSelecionada, setObraSelecionada] = useState(null);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const getMeusEquipamentos = async () => {
    setLoading(true);
    console.log("userId", userId);
    try {
      const response = await axios.get(
        `${URL_API}/api/equipamentos/equipamentosPorUser?userId=${userId}`
      );
      setEquipamentos(response.data);
    } catch (error) {
      setConfirmacaoModal({
        visible: true,
        mensagem: "Erro ao buscar equipamentos",
        sucesso: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const getTodosEquipamentos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL_API}/api/equipamentos/equipamentos`
      );
      setEquipamentos(response.data);
    } catch (error) {
      setConfirmacaoModal({
        visible: true,
        mensagem: "Erro ao buscar equipamentos",
        sucesso: false,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buscaEquipamentos = (tipo) => {
    if (tipo === "meus-equipamentos") {
      getMeusEquipamentos();
    } else {
      getTodosEquipamentos();
    }
  };

  useEffect(() => {
    getTodosEquipamentos();
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
    fontSize: "0.875rem",
  };

  const iconStyle = {
    fontSize: "1rem",
  };

  const editarEquipamento = (equipamento) => {
    setViewCadastrarEquipamentoModal({
      visible: true,
      equipamento: equipamento,
    });
  };

  const equipamentoEmUso = async (equipamento) => {
    setLoadingUso(true);
    if (equipamento.status !== "Em uso") {
      setObraSelecionada(null);
      setFuncionarioSelecionado(null);
      return;
    }
    if (equipamento.obraId) {
      axios
        .get(`${URL_API}/api/obras/obra?id=${equipamento.obraId}`)
        .then((response) => {
          setObraSelecionada(response.data || null);
          setLoadingUso(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (equipamento.funcionarioId) {
      axios
        .get(
          `${URL_API}/api/funcionarios/funcionario?id=${equipamento.funcionarioId}`
        )
        .then((response) => {
          setFuncionarioSelecionado(response.data || null);
          setLoadingUso(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setLoadingUso(false);
  };

  React.useEffect(() => {
    equipamentos.map((equipamento) => {
      if (equipamento.status === "Em uso") {
        equipamentoEmUso(equipamento);
      }
    });
  }, [equipamentos]);

  return (
    <Layout rotaAtual="Equipamentos">
      <Container
        style={{
          marginTop: "8vh",
        }}
      >
        <Row
          className="mb-4"
          style={{ marginTop: "2%", justifyContent: "space-between" }}
        >
          <Col md={3} className="d-flex align-items-center ml-auto">
            <Typography
              variant="subtitle1"
              className="me-2"
              color={"secondary"}
              style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
            >
              Filtrar
            </Typography>
            <FormControl
              as="select"
              className="me-2"
              style={{ ...inputStyle }}
              onChange={(e) => buscaEquipamentos(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="meus-equipamentos">Meus Equipamentos</option>
            </FormControl>
          </Col>

          <Col md={4} className="d-flex align-items-center ml-auto">
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
                          style={{
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                        >
                          {equipamento.nome}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                        >
                          {equipamento.identificador}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                        >
                          Status do Equipamento
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                        >
                          {equipamento.status === "Disponível" ? (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              {equipamento.status}
                            </span>
                          ) : equipamento.status === "Em uso" ? (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {equipamento.status}
                            </span>
                          ) : equipamento.status === "Manutenção" ? (
                            <span
                              style={{ color: "#FFA500", fontWeight: "bold" }}
                            >
                              {equipamento.status}
                            </span>
                          ) : null}
                        </Typography>
                      </Box>

                      <div>
                        {expanded === index ? (
                          <>
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
                            <FaChevronUp
                              onClick={() => {
                                handleExpandClick(index);
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                              title="Fechar"
                            />
                          </>
                        ) : (
                          <FaChevronDown
                            onClick={() => {
                              handleExpandClick(index);
                              equipamentoEmUso(equipamento);
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                            title="Abrir"
                          />
                        )}
                      </div>
                    </CardContent>
                    <Collapse
                      in={expanded === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-center",
                            alignItems: "center",
                            paddingBottom: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "48%",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              style={{
                                color: darkMode ? "#FFFFFF" : "#343A40",
                              }}
                            >
                              Data Cadastro:{" "}
                              {formatarData(equipamento.dataCadastro)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              style={{
                                color: darkMode ? "#FFFFFF" : "#343A40",
                              }}
                            >
                              Peso: {equipamento.peso}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              style={{
                                color: darkMode ? "#FFFFFF" : "#343A40",
                              }}
                            >
                              Derivado: {equipamento.derivado}
                            </Typography>
                          </Box>

                          {equipamento.status === "Em uso" &&
                            (loadingUso ? (
                              <Spinner color="light" size="sm" />
                            ) : (
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  style={{
                                    color: darkMode ? "#FFFFFF" : "#343A40",
                                  }}
                                >
                                  Data Alocação:{" "}
                                  {equipamento.dataAlocacao
                                    ? formatarData(equipamento.dataAlocacao)
                                    : "Não alocado"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  style={{
                                    color: darkMode ? "#FFFFFF" : "#343A40",
                                  }}
                                >
                                  Obra :{" "}
                                  {obraSelecionada?.nome || "Não alocado"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  style={{
                                    color: darkMode ? "#FFFFFF" : "#343A40",
                                  }}
                                >
                                  Responsável:{" "}
                                  {funcionarioSelecionado?.nome ||
                                    "Não alocado"}
                                </Typography>
                              </Box>
                            ))}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        ></Box>
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
        getEquipamentos={getTodosEquipamentos}
      />

      {/* Modal para excluir equipamento */}
      <DeleteEquipamentoModal
        visible={viewDeleteEquipamentoModal.visible}
        setVisible={() =>
          setViewDeleteEquipamentoModal({ visible: false, equipamento: null })
        }
        equipamento={viewDeleteEquipamentoModal.equipamento}
        getEquipamentos={getTodosEquipamentos}
      />

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

export default EquipamentosComum;
