import React, { useEffect, useState } from "react";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const Dashboard = () => {
  const URL_API = process.env.REACT_APP_URL_API;
  const [state] = useUIContextController();
  const { darkMode } = state;
  const [obras, setObras] = useState({
    total: 0,
    andamento: 0,
    concluidas: 0,
    atrasadas: 0,
  });
  const [dataObras, setDataObras] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

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
  const getAllObras = () => {
    setLoading(true);
    axios
      .get(`${URL_API}/api/obras/obras`)
      .then((response) => {
        const obrasData = response.data;

        const totalObras = obrasData.length;
        const obrasEmAndamento = obrasData.filter(
          (obra) => obra.status === "Em andamento"
        ).length;
        const obrasConcluidas = obrasData.filter(
          (obra) => obra.status === "Concluida"
        ).length;
        const obrasAtrasadas = obrasData.filter(
          (obra) => obra.status === "Atrasada"
        ).length;

        setObras({
          total: totalObras,
          emAndamento: obrasEmAndamento,
          concluidas: obrasConcluidas,
          atrasadas: obrasAtrasadas,
        });

        setDataObras(obrasData);
      })
      .catch((error) => {
        console.error("ERRO AO BUSCAR OBRAS:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllEquipamentos = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/api/equipamentos/equipamentos`
      );

      setEquipamentos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllObras();
    getAllEquipamentos();
  }, []);

  return (
    <Layout>
      <Container>
        {/* Linha com resultados*/}
        <Row className="mt-4">
          {loading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={3} className="mb-1" key={index}>
                  <Card style={cardStyle}>
                    <CardBody className="d-flex justify-content-between">
                      <div
                        style={{
                          width: "35%",
                          textAlign: "center",
                          alignContent: "center",
                        }}
                      >
                        <Skeleton height={64} width="100%" />
                      </div>
                      <div
                        className="text-right"
                        style={{
                          flex: 1,
                          alignContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Skeleton height={20} width="100%" />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            <>
              <Col xs={12} sm={6} md={3} className="mb-1">
                <Card style={cardStyle}>
                  <CardBody className="d-flex justify-content-between">
                    <div
                      style={{
                        backgroundColor: "#2E2E33",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        width: "35%",
                        maxHeight: '70%',
                        textAlign: "center",
                        alignContent: "center",
                        marginRight: '0.5rem'
                      }}
                    >
                      <h6
                        style={{
                          color: "#FFFFFF",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {obras.total}
                      </h6>
                    </div>
                    <div
                      className="text-right"
                      style={{
                        flex: 1,
                        alignContent: "center",
                        textAlign: "right",
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
                        maxHeight: '70%',
                        textAlign: "center",
                        alignContent: "center",
                        marginRight: '0.5rem'
                      }}
                    >
                      <h6
                        style={{
                          color: "#FFFFFF",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {obras.emAndamento}
                      </h6>
                    </div>
                    <div
                      className="text-right"
                      style={{
                        flex: 1,
                        alignContent: "center",
                        textAlign: "right",
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
                        maxHeight: '70%',
                        textAlign: "center",
                        alignContent: "center",
                        marginRight: '0.5rem'
                      }}
                    >
                      <h6
                        style={{
                          color: "#FFFFFF",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {obras.concluidas}
                      </h6>
                    </div>
                    <div
                      className="text-right"
                      style={{
                        flex: 1,
                        alignContent: "center",
                        textAlign: "right",
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
                        maxHeight: '70%',
                        textAlign: "center",
                        alignContent: "center",
                        marginRight: '0.5rem'
                      }}
                    >
                      <h6
                        style={{
                          color: "#FFFFFF",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {obras.atrasadas}
                      </h6>
                    </div>
                    <div
                      className="text-right"
                      style={{
                        flex: 1,
                        alignContent: "center",
                        textAlign: "right",
                      }}
                    >
                      <p style={textStyle}>Obras atrasadas</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </>
          )}
        </Row>

        {/* Linha com obras */}
        <Row className="mt-4">
          <>
            <Col xs={12} md={12} className="mb-4" style={{ height: "40vh" }}>
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
                <CardBody style={{ height: "100%" }}>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    {loading ? <Skeleton height={20} width="30%" /> : "Minhas Obras"}
                  </CardTitle>

                  {loading ? (
                    <Skeleton height="80%" width="100%" />
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Col>
          </>
        </Row>

        <Row className="mt-4">
          <>
            <Col xs={12} md={12} className="mb-4" style={{ height: "40vh" }}>
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
                <CardBody style={{ height: "100%" }}>
                  <CardTitle
                    style={{
                      color: darkMode ? "#FFFFFF" : "#343A40",
                      textAlign: "start",
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(52, 58, 64, 0.2)",
                    }}
                  >
                    {loading ? <Skeleton height={20} width="30%" /> : "Meus Equipamentos"}
                  </CardTitle>

                  {loading ? (
                    <Skeleton height="80%" width="100%" />
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Col>
          </>
        </Row>

      </Container>
    </Layout>
  );
};

export default Dashboard;
