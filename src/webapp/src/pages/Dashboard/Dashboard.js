import React from 'react';
import { useUIContextController } from '../../context/index.js';

import Header from 'components/header/header.js';
import SideBar from 'components/sidebar/sideBar.js';
import Box from '@mui/material/Box'; // Import the missing component 'Box'
import Toolbar from '@mui/material/Toolbar'; // Import the missing component 'Toolbar'
import Typography from '@mui/material/Typography'; // Import the missing component 'Typography'

const Dashboard = () => {
    const [state] = useUIContextController();
    const { userType } = state;

    return (
        <>
            <Header />
            <SideBar />
            
        </>
    );
};

export default Dashboard;