import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from '../../pages/Login/Login.js';
import Dashboard from '../../pages/Dashboard/Dashboard.js';
import Unauthorized from '../../pages/Unauthorized/Unauthorized.js';

import { useUIContextController, setUserType, setUserLogin, setUserToken, setUserName, setUserId } from '../../context/index.js';

const Authenticator = () => {
    let navigate = useNavigate();
    const [controller, dispatch] = useUIContextController();
    const { userLogin } = controller;

    useEffect(() => {
        console.log('entrou aqui');
        const userLogin = localStorage.getItem('userLogin') === 'true';
        if (userLogin) {
            console.log('userLogado: ', userLogin);
            navigate('/dashboard');
        } else {
            console.log('userLogado: ', userLogin);
            navigate('/authentication/login');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        const userLogin = localStorage.getItem('userLogin') === 'true';
        if (userLogin) {
            setUserLogin(dispatch, true);
        }
    }, [dispatch]);

    const handleLogin = (user) => {
        setUserType(dispatch, user.userType);
        setUserLogin(dispatch, true);
        setUserToken(dispatch, user.userToken);
        setUserName(dispatch, user.userName);
        setUserId(dispatch, user.userId);

        console.log("User Logado: ", user);

        localStorage.setItem('userLogin', 'true');

        navigate('/dashboard');
    };

    return (
        <div>
            {!userLogin ? (
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