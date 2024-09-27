import React, { useEffect, useState } from "react";
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
import CadastrarObraModal from "components/Obras/CadastrarObraModa.js";
import DateSelectionModal from "components/Obras/CustomDates.js";
import DeleteObraModal from "components/Obras/DeleteObraModal.js";
import axios from "axios";
import { formatarDataISO } from "components/utils/utilsMask.js";

const Obras = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [obras, setObras] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [expanded, setExpanded] = useState(null);
  const [viewCadastrarObraModal, setViewCadastrarObraModal] = useState({
    visible: false,
    obra: null,
  });
  const [viewDeleteObraModal, setViewDeleteObraModal] = useState({
    visible: false,
    obra: null,
  });
  const [filtro, setFiltro] = useState("Nenhum");
  const [modalDatasOpen, setModalDatasOpen] = useState(false);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [clienteDaObra, setClienteDaObra] = useState(null);
  const [funcionarioResponsavel, setFuncionarioResponsavel] = useState(null);

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleFiltroChange = (e) => {
    const value = e.target.value;
    setFiltro(value);
    if (value === "Datas") {
      setModalDatasOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalDatasOpen(false);
    setFiltro("Nenhum");
  };

  const filteredObras = obras.filter((obra) => {
    if (searchTerm === "") {
      return obra.contrato
        .toLowerCase()
        .includes(searchContract.toLowerCase());
    } else if (searchContract === "") {
      return obra.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        obra.cliente.toLowerCase().includes(searchTerm.toLowerCase()) &&
        obra.contrato.toLowerCase().includes(searchContract.toLowerCase())
      );
    }
  });

  // Calcular índices de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredObras.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredObras.length / itemsPerPage)) {
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

  const getObras = async () => {
    setLoading(true);
    axios.get(`${URL_API}/api/obras/obras`)
      .then((response) => {
        console.log('OBRAS :', response.data);
        setObras(response.data);
      })
      .catch((error) => {
        console.error('ERRO AO BUSCAR OBRAS:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getClienteDaObra = async (id) => {
    axios
      .get(`${URL_API}/api/clientes/cliente?id=${id}`)
      .then((response) => {
        setClienteDaObra(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFuncionarioResponsavel = async (id) => {
    axios
      .get(`${URL_API}/api/funcionarios/funcionario?id=${id}`)
      .then((response) => {
        setFuncionarioResponsavel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getInfos = async (obra) => {
    setLoadingInfo(true);
    getClienteDaObra(obra.clienteId);
    setLoadingInfo(false);
  };
  useEffect(() => {

    getObras();
  }, []);

  const cadastrarObra = () => {
    setViewCadastrarObraModal({
      visible: true,
      obra: null,
    });
  };

  const editarObra = (obra) => {
    setViewCadastrarObraModal({
      visible: true,
      obra: obra,
    });
  };

  const deleteObra = (obra) => {
    setViewDeleteObraModal({
      visible: true,
      obra: obra,
    });
  };

  return (
    <Layout rotaAtual="Obras">
      <Container
        style={{
          marginTop: "8vh",
        }}
      >
        {/* Linha com botão "Adicionar" e campo de pesquisa */}
        <Row className="mb-4"
          style={{
            marginTop: "2%",
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
              : "0px 0px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Col md={2} className="d-flex align-items-center">
            <Button
              variant="secondary"
              className="d-flex align-items-center"
              style={buttonStyle}
              onClick={cadastrarObra}
            >
              <FaPlus className="me-2" /> Adicionar
            </Button>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <Typography
              variant="subtitle1"
              className="me-2"
              color={"secondary"}
              style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
            >
              Filtrar:
            </Typography>
            <FormControl
              as="select"
              className="me-2"
              style={inputStyle}
              value={filtro}
              onChange={handleFiltroChange}
            >
              <option value="Nenhum">Nenhum</option>
              <option value="Datas">Datas</option>
              <option value="Andamento">Andamento</option>
              <option value="Concluídas">Concluídas</option>
              <option value="Não Iniciadas">Não Iniciadas</option>
              <option value="Atrasadas">Atrasadas</option>
            </FormControl>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <Typography
              variant="subtitle1"
              className="me-2"
              color={"secondary"}
              style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
            >
              Cliente
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
              Contrato
            </Typography>
            <FormControl
              type="text"
              className="me-2"
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
          <Container>
            {currentItems.length > 0 ? (
              currentItems.map((obra, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    mb: 2,
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card style={cardStyle}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          {obra.nome}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Endereço: {obra.endereco}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Responsável pela obra: {obra.responsavel || "Não informado"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{
                            color: darkMode ? "#FFFFFF" : "#343A40",
                          }}
                        >
                          {obra.status === "Em andamento" ? (
                            <span style={{ color: "#FFA500", fontWeight: "bold" }}>
                              {obra.status}
                            </span>
                          ) : obra.status === "Concluída" ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>
                              {obra.status}
                            </span>
                          ) : obra.status === "Cancelada" ? (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {obra.status}
                            </span>
                          ) : (
                            <span style={{ color: "gray", fontWeight: "bold" }}>
                              {obra.status}
                            </span>
                          )}
                        </Typography>
                      </Box>

                      <IconButton
                        onClick={() => handleExpandClick(index)}
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                      </IconButton>
                    </CardContent>
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Cliente: {obra.clienteId}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Data Início: {formatarDataISO(obra.dataInicio)}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Previsão para entrega: {formatarDataISO(obra?.dataFinal) || "Não informado"}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Alvará: {obra.alvara}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Contrato: {obra.contrato}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                        >
                          Orçamento inicial: {obra.orcamento}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            marginTop: "2.5rem",
                          }}
                        >
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              marginRight: "10px",
                              color: darkMode ? "#FFFFFF" : "#343A40",
                            }}
                            onClick={() => {
                              editarObra(obra);
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
                              deleteObra(obra);
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
                Nenhuma obra encontrada
              </Typography>
            )}
          </Container>)}

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
            {Math.ceil(filteredObras.length / itemsPerPage)} (Total:{" "}
            {filteredObras.length} obras)
          </Typography>
          <Button
            variant="secondary"
            style={{ ...buttonStyle, ...iconStyle }}
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredObras.length / itemsPerPage)
            }
            size="sm"
          >
            <FaChevronRight size={10} />
          </Button>
        </Box>
      </Container>

      {/* Modal para cadastrar obra */}
      <CadastrarObraModal
        visible={viewCadastrarObraModal.visible}
        setVisible={setViewCadastrarObraModal}
        obra={viewCadastrarObraModal.obra}
        getObras={getObras}
      />

      {/* Modal para selecionar datas */}
      <DateSelectionModal
        show={modalDatasOpen}
        onHide={handleModalClose}
        darkMode={darkMode}
        dataInicial={dataInicial}
        setDataInicial={setDataInicial}
        dataFinal={dataFinal}
        setDataFinal={setDataFinal}
        handleModalClose={handleModalClose}
        setModalDatasOpen={setModalDatasOpen}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
      />

      {/* Modal para excluir obra */}
      <DeleteObraModal
        visible={viewDeleteObraModal.visible}
        setVisible={() =>
          setViewDeleteObraModal({ visible: false, obra: null })
        }
        obra={viewDeleteObraModal.obra}
      />
    </Layout>
  );
};

export default Obras;
