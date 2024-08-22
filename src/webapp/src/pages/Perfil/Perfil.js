import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import { Container, Row, Col, Button, FormControl, Form } from "react-bootstrap";
import { FaPlus, FaSearch, FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";

const Perfil = () => {
  const [state] = useUIContextController();
  const { userId, userName, userEmail, userRole, userFunction, userPhone, userPermission } = state;
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
    backgroundColor: "#f0f0f0",
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
                    <Typography variant="h6" style={{ marginBottom: "10px" }}>Foto</Typography>
                    <Box>
                      <IconButton>
                        <FaEdit />
                      </IconButton>
                      <IconButton>
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
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px" }}>Informações Pessoais</Typography>
                  <Typography variant="h6">Nome: {userName}</Typography>
                  <Typography variant="h6">Email: {userEmail}</Typography>
                  <Typography variant="h6">Cargo: {userRole}</Typography>
                  <Typography variant="h6">Função: {userFunction}</Typography>
                  <Typography variant="h6">Telefone: {userPhone}</Typography>
                  <Typography variant="h6">Permissão: {userPermission}</Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Form.Group>
                    <Form.Label>Email Atual</Form.Label>
                    <FormControl type="text" value={userEmail} readOnly />
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Telefone</Form.Label>
                    <FormControl type="text" defaultValue={userPhone} />
                  </Form.Group>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px" }}>Status</Typography>
                  <FormControlLabel
                    control={<Switch checked={status} onChange={handleStatusChange} />}
                    label={status ? "Ativado" : "Desativado"}
                  />
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px" }}>Permissões</Typography>
                  <Form.Check
                    type="radio"
                    label="Administrador"
                    name="permission"
                    value="Administrador"
                    checked={permission === "Administrador"}
                    onChange={handlePermissionChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Comum"
                    name="permission"
                    value="Comum"
                    checked={permission === "Comum"}
                    onChange={handlePermissionChange}
                    style={{ marginTop: "10px" }}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="primary">Salvar</Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Perfil;