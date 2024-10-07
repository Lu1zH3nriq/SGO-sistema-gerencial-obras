import React, { useEffect, useState } from "react";
import { useUIContextController } from "../../context/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { FaChevronLeft } from "react-icons/fa";
import Layout from "../../components/layout/Layout.js";
import { useNavigate } from "react-router-dom";

const GerenciarObra = ({ obraSelecionada }) => {
  const [state] = useUIContextController();
  const { darkMode } = state;
  const navigate = useNavigate();
  const [obra, setObra] = useState(obraSelecionada || {}); // Inicializa como objeto vazio

  useEffect(() => {
    setObra(obraSelecionada || {}); // Atualiza com obraSelecionada ou um objeto vazio
  }, [obraSelecionada]);

  return (
    <Layout rotaAtual="Obras">
      <Container
        style={{
          marginTop: "2vh",
        }}
      >
        {/* Header */}
        <Row
          className="mb-3"
          style={{
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
              : "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                color="link"
                onClick={() => navigate(-1)}
                className="text-decoration-none"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: darkMode ? "#FFFFFF" : "#343A40",
                }}
              >
                <FaChevronLeft />
                {""} Voltar
              </Button>
            </div>
            <div
              className="d-flex justify-content-start align-items-center"
              style={{
                width: "50%",
                color: darkMode ? "#FFFFFF" : "#343A40",
                height: "100%",
              }}
            >
              <h6 style={{ margin: "0" }}>{obra?.nome || "Nome da Obra"}</h6>
            </div>
            <div
              className="text-end"
              style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
            >
              <Button
                color="link"
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                className="text-decoration-none"
              >
                Equipamentos
              </Button>
              <Button
                color="link"
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                className="text-decoration-none"
              >
                Funcionários
              </Button>
              <Button
                color="link"
                style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                className="text-decoration-none"
              >
                Materiais
              </Button>
            </div>
          </div>
        </Row>
        <div
          style={{
            backgroundColor: darkMode ? "#B6B6B6" : "#FFFFFF",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
              : "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Dados da Obra e Pie Chart */}
          <Row className="mb-2" noGutters>
            <Col xs={12} sm={6} md={6} className="mb-4">
              <Card
                style={{
                  backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                  margin: "0.5rem",
                  height: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardBody>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Informações gerais
                  </CardTitle>
                  <CardText
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      padding: "1rem 0rem 0.5rem 0rem",
                    }}
                  ></CardText>
                </CardBody>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={6} className="mb-4">
              <Card
                style={{
                  backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                  margin: "0.5rem",
                  height: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardBody>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Andamento da Obra
                  </CardTitle>
                  <CardText
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      padding: "1rem 0rem 0.5rem 0rem",
                    }}
                  >
                    Conteúdo do Card 3
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Lista de Equipamentos e Materiais */}
          <Row className="mb-4" noGutters>
            <Col xs={12} sm={6} md={6} className="mb-1">
              <Card
                style={{
                  backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                  margin: "0.5rem",
                  height: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardBody>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Equipamentos
                  </CardTitle>
                  <CardText
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      padding: "1rem 0rem 0.5rem 0rem",
                    }}
                  ></CardText>
                </CardBody>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={6} className="mb-1">
              <Card
                style={{
                  backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                  margin: "0.5rem",
                  height: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardBody>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Materiais
                  </CardTitle>
                  <CardText
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      padding: "1rem 0rem 0.5rem 0rem",
                    }}
                  >
                    Conteúdo do Card 3
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Lista de Funcionários */}
          <Row className="mb-4">
            <Col xs={12} sm={12} md={12} className="mb-1">
              <Card
                style={{
                  backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                  margin: "0.5rem",
                  height: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardBody>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Funcionários
                  </CardTitle>
                  <CardText
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      padding: "1rem 0rem 0.5rem 0rem",
                    }}
                  ></CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default GerenciarObra;
