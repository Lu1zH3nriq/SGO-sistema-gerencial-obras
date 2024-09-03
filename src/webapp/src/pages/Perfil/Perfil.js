import React, { useState, useEffect } from "react";
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
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { Spinner } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { formatarTelefone } from "components/utils/utilsMask.js";

const Perfil = () => {
  const [state] = useUIContextController();
  const { userId, darkMode } = state;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmation, setconfirmation] = useState({
    state: false,
    message: "",
  });

  const URL_API = process.env.REACT_APP_URL_API;

  useEffect(() => {
    axios
      .get(`${URL_API}/api/users/usuario?email=${userId}`)
      .then((response) => {
        console.log("user", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    border: "none", // Remover a borda do botão
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: darkMode ? "1px solid #676767" : "1px solid #ced4da",
  };

  const updateUser = () => {
    setLoading(true);
    axios
      .put(`${URL_API}/api/users/alterarUsuario?id=${user.id}`, user)
      .then((response) => {
        console.log("user", response.data);
        setUser(response.data);
        setconfirmation({
          state: true,
          message: "Usuário atualizado com sucesso!",
        });
      })
      .catch((error) => {
        console.log(error);
        setconfirmation({
          state: true,
          message: "Erro ao atualizar usuário!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout rotaAtual="Obras">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "7%",
          alignItems: "center",
        }}
      >
        <Container style={{ height: "100%" }}>
          <Row>
            <Col md={6}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "10px", ...textStyle }}
                    >
                      Foto
                    </Typography>
                    <Box>
                      <IconButton style={textStyle}>
                        <FaEdit />
                      </IconButton>
                      <IconButton style={textStyle}>
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </Box>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                    }}
                  ></div>
                </CardContent>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Informações Pessoais
                  </Typography>
                  <Typography variant="h6" style={textStyle}>
                    Nome: {user.nome}
                  </Typography>
                  <Typography variant="h6" style={textStyle}>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="h6" style={textStyle}>
                    Cargo: {user.cargo}
                  </Typography>
                  <Typography variant="h6" style={textStyle}>
                    Tipo: {user.tipo}
                  </Typography>
                  <Typography variant="h6" style={textStyle}>
                    Telefone: {formatarTelefone(user.telefone)}
                  </Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Form.Group>
                    <Form.Label style={textStyle}>Email</Form.Label>
                    <FormControl
                      type="text"
                      value={user.email}
                      readOnly
                      style={inputStyle}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label style={textStyle}>Telefone</Form.Label>
                    <FormControl
                      type="text"
                      value={formatarTelefone(user.telefone)}
                      style={inputStyle}
                      onChange={(e) => {
                        setUser({ ...user, telefone: e.target.value });
                      }}
                    />
                  </Form.Group>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Status
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.status === "Ativo" ? true : false}
                      />
                    }
                    label={user.status === "Ativo" ? "Ativo" : "Inativo"}
                    style={textStyle}
                  />
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Nível do Usuário
                  </Typography>
                  <Form.Check
                    type="radio"
                    label="Administrador"
                    name="permission"
                    value="Administrador"
                    checked={user.nivelUsuario === "1" ? true : false}
                    style={textStyle}
                  />
                  <Form.Check
                    type="radio"
                    label="Comum"
                    name="permission"
                    value="Comum"
                    checked={user.nivelUsuario === "2" ? true : false}
                    style={{ marginTop: "10px", ...textStyle }}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button variant="primary" style={buttonStyle} onClick={()=>{
              updateUser();
            }}>
              {loading ? <Spinner color="light" size={"sm"} /> : "Salvar"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Perfil;
