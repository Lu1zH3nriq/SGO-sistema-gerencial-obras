import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import bgImageLogin from "../../assets/images/bgImageLogin.jpg";

import { useUIContextController } from "../../context/index.js";
import FooterLogin from "components/footer/footerLogin";
import { Spinner } from "reactstrap";
import axios from "axios";

const ResetPass = () => {
  const URL_API = process.env.REACT_APP_URL_API;

  const [controller] = useUIContextController();
  const { darkMode } = controller;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hidenPassword, setHidenPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [findedUser, setFindedUser] = useState(false);
  const [complete, setComplete] = useState({
    status: false,
    message: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassword("");

    if (findedUser) {
      try {
        const response = await axios.put(
          `${URL_API}/api/resetSenha`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resp = response.data;

        setComplete({
          status: true,
          message: `${resp.message}. Nova senha enviada para o email!`,
        });

        setEmail("");
        setFindedUser(false);
        setHidenPassword(true);
      } catch (error) {
        setComplete({
          status: true,
          message: error?.response?.data?.error || "Erro ao redefinir senha!",
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.get(
          `${URL_API}/api/users/usuario?email=${email}`
        );

        if (response.data.length === 0) {
          setComplete({
            status: true,
            message: "Usuário não encontrado!",
          });
        } else {
          setComplete({
            status: true,
            message: "Usuário encontrado!",
          });
          setFindedUser(true);
          setHidenPassword(false);
        }
      } catch (error) {
        setComplete({
          status: true,
          message: error?.response?.data?.error || "Erro ao buscar usuário!",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "100%",
        backgroundColor: darkMode ? "gray" : "#C5C5C5",
      }}
    >
      <Box
        sx={{
          height: "50vh",
          maxWidth: "100%",
          backgroundImage: (theme) =>
            bgImageLogin &&
            `${theme.functions.linearGradient(
              theme.functions.rgba(theme.palette.gradients.dark.main, 0.6),
              theme.functions.rgba(theme.palette.gradients.dark.state, 0.6)
            )}, url(${bgImageLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "0 0 20px 20px",
          backgroundColor: darkMode ? "#000" : "#fff",
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
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Redefinir Senha"
                  sx={{
                    textAlign: "center",
                  }}
                />
                <CardContent>
                  <form onSubmit={handleResetPassword}>
                    <label style={{ color: darkMode ? "white" : "#344767" }}>
                      Digite o endereço de email do usuário:
                    </label>
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
                    {complete.status ? (
                      <label style={{ color: darkMode ? "white" : "#344767" }}>
                        {complete.message}
                      </label>
                    ) : null}
                    {hidenPassword ? null : (
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Nova Senha"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Digite sua nova senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color={darkMode ? "primary" : "secondary"}
                      fullWidth
                      style={{ color: "white", marginTop: 20 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner color="light" />
                      ) : hidenPassword ? (
                        "Buscar"
                      ) : (
                        "Redefinir"
                      )}
                    </Button>
                    <Link
                      to="/authentication/login"
                      style={{
                        cursor: "pointer",
                        color: darkMode ? "white" : "#344767",
                        fontFamily: "Arial, sans-serif",
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Voltar para o Login
                    </Link>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <FooterLogin color={darkMode ? "white" : "#344767"} />
      </Box>
    </Box>
  );
};

export default ResetPass;