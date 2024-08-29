import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Card, CardHeader, CardContent, Box, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImageLogin from '../../assets/images/bgImageLogin.jpg';

import { useUIContextController } from '../../context/index.js';

import Footer from '../../components/footer/footerLogin.js';
import { Spinner } from 'reactstrap';

const Login = ({ onLogin }) => {
    const [controller] = useUIContextController();
    const { darkMode } = controller;
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    useEffect(() => { setShowPassword(false) }, []);

    const alterShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        setLoadingLogin(true);
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);

        // busca user no banco
        const user = { 
            userType: 1,
            userToken: 'tokenchask123',
            userName: 'Fulano de Tal',
            userId: email,
        };
        setTimeout(() => {
            onLogin(user);
            setLoadingLogin(false);
        }, 3000);
    }

    return (
        <>
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
                                title={!loadingLogin ? "SGO - Sistema de Gestão de Obras" : "Entrando..."}
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
                                    <label style={{
                                        cursor: "pointer",
                                        color: darkMode ? "white" : '#344767',
                                        fontFamily: "Arial, sans-serif",
                                    }}>&nbsp;Exibir senha</label>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color={darkMode ? "primary" : "secondary"}
                                        fullWidth
                                        style={{ color: 'white', marginTop: 20 }}
                                    >
                                        {!loadingLogin ? "Entrar" : <Spinner color="light" style={{ width: '1.5rem', height: '1.5rem' }} />}
                                    </Button>
                                    <Link
                                        to="/resetSenha"
                                        style={{
                                            cursor: "pointer",
                                            color: darkMode ? "white" : '#344767',
                                            fontFamily: "Arial, sans-serif",
                                            marginTop: 10,
                                            display: "flex",
                                            justifyContent: "center"
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
        </>
    );
};

export default Login;