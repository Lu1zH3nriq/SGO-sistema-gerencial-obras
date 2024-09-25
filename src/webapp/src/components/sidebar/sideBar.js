import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChartPie, FaRegBuilding, FaWrench, FaUser, FaUsers, FaAddressCard, FaPaintRoller } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { PiShovelFill } from "react-icons/pi";
import { useUIContextController } from '../../context/index.js';

import LogoutModal from "components/logout/LogoutModal.js";

const drawerWidth = "15vw"; // Largura fixa da sidebar

const SideBar = ({ trocaRotas }) => {
    const [controller] = useUIContextController();
    const { darkMode, userType } = controller;
    const [selectedButton, setSelectedButton] = useState(null);
    const [isFirstMount, setIsFirstMount] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuOptionsAdmin = [
        { route: 'Dashboard', icon: <FaChartPie /> },
        { route: 'Obras', icon: <FaRegBuilding /> },
        { route: 'Funcionarios', icon: <FaPaintRoller /> },
        { route: 'Clientes', icon: <FaAddressCard /> },
        { route: 'Materiais', icon: <PiShovelFill /> },
        { route: 'Equipamentos', icon: <FaWrench /> },
        { route: 'Perfil', icon: <FaUser /> },
        { route: 'Usuarios', icon: <FaUsers /> },
        { route: 'Sair', icon: <CiLogout /> }
    ];

    const menuOptionsComum = [
        { route: 'Resumo', icon: <FaChartPie /> },
        { route: 'Obras', icon: <FaRegBuilding /> },
        { route: 'Equipamentos', icon: <FaWrench /> },
        { route: 'Perfil', icon: <FaUser /> },
        { route: 'Sair', icon: <CiLogout /> }
    ];

    const menuOptions = userType === 1 ? menuOptionsAdmin : menuOptionsComum;

    useEffect(() => {
        if (isFirstMount) {
            setSelectedButton(0);
            trocaRotas(menuOptions[0].route);
            setIsFirstMount(false);
        } else {
            const currentRoute = location.pathname.split('/')[1];
            const index = menuOptions.findIndex(option => option.route.toLowerCase() === currentRoute.toLowerCase());
            if (index !== -1) {
                setSelectedButton(index);
                trocaRotas(menuOptions[index].route);
            }
        }
    }, [location.pathname, trocaRotas, isFirstMount]);

    const handleButtonClick = (index) => {
        const selectedRoute = menuOptions[index].route;
        if (selectedRoute === 'Sair') {
            setShowLogoutModal(true);
        } else {
            setSelectedButton(index);
            trocaRotas(selectedRoute);
            navigate(`/${selectedRoute.toLowerCase()}`);
        }
    };

    return (
        <Box>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        borderRadius: 0,
                        backgroundColor: darkMode ? '#525252' : '#BABBBB',
                        height: '100vh',
                        marginTop: '0px',
                        marginLeft: '0px',
                        width: drawerWidth,
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <List style={{ marginTop: '5vh' }}>
                    {menuOptions.map((option, index) => (
                        <ListItem key={option.route} style={{ padding: '0.2vh' }}>
                            <ListItemButton
                                onClick={() => handleButtonClick(index)}
                                sx={{
                                    backgroundColor: selectedButton === index
                                        ? (darkMode ? '#414141' : '#FFFFFF') : (darkMode ? '#525252' : '#BABBBB'),
                                    padding: { xs: '1vh', sm: '2vh' },
                                    '&:hover': {
                                        backgroundColor: selectedButton === index
                                            ? (darkMode ? '#414141' : '#FFFFFF') : (darkMode ? '#525252' : '#BABBBB'),
                                    },
                                    '& .MuiListItemText-primary': {
                                        fontSize: { xs: '12px', sm: '15px' },
                                        fontWeight: 'semi-bold'
                                    }
                                }}
                            >
                                <ListItemIcon style={{ color: darkMode ? '#EFF2F7' : "#343A40" }}>
                                    {option.icon}
                                </ListItemIcon>
                                <ListItemText primary={option.route} style={{ color: darkMode ? '#EFF2F7' : "#343A40" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            {showLogoutModal && <LogoutModal visible={showLogoutModal} setVisible={()=>{setShowLogoutModal(false)}}/>}
        </Box>
    );
};

export default SideBar;