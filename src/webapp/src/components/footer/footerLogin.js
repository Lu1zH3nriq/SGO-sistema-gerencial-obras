import React from "react";
import { Box } from "@mui/system";

const FooterLogin = () => {

    const currentYear = new Date().getFullYear();
    const copyrightSymbol = String.fromCharCode(169);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                    fontFamily: "Arial, sans-serif",
                    marginTop: -7.5,
                }}
            >
                <p style={{ color: 'white' }}>{copyrightSymbol} {currentYear} | SGO - Sistema de Gestão de Obras</p>
            </Box>
        </Box>
    );
};

export default FooterLogin;
