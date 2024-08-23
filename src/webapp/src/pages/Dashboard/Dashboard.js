import React from "react";
import { Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  const [state] = useUIContextController();
  const { darkMode } = state;

  const cardStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    padding: "1rem",
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const textStyle = {
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const internalCardColors = ["#2E2E33", "#2C85EC", "#4CA750", "#DD2467"];

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          marginTop: "5%",
          alignItems: "start",
          // marginLeft: "1%",
        }}
      >
        <Container height={'100%'} style={{ maxWidth: '85%' }}>
          {/* Linha com quatro colunas */}
          <Row className="mt-4">
            {[1, 2, 3, 4].map((info, index) => (
              <Col key={index} xs={12} sm={6} md={3}>
                <Card style={cardStyle}>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: internalCardColors[index],
                          padding: "0.5rem",
                          flex: 1,
                          borderRadius: "0.5rem",
                          maxWidth: "25%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          fontWeight="bold"
                          style={{ color: "#FFFFFF", fontSize: "1.5rem" }}
                        >
                          {info * 10}
                        </Typography>
                      </div>
                      <div style={{ textAlign: "right", flex: 1 }}>
                        <Typography variant="body2" style={textStyle}>Info add aqui</Typography>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Linha com três colunas */}
          <Row className="mt-4">
            <Col xs={12} sm={6} md={4}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={textStyle}>Card 3</Card.Title>
                  <Card.Text style={textStyle}>Conteúdo do Card 3</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={textStyle}>Card 4</Card.Title>
                  <Card.Text style={textStyle}>Conteúdo do Card 4</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={textStyle}>Card 5</Card.Title>
                  <Card.Text style={textStyle}>Conteúdo do Card 5</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Linha com duas colunas */}
          <Row className="mt-4">
            <Col xs={12} md={8}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={textStyle}>Card 1</Card.Title>
                  <Card.Text style={textStyle}>Conteúdo do Card 1</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={textStyle}>Card 2</Card.Title>
                  <Card.Text style={textStyle}>Conteúdo do Card 2</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>
    </Layout>
  );
};

export default Dashboard;