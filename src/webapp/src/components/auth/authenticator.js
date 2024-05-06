import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUIContextController, setUserType } from '../../context/index.js';

const Authenticator = ({ user }) => {
    const [controller, dispatch] = useUIContextController();
    const { userType } = controller;


    useEffect(() => {
        setUserType(dispatch, user.userType);
    }, [dispatch, user.userType]);

    return <Navigate to={`/${user.userType}/dashboard`} />;
};

export default Authenticator;