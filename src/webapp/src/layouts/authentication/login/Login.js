import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useMaterialUIController, setUserType } from "context";

function Basic() {
  const [controller, dispatch] = useMaterialUIController();
  const { userType } = controller;
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleShowPass = () => setShowPass(!showPass);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const handleLogin = async () => {
    // // Verifica se o email e a senha foram preenchidos
    // if (email && pass) {
    //   // Redireciona para a rota "/dashboard"
    //   setRedirectToDashboard(true);
    //   setUserType(dispatch, "Admin");
    // } else {
    //   // Mostra uma mensagem de erro ou lógica adicional, se necessário
    //   console.log("Por favor, preencha o email e a senha.");
    // }

    await setUserType(dispatch, "Comum");
    setRedirectToDashboard(true);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SGO - Sistema de Gestão de Obras
          </MDTypography>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Entrar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={handleEmail} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Senha" fullWidth value={pass} onChange={handlePass} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={showPass} onChange={handleShowPass} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleShowPass}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Mostrar senha
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Esqueceu sua senha?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Redefinir
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {redirectToDashboard && <Navigate to="/dashboard" />}
    </BasicLayout>
  );
}

export default Basic;
