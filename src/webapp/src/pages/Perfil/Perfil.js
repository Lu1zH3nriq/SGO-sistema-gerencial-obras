import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Button, FormControl, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const Perfil = () => {
  const [state] = useUIContextController();
  const { userId, userName, userEmail, userRole, userFunction, userPhone, userPermission, darkMode } = state;
  const [status, setStatus] = useState(true);
  const [permission, setPermission] = useState("Comum");

  const handleStatusChange = () => {
    setStatus(!status);
  };

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  const cardStyle = {
    padding: "20px",
    height: "100%",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const textStyle = {
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: 'none', // Remover a borda do botão
  };

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
        <Container style={{ height: '100%' }}>
          <Row>
            <Col md={6}>
              <Card style={cardStyle}>
                <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant="h6" style={{ marginBottom: "10px", ...textStyle }}>Foto</Typography>
                    <Box>
                      <IconButton style={textStyle}>
                        <FaEdit />
                      </IconButton>
                      <IconButton style={textStyle}>
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </Box>
                  <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#ccc" }}></div>
                </CardContent>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px", ...textStyle }}>Informações Pessoais</Typography>
                  <Typography variant="h6" style={textStyle}>Nome: {userName}</Typography>
                  <Typography variant="h6" style={textStyle}>Email: {userEmail}</Typography>
                  <Typography variant="h6" style={textStyle}>Cargo: {userRole}</Typography>
                  <Typography variant="h6" style={textStyle}>Função: {userFunction}</Typography>
                  <Typography variant="h6" style={textStyle}>Telefone: {userPhone}</Typography>
                  <Typography variant="h6" style={textStyle}>Permissão: {userPermission}</Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Form.Group>
                    <Form.Label style={textStyle}>Email Atual</Form.Label>
                    <FormControl type="text" value={userEmail} readOnly style={textStyle} />
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label style={textStyle}>Telefone</Form.Label>
                    <FormControl type="text" defaultValue={userPhone} style={textStyle} />
                  </Form.Group>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px", ...textStyle }}>Status</Typography>
                  <FormControlLabel
                    control={<Switch checked={status} onChange={handleStatusChange} />}
                    label={status ? "Ativado" : "Desativado"}
                    style={textStyle}
                  />
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px", ...textStyle }}>Permissões</Typography>
                  <Form.Check
                    type="radio"
                    label="Administrador"
                    name="permission"
                    value="Administrador"
                    checked={permission === "Administrador"}
                    onChange={handlePermissionChange}
                    style={textStyle}
                  />
                  <Form.Check
                    type="radio"
                    label="Comum"
                    name="permission"
                    value="Comum"
                    checked={permission === "Comum"}
                    onChange={handlePermissionChange}
                    style={{ marginTop: "10px", ...textStyle }}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="primary" style={buttonStyle}>Salvar</Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Perfil;