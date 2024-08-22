import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LoginPage from "../../pages/Login/Login.js";
import Dashboard from "../../pages/Dashboard/Dashboard.js";
import Obras from "../../pages/Obras/Obras.js";
import Funcionarios from "../../pages/Funcionarios/Funcionarios.js";
import Clientes from "../../pages/Clientes/Clientes.js";
import Equipamentos from "../../pages/Equipamentos/Equipamentos.js";
import Perfil from "../../pages/Perfil/Perfil.js";
import Materiais from "pages/Materiais/Materiais.js";
import Usuarios from "pages/Usuarios/Usuarios.js";



import Unauthorized from "../../pages/Unauthorized/Unauthorized.js";

import {
  useUIContextController,
  setUserType,
  setUserLogin,
  setUserToken,
  setUserName,
  setUserId,
} from "../../context/index.js";

const Authenticator = () => {
  const navigate = useNavigate();
  const [controller, dispatch] = useUIContextController();
  const { userLogin } = controller;
  const setUserDetails = () => {
    setUserLogin(dispatch, true);
    setUserType(dispatch, parseInt(sessionStorage.getItem("userType")));
    setUserToken(dispatch, sessionStorage.getItem("userToken"));
    setUserName(dispatch, sessionStorage.getItem("userName"));
    setUserId(dispatch, sessionStorage.getItem("userId"));
  };

  useEffect(() => {
    console.log("entrou aqui");
    const userLogin = sessionStorage.getItem("userLogin") === "true";
    if (userLogin) {
      console.log("userLogado: ", userLogin);
      setUserDetails();
      navigate("/dashboard");
    } else {
      console.log("userLogado: ", userLogin);
      navigate("/authentication/login");
    }
  }, []);

  useEffect(() => {
    const userLogin = sessionStorage.getItem("userLogin") === "true";
    if (userLogin) {
      setUserDetails();
    }
  }, [dispatch]);

  const handleLogin = (user) => {
    if (
      !user ||
      !user.userType ||
      !user.userToken ||
      !user.userName ||
      !user.userId
    ) {
      console.error("Dados do usuário incompletos:", user);
      return;
    }

    setUserType(dispatch, user.userType);
    setUserLogin(dispatch, true);
    setUserToken(dispatch, user.userToken);
    setUserName(dispatch, user.userName);
    setUserId(dispatch, user.userId);

    console.log("User Logado: ", user);

    sessionStorage.setItem("userLogin", "true");
    sessionStorage.setItem("userType", user.userType.toString());
    sessionStorage.setItem("userToken", user.userToken);
    sessionStorage.setItem("userName", user.userName);
    sessionStorage.setItem("userId", user.userId);

    navigate("/dashboard");
  };

  return (
    <div>
      {!userLogin ? (
        <Routes>
          <Route path="*" element={<Navigate to={"/authentication/login"} />} />
          <Route
            path="/authentication/login"
            element={
              <LoginPage
                onLogin={(user) => {
                  handleLogin(user);
                }}
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={"/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      )}
    </div>
  );
};

export default Authenticator;
