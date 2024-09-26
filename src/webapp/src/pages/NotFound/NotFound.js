import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import { useUIContextController } from '../../context/index.js';
import { RiComputerLine, RiErrorWarningLine  } from "react-icons/ri";

const NotFound = () => {
    const theme = useTheme();
    const [controller] = useUIContextController();
    const { darkMode } = controller;

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
                height: "100vh",
                backgroundColor: theme.palette.background.default
            }}
        >
            <Grid item>
                <RiComputerLine size={200} color={darkMode ? "white" : theme.palette.secondary.main} />
            </Grid>

            <Grid item style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1
            }}>
                <RiErrorWarningLine
                    size={60}
                    color={darkMode ? "white" : theme.palette.secondary.main}
                />
            </Grid>
            
            <Grid item>
                <Typography variant="h4" color="textSecondary" style={{
                    color: darkMode ? "white" : theme.palette.secondary.main
                }}>
                    Página não encontrada
                </Typography>
            </Grid>
        </Grid>
    );
};

export default NotFound;
