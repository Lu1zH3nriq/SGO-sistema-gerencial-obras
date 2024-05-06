import React from 'react';
import { useUIContextController } from '../../context/index.js';

import Header from 'components/header/header.js';

const Dashboard = () => {
    const [state] = useUIContextController();
    const { userType } = state;

    return (
        <>
            <Header />
        </>
    );
};

export default Dashboard;