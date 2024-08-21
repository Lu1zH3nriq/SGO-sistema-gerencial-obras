import React, { useState } from 'react';
import { useUIContextController } from '../../context/index.js';

import Header from 'components/header/header.js';
import SideBar from 'components/sidebar/sideBar.js';

import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import { Container } from 'reactstrap';

const Obras = () => {
    const [state] = useUIContextController();
    const { userId, userName } = state;
    const [rotaSelecionada, setRotaSelecionada] = useState('Dashboard'); 

    return (
        <>
            <Header
                rotaAtual={rotaSelecionada}
            />
            <SideBar
                trocaRotas={(rota) => setRotaSelecionada(rota)}
            />
            <Container fluid style={{ paddingTop: 10}}>
                <Box sx={{}}>
                    <Box sx={{ marginTop: '10vh', marginLeft: '18vw', padding: '16px', borderRadius: '10px' }}>
                        <Typography variant="h6" align="start">asdaskdjalskdjlaskdjlask</Typography>
                        <Typography variant="subtitle1" align="end">{userId}</Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Obras;