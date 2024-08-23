import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Table,
} from "reactstrap";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Materiais = () => {
  const [state] = useUIContextController();
  const { userId, darkMode } = state;

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#343A40",
    borderRadius: "20px",
  };

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
          <Row className="mb-4" style={{ marginTop: '2%' }}>
            <Col md={6} className="d-flex align-items-center">
              <Button color="secondary" className="d-flex align-items-center" style={buttonStyle}>
                <FaPlus className="me-2" /> Adicionar
              </Button>
            </Col>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-end"
            >
              <Typography variant="subtitle1" className="me-2" color={'secondary'} style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}>
                Pesquisar nome:
              </Typography>
              <Input
                type="text"
                className="me-2"
                style={inputStyle}
              />
              <Button outline color="secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
          </Row>

          <Container fluid style={{ maxWidth: "85%", marginTop: "5%" }}>
            {/* Tabela */}
            <Table
              striped
              responsive
              size="sm"
              borderless
              dark={darkMode}
              style={{ borderRadius: "10px", marginTop: "2%" }}
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Data de Aquisição</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: darkMode ? "#676767" : "#f0f0f0" }}>
                  <td>Material 1</td>
                  <td>100</td>
                  <td>01/01/2023</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
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
                    </div>
                  </td>
                </tr>
                {/* Adicione mais linhas conforme necessário */}
              </tbody>
            </Table>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default Materiais;