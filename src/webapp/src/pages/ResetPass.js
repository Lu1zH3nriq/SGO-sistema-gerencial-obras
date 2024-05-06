import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Card, CardHeader, CardContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImageLogin from '../assets/images/bgImageLogin.jpg';

import { useUIContextController } from '../context/index.js';
import FooterLogin from 'components/footer/footerLogin';

const ResetPass = () => {
    const [controller] = useUIContextController();
    const { darkMode } = controller;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Enviar email e senha para redefinir a senha
        console.log("Email:", email);
        console.log("Nova Senha:", password);
        // Fazer a solicitação de redefinição de senha aqui
    }

    return (
        <Box sx={{
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
        }}>
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
                                        label="Nova Senha"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Digite sua nova senha"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color={darkMode ? "primary" : "secondary"}
                                        fullWidth
                                        style={{ color: 'white', marginTop: 20 }}
                                    >
                                        Redefinir Senha
                                    </Button>
                                    <Link
                                        to="/authentication/login"
                                        style={{
                                            cursor: "pointer",
                                            color: darkMode ? "white" : '#344767',
                                            fontFamily: "Arial, sans-serif",
                                            marginTop: 10,
                                            display: "flex",
                                            justifyContent: "center"
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
            <FooterLogin />
        </Box>
    );
};

export default ResetPass;
