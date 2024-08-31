import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LoginPage from "../../pages/Login/Login.js";
import ResetPass from "pages/Login/ResetPass.js";
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
    //sincroniza o context com os dados do sessionStorage
    setUserLogin(dispatch, true);
    setUserType(dispatch, parseInt(sessionStorage.getItem("userType")));
    setUserToken(dispatch, sessionStorage.getItem("userToken"));
    setUserName(dispatch, sessionStorage.getItem("userName"));
    setUserId(dispatch, sessionStorage.getItem("userId"));
  };

  useEffect(() => {
    const userLogin = sessionStorage.getItem("userLogin") === "true";
    const currentPath = window.location.pathname;

    // Verifica se o usuário está logado
    if (userLogin) {
      setUserDetails();
      // Redireciona para o dashboard se não estiver em uma rota válida
      if (currentPath === "/" || currentPath === "/authentication/login") {
        navigate("/dashboard");
      }
    } else {
      // Se o usuário não estiver logado, redireciona para a página de login
      navigate("/authentication/login");
    }
  }, []); 

  const handleLogin = (data) => {
    if (
      !data ||
      !data.user.nivelUsuario ||
      !data.token ||
      !data.user.nome ||
      !data.user.id
    ) {
      console.error("Dados do usuário incompletos:", data);
      return;
    }

    // Define os detalhes do usuário e salva no context
    setUserLogin(dispatch, true);
    setUserType(dispatch, parseInt(data.user.nivelUsuario));
    setUserToken(dispatch, data.token);
    setUserName(dispatch, data.user.nome);
    setUserId(dispatch, data.user.id);

    // Define os detalhes do usuário e salva no sessionStorage
    sessionStorage.setItem("userLogin", "true");
    sessionStorage.setItem("userType", data.user.nivelUsuario);
    sessionStorage.setItem("userToken", data.token);
    sessionStorage.setItem("userName", data.user.nome);
    sessionStorage.setItem("userId", data.user.id);

    navigate("/dashboard");
  };

  return (
    <div>
      {!userLogin ? (
        <Routes>
          <Route path="/" element={<Navigate to={"/authentication/login"} />} />
          <Route path="/resetSenha" element={<ResetPass />} />
          <Route
            path="/authentication/login"
            element={
              <LoginPage
                onLogin={(data) => {
                  handleLogin(data);
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
          <Route path="/resetSenha" element={<ResetPass />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      )}
    </div>
  );
};

export default Authenticator;
