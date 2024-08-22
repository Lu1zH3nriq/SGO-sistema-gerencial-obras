import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  FormControl,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Funcionarios = () => {
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
    <Layout rotaAtual="Funcionários">
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
              <Button variant="secondary" className="d-flex align-items-center" style={buttonStyle}>
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
              <FormControl
                type="text"
                className="me-2"
                style={inputStyle}
                sx={{ '&::placeholder': { color: darkMode ? "#FFFFFF" : "#343A40" } }}
              />
              <Button variant="outline-secondary" style={buttonStyle}>
                <FaSearch />
              </Button>
            </Col>
          </Row>

          {/* Tabela */}
          <Table
            striped
            bordered
            hover
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "5%",
            }}
          >
            <thead style={{ backgroundColor: "#d3d3d3" }}>
              <tr>
                <th style={{ padding: "4px" }}>Nome</th>
                <th style={{ padding: "4px" }}>Cargo</th>
                <th style={{ padding: "4px" }}>Data de Admissão</th>
                <th style={{ padding: "4px", textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <td style={{ padding: "4px" }}>Funcionário 1</td>
                <td style={{ padding: "4px" }}>Cargo 1</td>
                <td style={{ padding: "4px" }}>01/01/2023</td>
                <td
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                      style={{ cursor: "pointer", marginRight: "10px", color: darkMode ? "#343A40" : "#343A40" }}
                      size={20}
                      title="Editar"
                    />
                    <FaTrash
                      style={{ cursor: "pointer", color: darkMode ? "#343A40" : "#343A40" }}
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
      </Box>
    </Layout>
  );
};

export default Funcionarios;