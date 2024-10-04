import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import CssBaseline from "@mui/material/CssBaseline";
import { FaSun, FaMoon, FaToggleOff, FaToggleOn, FaUser } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import LogoutModal from 'components/logout/LogoutModal.js';
import { useUIContextController, setDarkMode } from '../../context/index.js';

const Header = ({ rotaAtual }) => {
  let navigate = useNavigate();
  const [controller, dispatch] = useUIContextController();
  const { darkMode } = controller;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleAlterTheme = () => {
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <div>
      <Navbar
        expand="md"
        style={{
          height: '10vh',
          width: '100%',
          backgroundColor: darkMode ? '#414141' : '#D9D9D6',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CssBaseline />
        <NavbarBrand 
          href="/" 
          style={{ 
            marginLeft: '1rem', 
            fontSize: '1.2rem', 
            color: darkMode ? '#EFF2F7' : '#343A40',
            flex: 1,
          }}
        >
          {rotaAtual}
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <NavItem>
              <NavLink
                style={{ 
                  cursor: 'pointer', 
                  marginRight: '1rem', 
                  color: darkMode ? '#EFF2F7' : '#343A40' 
                }}
                onClick={handleAlterTheme}
                title="Alterar tema"
              >
                {darkMode ? (
                  <>
                    <FaToggleOn size={20} /> <FaSun size={20} />
                  </>
                ) : (
                  <>
                    <FaToggleOff size={20} /> <FaMoon size={20} />
                  </>
                )}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ 
                  cursor: 'pointer', 
                  marginRight: '1rem', 
                  color: darkMode ? '#EFF2F7' : '#343A40' 
                }}
                onClick={() => navigate('/perfil')}
              >
                <FaUser size={20} title="Perfil" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ 
                  cursor: 'pointer', 
                  color: darkMode ? '#EFF2F7' : '#343A40' 
                }}
                onClick={() => setShowLogoutModal(true)}
              >
                <CiLogout size={20} title="Sair" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      {showLogoutModal && (
        <LogoutModal
          visible={showLogoutModal}
          setVisible={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default Header;