import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from '../../pages/Login/Login.js';
import Dashboard from '../../pages/Dashboard/Dashboard.js';
import Unauthorized from '../../pages/Unauthorized/Unauthorized.js';



const Authenticator = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [_user, setUser] = useState({
        userType: 0,
        token: ''
    });

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setToken(user.token);
        setUser(user);
        console.log("User Logado: ", user);
        navigate(user.userType === 1 ? '/dashboard' : '/unauthorized');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken('');
        setUser(null);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <Routes>
                    <Route path='*' element={<Navigate to={'/authentication/login'} />} />
                    <Route path='/authentication/login' element={<LoginPage onLogin={(user) => { handleLogin(user) }} />} />
                </Routes>
            ) : (

                <Routes>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/unauthorized' element={<Unauthorized />} />
                </Routes>
            )}

        </div>
    );
};

export default Authenticator;