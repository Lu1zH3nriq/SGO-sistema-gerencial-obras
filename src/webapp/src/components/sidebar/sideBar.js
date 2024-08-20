import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useUIContextController } from '../../context/index.js';

import { FaChartPie, FaRegBuilding, FaWrench, FaUser, FaUsers, FaAddressCard, FaPaintRoller } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { PiShovelFill } from "react-icons/pi";



const SideBar = ({ trocaRotas }) => {
    const [controller] = useUIContextController();
    const { userType } = controller;

    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
        trocaRotas(menuOptions[index].route);
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
                    width: '16%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '17%',
                        boxSizing: 'border-box',
                        backgroundColor: '#171719',
                        color: 'white',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <List style={{ padding: '2vh' }}>
                    {menuOptions.map((option, index) => (
                        <ListItem key={option.route} style={{ padding: '0.2vh' }}>
                            <ListItemButton
                                onClick={() => handleButtonClick(index)}
                                style={{ backgroundColor: selectedButton === index ? '#358FED' : '#171719', borderRadius: '10px', padding: '2vh' }}
                            >
                                <ListItemIcon style={{ color: "white" }}>
                                    {option.icon}
                                </ListItemIcon>
                                <ListItemText primary={option.route} style={{ color: "white" }}
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