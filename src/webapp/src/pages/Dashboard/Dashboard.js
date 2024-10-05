import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import classnames from "classnames";
import FuncionariosPorObra from "./FuncionariosPorObra.js";
import StatusFuncionarios from "./StatusFuncionarios.js";

const Dashboard = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    padding: "1rem",
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: "0.5rem",
    boxShadow: darkMode
      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  const textStyle = {
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const data = [
    { name: "Janeiro", concluídas: 10, emAndamento: 15, atrasadas: 2 },
    { name: "Fevereiro", concluídas: 20, emAndamento: 12, atrasadas: 5 },
    { name: "Março", concluídas: 30, emAndamento: 10, atrasadas: 3 },
    { name: "Abril", concluídas: 40, emAndamento: 8, atrasadas: 4 },
    { name: "Maio", concluídas: 50, emAndamento: 5, atrasadas: 1 },
  ];

  return (
    <Layout>
      <Container>
        {/* Linha com resultados*/}
        <Row className="mt-4">
          <Col xs={12} sm={6} md={3} className="mb-1">
            <Card style={cardStyle}>
              <CardBody className="d-flex justify-content-between">
                <div
                  style={{
                    backgroundColor: "#2E2E33",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    width: "35%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h6
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {1 * 10}
                  </h6>
                </div>
                <div
                  className="text-right"
                  style={{
                    flex: 1,
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={textStyle}>Obras cadastradas</p>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-1">
            <Card style={cardStyle}>
              <CardBody className="d-flex justify-content-between">
                <div
                  style={{
                    backgroundColor: "#2C85EC",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    width: "35%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h6
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {2 * 10}
                  </h6>
                </div>
                <div
                  className="text-right"
                  style={{
                    flex: 1,
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={textStyle}>Obras em andamento</p>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-1">
            <Card style={cardStyle}>
              <CardBody className="d-flex justify-content-between">
                <div
                  style={{
                    backgroundColor: "#4CA750",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    width: "35%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h6
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {3 * 10}
                  </h6>
                </div>
                <div
                  className="text-right"
                  style={{
                    flex: 1,
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={textStyle}>Obras concluídas</p>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-1">
            <Card style={cardStyle}>
              <CardBody className="d-flex justify-content-between">
                <div
                  style={{
                    backgroundColor: "#DD2467",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    width: "35%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h6
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {3 * 10}
                  </h6>
                </div>
                <div
                  className="text-right"
                  style={{
                    flex: 1,
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={textStyle}>Obras atrasadas</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Linha com duas colunas */}
        <Row className="mt-4">
          <Col xs={12} md={8} className="mb-4">
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
                    textAlign: "center",
                    borderBottom: darkMode
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(52, 58, 64, 0.2)",
                  }}
                >
                  Obras
                </CardTitle>
                <CardText
                  style={{
                    color: darkMode ? "#FFFFFF" : "#343A40",
                    padding: "1rem 0rem 0.5rem 0rem",
                  }}
                >
                  {/* Adicionando o gráfico aqui */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="concluídas"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="emAndamento"
                        stroke="#8884d8"
                      />
                      <Line
                        type="monotone"
                        dataKey="atrasadas"
                        stroke="#ff7300"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-4">
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
                    textAlign: "center",
                    borderBottom: darkMode
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(52, 58, 64, 0.2)",
                  }}
                >
                  Alertas
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

        {/* Linha com funcionarios*/}
        <Row className="mt-4">
          <Col xs={12} md={12} className="mb-4">
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
                {/* Header com título e abas */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#2E2E33", // Ajuste de cor do título
                      textAlign: "left",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    Funcionários
                  </CardTitle>

                  {/* Abas para alternar entre gráficos */}
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => toggle("1")}
                        style={{
                          cursor: "pointer",
                          color: darkMode ? "#FFFFFF" : "#2E2E33",
                          backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                          border: "none",
                          opacity: activeTab === "1" ? 1 : 0.5, // Opacidade ajustada para a aba ativa
                        }}
                      >
                        Por obra
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggle("2")}
                        style={{
                          cursor: "pointer",
                          color: darkMode ? "#FFFFFF" : "#2E2E33",
                          backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                          border: "none",
                          opacity: activeTab === "2" ? 1 : 0.5, // Opacidade ajustada para a aba ativa
                        }}
                      >
                        Status
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                {/* Conteúdo condicional com base na aba selecionada */}
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <CardText
                      style={{
                        color: darkMode ? "#FFFFFF" : "#2E2E33",
                        padding: "1rem 0rem 0.5rem 0rem",
                      }}
                    >
                      <FuncionariosPorObra darkMode={darkMode} />
                    </CardText>
                  </TabPane>
                  <TabPane tabId="2">
                    <CardText
                      style={{
                        color: darkMode ? "#FFFFFF" : "#2E2E33",
                        padding: "1rem 0rem 0.5rem 0rem",
                      }}
                    >
                      <StatusFuncionarios />
                    </CardText>
                  </TabPane>
                </TabContent>
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
                    textAlign: "center",
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
                >
                  Conteúdo do Card 3
                </CardText>
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
                    textAlign: "center",
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
      </Container>
    </Layout>
  );
};

export default Dashboard;
