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

import EquipamentosComum from "pages/EquipamentosComum/EquipamentosComum.js";
import ObrasComum from "../../pages/ObrasComum/ObraComum.js";

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
  const { userLogin, userType } = controller;

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
        navigate(userType === 1 ? "/dashboard" : "/resumo");
      }
    } else {
      // Se o usuário não estiver logado, redireciona para a página de login
      navigate("/authentication/login");
    }
  }, [userType]);

  const handleLogin = (data) => {
    if (
      !data ||
      !data.user.nivelUsuario ||
      !data.token ||
      !data.user.nome ||
      !data.user.email
    ) {
      console.error("Dados do usuário incompletos:", data);
      return;
    }

    // Define os detalhes do usuário e salva no context
    setUserLogin(dispatch, true);
    setUserType(dispatch, parseInt(data.user.nivelUsuario));
    setUserToken(dispatch, data.token);
    setUserName(dispatch, data.user.nome);
    setUserId(dispatch, data.user.email);

    // Define os detalhes do usuário e salva no sessionStorage
    sessionStorage.setItem("userLogin", "true");
    sessionStorage.setItem("userType", data.user.nivelUsuario);
    sessionStorage.setItem("userToken", data.token);
    sessionStorage.setItem("userName", data.user.nome);
    sessionStorage.setItem("userId", data.user.email);

    if (data.user.nivelUsuario === 1) {
      navigate("/dashboard");
    } else {
      navigate("/resumo");
    }
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
          <Route
            path="/"
            element={
              userType !== undefined ? (
                <Navigate to={userType === 1 ? "/dashboard" : "/resumo"} />
              ) : null
            }
          />
          <Route
            path="/dashboard"
            element={
              userType === 1 ? <Dashboard /> : <Navigate to={"/unauthorized"} />
            }
          />
          <Route path="/resumo" element={<Dashboard />} />
          <Route
            path="/obras"
            element={userType === 1 ? <Obras /> : <ObrasComum />}
          />
          <Route
            path="/funcionarios"
            element={
              userType === 1 ? (
                <Funcionarios />
              ) : (
                <Navigate to={"/unauthorized"} />
              )
            }
          />
          <Route
            path="/clientes"
            element={
              userType === 1 ? <Clientes /> : <Navigate to={"/unauthorized"} />
            }
          />
          <Route
            path="/equipamentos"
            element={userType === 1 ? <Equipamentos /> : <EquipamentosComum />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/materiais"
            element={
              userType === 1 ? <Materiais /> : <Navigate to={"/unauthorized"} />
            }
          />
          <Route
            path="/usuarios"
            element={
              userType === 1 ? <Usuarios /> : <Navigate to={"/unauthorized"} />
            }
          />
          <Route
            path="/obra/:id"
            element={
              userType === 1 ? <Usuarios /> : <Navigate to={"/unauthorized"} />
            }
          />
          <Route path="/resetSenha" element={<ResetPass />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      )}
    </div>
  );
};

export default Authenticator;
