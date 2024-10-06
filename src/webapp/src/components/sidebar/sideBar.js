import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaRegBuilding,
  FaWrench,
  FaUser,
  FaUsers,
  FaAddressCard,
  FaPaintRoller,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { PiShovelFill } from "react-icons/pi";
import { useUIContextController } from "../../context/index.js";
import LogoutModal from "components/logout/LogoutModal.js";

const SideBar = ({ trocaRotas }) => {
  const [controller] = useUIContextController();
  const { darkMode, userType } = controller;
  const [selectedButton, setSelectedButton] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuOptionsAdmin = [
    { route: "Dashboard", icon: <FaChartPie /> },
    { route: "Obras", icon: <FaRegBuilding /> },
    { route: "Funcionarios", icon: <FaPaintRoller /> },
    { route: "Clientes", icon: <FaAddressCard /> },
    { route: "Materiais", icon: <PiShovelFill /> },
    { route: "Equipamentos", icon: <FaWrench /> },
    { route: "Perfil", icon: <FaUser /> },
    { route: "Usuarios", icon: <FaUsers /> },
    { route: "Sair", icon: <CiLogout /> },
  ];

  const menuOptionsComum = [
    { route: "Resumo", icon: <FaChartPie /> },
    { route: "Obras", icon: <FaRegBuilding /> },
    { route: "Equipamentos", icon: <FaWrench /> },
    { route: "Perfil", icon: <FaUser /> },
    { route: "Sair", icon: <CiLogout /> },
  ];

  const menuOptions = userType === 1 ? menuOptionsAdmin : menuOptionsComum;

  useEffect(() => {
    if (isFirstMount) {
      setSelectedButton(0);
      trocaRotas(menuOptions[0].route);
      setIsFirstMount(false);
    } else {
      const currentRoute = location.pathname.split("/")[1];
      
      // Mantém a seleção em "Obras" se a URL começar com "/obra"
      if (location.pathname.startsWith("/obra")) {
        const obrasIndex = menuOptions.findIndex(
          (option) => option.route.toLowerCase() === "obras"
        );
        setSelectedButton(obrasIndex);
        trocaRotas(menuOptions[obrasIndex].route);
      } else {
        const index = menuOptions.findIndex(
          (option) => option.route.toLowerCase() === currentRoute.toLowerCase()
        );
        if (index !== -1) {
          setSelectedButton(index);
          trocaRotas(menuOptions[index].route);
        }
      }
    }
  }, [location.pathname, trocaRotas, isFirstMount]);

  const handleButtonClick = (index) => {
    const selectedRoute = menuOptions[index].route;
    if (selectedRoute === "Sair") {
      setShowLogoutModal(true);
    } else {
      setSelectedButton(index);
      trocaRotas(selectedRoute);
      navigate(`/${selectedRoute.toLowerCase()}`);
    }
  };

  return (
    <div
      style={{
        width: "15vw",
        height: "100vh",
        backgroundColor: darkMode ? "#525252" : "#BABBBB",
      }}
    >
      {/* Logo Text */}
      <div
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: darkMode ? "#EFF2F7" : "#343A40",
          fontWeight: "bold",
          padding: "1rem 0rem 1rem 0rem",
        }}
      >
        <div style={{ fontSize: "1.5rem", letterSpacing: "2px" }}>STRUCT</div>
        <div style={{ letterSpacing: "0.5rem", marginTop: "-10px" }}>
          ENGENHARIA
        </div>
        <hr
          style={{
            width: "80%",
            margin: "1vh auto",
            borderColor: darkMode ? "#EFF2F7" : "#343A40",
          }}
        />
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.2rem" }}>
          PROJETOS E ASSESSORIA TÉCNICA
        </div>
      </div>

      <Nav vertical style={{marginTop: '2rem'}}>
        {menuOptions.map((option, index) => (
          <NavItem key={option.route} style={{ padding: "0.2vh" }}>
            <NavLink
              onClick={() => handleButtonClick(index)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                backgroundColor:
                  selectedButton === index
                    ? darkMode
                      ? "#414141"
                      : "#FFFFFF"
                    : darkMode
                    ? "#525252"
                    : "#BABBBB",
                color: darkMode ? "#EFF2F7" : "#343A40",
                cursor: "pointer",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              <span style={{ marginRight: "10px" }}>{option.icon}</span>
              {option.route}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {showLogoutModal && (
        <LogoutModal
          visible={showLogoutModal}
          setVisible={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default SideBar;
