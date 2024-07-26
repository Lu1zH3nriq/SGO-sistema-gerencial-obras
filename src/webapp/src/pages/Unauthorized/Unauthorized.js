import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useUIContextController } from '../../context/index.js';
import { RiSpam2Line } from "react-icons/ri";

const Unauthorized = () => {
    const theme = useTheme();
    const [controller] = useUIContextController();
    const { darkMode } = controller;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor={theme.palette.background.default}
            padding={2}
        >
            <RiSpam2Line size={200} color={darkMode ? "white": theme.palette.secondary.main} />

            <Typography variant="h4" color="textSecondary" style={{
                color: darkMode ? "white": theme.palette.secondary.main,
                marginTop: '1rem',
                textAlign: 'center'
            }}>
                Sem permissão para acessar esta página.
            </Typography>
        </Box>
    );
};

export default Unauthorized;
