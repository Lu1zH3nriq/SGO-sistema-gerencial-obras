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

const Equipamentos = () => {
  const [state] = useUIContextController();
  const { userId } = state;
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const equipamentos = [
    {
      nome: "Equipamento 1",
      status: "Ativo",
      descricao: "Descrição do Equipamento 1",
      data: "01/01/2023",
    },
    // Adicione mais equipamentos conforme necessário
  ];

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
              <Button variant="secondary" className="d-flex align-items-center">
                <FaPlus className="me-2" /> Adicionar
              </Button>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
              >
                Filtrar:
              </Typography>
              <FormControl as="select" className="me-2" style={{}}>
                {/* Adicione opções de filtro aqui */}
              </FormControl>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
              >
                Ordenar:
              </Typography>
              <FormControl as="select" className="me-2" style={{}}>
                {/* Adicione opções de ordenação aqui */}
              </FormControl>
            </Col>
            <Col
              md={4}
              className="d-flex align-items-center justify-content-end"
            >
              <Typography
                variant="subtitle1"
                className="me-2"
                color={"secondary"}
              >
                Pesquisar
              </Typography>
              <FormControl
                type="text"
                placeholder="Pesquisar por nome do equipamento"
                className="me-2"
                style={{ borderRadius: "20px" }}
              />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </Col>
          </Row>

          {/* Lista de Cards */}
          <Container fluid={"md"} style={{ maxWidth: "60%", marginTop: "5%" }}>
            {equipamentos.map((equipamento, index) => (
              <Box key={index} sx={{ width: "100%", mb: 2 }}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{equipamento.nome}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {equipamento.status}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleExpandClick(index)}>
                      {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                    </IconButton>
                  </CardContent>
                  <Collapse
                    in={expanded === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography variant="body2">
                        Descrição: {equipamento.descricao}
                      </Typography>
                      <Typography variant="body2">
                        Data de Aquisição: {equipamento.data}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <FaEdit
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        size={20}
                        title="Editar"
                      />
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        size={20}
                        title="Excluir"
                      />
                    </Box>
                  </Collapse>
                </Card>
              </Box>
            ))}
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default Equipamentos;
