import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Card, CardHeader, CardContent, Box, Switch } from '@mui/material';
import bgImageLogin from '../assets/images/bgImageLogin.jpg';

import { useUIContextController } from '../context/index.js';

const Login = () => {
    const [controller] = useUIContextController();
    const { darkMode } = controller;
    const [showPassword, setShowPassword] = useState(false);

    const alterShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <Box
            sx={{
                height: "100vh",
                maxWidth: "100%",
                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
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
                            title="SGO - Sistema de Gestão de Obras"
                            sx={{
                                textAlign: "center",
                            }}
                        />
                        <CardContent>
                            <div
                                style={{
                                    textAlign: "center",
                                    color: darkMode ? "white" : '#344767',
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "bold",
                                    marginTop: -15,
                                }}>
                                <p>Bem vindo de volta!</p>
                            </div>
                            <form onSubmit={() => { }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Digite seu email"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Senha"
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    required
                                />
                                <Switch
                                    checked={showPassword}
                                    onChange={() => alterShowPassword()}
                                />
                                <label style={{
                                    cursor: "pointer",
                                    color: darkMode ? "white" : '#344767',
                                    fontFamily: "Arial, sans-serif",
                                }}>&nbsp;Exibir senha</label>
                                <Button
                                    variant="contained"
                                    color={darkMode ? "primary" : "secondary"}
                                    fullWidth
                                    style={{ color: 'white', marginTop: 20 }}
                                >
                                    Entrar
                                </Button>
                                <label style={{
                                    cursor: "pointer",
                                    color: darkMode ? "white" : '#344767',
                                    fontFamily: "Arial, sans-serif",
                                    marginTop: 10,
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                                onClick={() => { }}
                                >&nbsp;Redefinir senha</label>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10vh",
                        color: 'white',
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        marginTop: -7.5,
                    }}
                >
                    <p>SGO - Sistema de Gestão de Obras</p>
                </Box>
            </Box>
        </Box>
        
    );
};

export default Login;