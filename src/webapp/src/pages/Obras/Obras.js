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
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import { FaPlus, FaSearch, FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import CadastrarObraModal from "components/Obras/CadastrarObraModa.js";

const Obras = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [expanded, setExpanded] = useState(null);
  const [viewCadastrarObraModal, setViewCadastrarObraModal] = useState(false);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const obras = [
    {
      nome: "Obra 1",
      cliente: "Cliente 1",
      dataInicio: "01/01/2023",
      descricao: "Descrição da Obra 1",
    },
    // Adicione mais obras conforme necessário
  ];

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

  const placeholderStyle = {
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const showCadastrarObraModal = () => {
    console.log("Cadastrar Obra");
    setViewCadastrarObraModal(true);
  }

  return (
    <Layout rotaAtual="Obras">
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
              <Button variant="secondary" className="d-flex align-items-center" style={buttonStyle} onClick={showCadastrarObraModal}>
                <FaPlus className="me-2" /> Adicionar
              </Button>
            </Col>
            <Col md={3} className="d-flex align-items-center">
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
              >
                {/* Adicione opções de filtro aqui */}
              </FormControl>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Ordenar:
              </Typography>
              <FormControl
                as="select"
                className="me-2"
                style={inputStyle}
              >
                {/* Adicione opções de ordenação aqui */}
              </FormControl>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-end">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
              >
                Pesquisar por cliente
              </Typography>
              <FormControl
                type="text"
                className="me-2"
                style={{ ...inputStyle, borderRadius: "20px" }}
              />
              <Button variant="outline-secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
          </Row>

          {/* Lista de Cards */}
          <Container fluid style={{ maxWidth: "80%", marginTop: "5%" }}>
            {obras.map((obra, index) => (
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
                      <Typography variant="h6" style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>{obra.nome}</Typography>
                      <Typography variant="body2" color="textSecondary" style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>
                        Cliente: {obra.cliente}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>
                        Data Início: {obra.dataInicio}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleExpandClick(index)} style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>
                      {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                    </IconButton>
                  </CardContent>
                  <Collapse
                    in={expanded === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography variant="body2" style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>
                        Descrição: {obra.descricao}
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
                          style={{ cursor: "pointer", marginRight: "10px", color: darkMode ? "#FFFFFF" : "#343A40" }}
                          size={20}
                          title="Editar"
                        />
                        <FaTrash
                          style={{ cursor: "pointer", color: darkMode ? "#FFFFFF" : "#343A40" }}
                          size={20}
                          title="Excluir"
                        />
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Box>
            ))}
          </Container>
        </Container>
        {/* Modal para cadastrar obra */}
        <CadastrarObraModal
          visible={viewCadastrarObraModal}
          setVisible={setViewCadastrarObraModal}
        />
      </Box>

    </Layout>
  );
};

export default Obras;