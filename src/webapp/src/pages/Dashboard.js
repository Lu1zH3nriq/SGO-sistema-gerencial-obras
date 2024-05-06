import React, { useContext } from 'react';
import { useUIContextController } from '../context/index.js';

const Dashboard = () => {
    const [state] = useUIContextController();
    const { userType } = state;

    return (
        <div>
            <h1>User Type: {userType}</h1>
        </div>
    );
};

export default Dashboard;