import React, { useState } from 'react';
import Header from '../header/header.js';
import SideBar from '../sidebar/sideBar.js';
import { Box } from '@mui/material';
import { Container } from 'reactstrap';

const Layout = ({ children }) => {
    const [rotaAtual, setRotaAtual] = useState('Dashboard');

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <SideBar 
                trocaRotas={(rota) => setRotaAtual(rota)}
            />
                <Header rotaAtual={rotaAtual} />
                <Box sx={{ 
                    flexGrow: 1, 
                    overflow: 'auto', 
                    height: 'calc(100vh - 8vh)', 
                    maxWidth: 'calc(100vw - 15vw)',
                }}>
                    <Container fluid>
                        {children}
                    </Container>
                </Box>
        </Box>
    );
};

export default Layout;