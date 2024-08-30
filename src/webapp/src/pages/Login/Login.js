import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Box,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import bgImageLogin from "../../assets/images/bgImageLogin.jpg";

import { useUIContextController } from "../../context/index.js";

import Footer from "../../components/footer/footerLogin.js";
import { Spinner } from "reactstrap";
import axios from "axios";

const Login = ({ onLogin }) => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [controller] = useUIContextController();
  const { darkMode } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    setShowPassword(false);
  }, []);

  const alterShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    setLoadingLogin(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        `${URL_API}/api/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInterval(() => {
        onLogin(response.data);
        setLoadingLogin(false);
      }, 3000);
    } catch (error) {
      if (error.response) {
        // Verifica se o status da resposta é 404
        if (error.response.status === 404) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Erro: " + error.message);
        }
      } else {
        setErrorMessage("Erro na solicitação. Por favor, tente novamente.");
      }
      setOpenErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          maxWidth: "100%",
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            bgImageLogin &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImageLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                maxWidth: "70%",
                margin: "0 auto",
                minHeight: "60vh",
                justifyContent: "center",
              }}
            >
              <CardHeader
                title={
                  !loadingLogin
                    ? "SGO - Sistema de Gestão de Obras"
                    : "Entrando..."
                }
                sx={{
                  textAlign: "center",
                }}
              />
              <CardContent>
                <div
                  style={{
                    textAlign: "center",
                    color: darkMode ? "white" : "#344767",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    marginTop: -15,
                  }}
                >
                  <p>Bem vindo de volta!</p>
                </div>
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite seu email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    name="senha"
                    id="senha"
                    placeholder="Digite sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Switch
                    checked={showPassword}
                    onChange={() => alterShowPassword()}
                  />
                  <label
                    style={{
                      cursor: "pointer",
                      color: darkMode ? "white" : "#344767",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    &nbsp;Exibir senha
                  </label>
                  <Button
                    type="submit"
                    variant="contained"
                    color={darkMode ? "primary" : "secondary"}
                    fullWidth
                    style={{ color: "white", marginTop: 20 }}
                  >
                    {!loadingLogin ? (
                      "Entrar"
                    ) : (
                      <Spinner
                        color="light"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    )}
                  </Button>
                  <Link
                    to="/resetSenha"
                    style={{
                      cursor: "pointer",
                      color: darkMode ? "white" : "#344767",
                      fontFamily: "Arial, sans-serif",
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Redefinir senha
                  </Link>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Container>
        <Footer />
      </Box>

      <Dialog
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Erro de Login</DialogTitle>
        <DialogContent>
          <Typography id="error-dialog-description">{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
