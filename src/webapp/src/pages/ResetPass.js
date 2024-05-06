import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Card, CardHeader, CardContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImageLogin from '../assets/images/bgImageLogin.jpg';

import { useUIContextController } from '../context/index.js';
import FooterLogin from 'components/footer/footerLogin';
import { Spinner } from 'reactstrap';

const ResetPass = () => {
    const [controller] = useUIContextController();
    const { darkMode } = controller;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [hidenPassword, setHidenPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [findedUser, setFindedUser] = useState(false);
    const [complete, setComplete] = useState({
        status: false,
        message: '',
    });

    const handleResetPassword = (e) => {
        setLoading(true);
        e.preventDefault();
        //fazer a busca do email no banco de dados
        //se encontrar o email, setar findedUser como true
        if (!findedUser) {
            setFindedUser(true);
            setTimeout(() => {
                setLoading(false);
                setHidenPassword(false);
            }, 1000);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setComplete({
                    status: true,
                    message: 'Senha redefinida com sucesso!'
                });
            }, 1000);
        }
    }

    return (
        <Box sx={{
            height: "100vh",
            maxWidth: "100%",
            backgroundColor: darkMode ? "gray" : "#C5C5C5",
        }}>
            <Box sx={{
                height: "50vh",
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
                borderRadius: "0 0 20px 20px",
                backgroundColor: darkMode ? "#000" : "#fff",
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
                                        <label style={{ color: darkMode ? "white" : "#344767" }}>Digite o endereço de email do usuário:</label>
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
                                            />)}

                                        {complete.status ? 
                                            <label style={{ color: darkMode ? "white" : "#344767" }}>{complete.message}</label>
                                         : null}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color={darkMode ? "primary" : "secondary"}
                                            fullWidth
                                            style={{ color: 'white', marginTop: 20 }}
                                        >
                                            {hidenPassword && !loading ? "Buscar" : (
                                                hidenPassword || loading ? <Spinner color="light" /> : "Redefinir"
                                            )}
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
                <FooterLogin color={darkMode ? "white" : '#344767'} />
            </Box>
        </Box>
    );
};

export default ResetPass;
