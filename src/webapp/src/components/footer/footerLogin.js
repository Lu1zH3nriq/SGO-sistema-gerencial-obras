import React from "react";
import { Box } from "@mui/material";
const FooterLogin = ({ color }) => {

    const currentYear = new Date().getFullYear();
    const copyrightSymbol = String.fromCharCode(169);
    const colorFooter = color || 'white';

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <p style={{ color: colorFooter }}>{copyrightSymbol} {currentYear} | SGO - Sistema de Gestão de Obras</p>
        </Box>
    );
};

export default FooterLogin;
