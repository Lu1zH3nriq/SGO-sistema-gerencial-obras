import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaRegBuilding, FaWrench, FaUser, FaUsers, FaAddressCard, FaPaintRoller } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { PiShovelFill } from "react-icons/pi";
import { useUIContextController } from '../../context/index.js';

const SideBar = ({ trocaRotas }) => {
    const [controller] = useUIContextController();
    const { darkMode, userType } = controller;
    const [selectedButton, setSelectedButton] = useState(0);
    const navigate = useNavigate();

    const handleButtonClick = (index) => {
        setSelectedButton(index);
        const selectedRoute = menuOptions[index].route;
        trocaRotas(selectedRoute);
        navigate(`/${selectedRoute.toLowerCase()}`);
    };

    const menuOptionsAdmin = [
        { route: 'Dashboard', icon: <FaChartPie /> },
        { route: 'Obras', icon: <FaRegBuilding /> },
        { route: 'Funcionários', icon: <FaPaintRoller /> },
        { route: 'Clientes', icon: <FaAddressCard /> },
        { route: 'Materiais', icon: <PiShovelFill /> },
        { route: 'Equipamentos', icon: <FaWrench /> },
        { route: 'Perfil', icon: <FaUser /> },
        { route: 'Usuários', icon: <FaUsers /> },
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
                        maxWidth: '40vw',
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
                                style={{
                                    backgroundColor: selectedButton === index
                                        ? (darkMode ? '#414141' : '#FFFFFF') : (darkMode ? '#525252' : '#BABBBB'),
                                    padding: '2vh'
                                }}
                            >
                                <ListItemIcon style={{ color: darkMode ? '#EFF2F7' : "#343A40" }}>
                                    {option.icon}
                                </ListItemIcon>
                                <ListItemText primary={option.route} style={{ color: darkMode ? '#EFF2F7' : "#343A40" }}
                                    primaryTypographyProps={{ fontSize: '15px', fontWeight: 'semi-bold' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
};

export default SideBar;