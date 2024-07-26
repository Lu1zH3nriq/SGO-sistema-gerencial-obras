import React from 'react';
import { Navigate } from 'react-router-dom';

const Reloader = ({ userType }) => {
    const redirectTo = userType === 'admin' ? '/dashboard' : '/unauthorized';

    return <Navigate to={redirectTo} />;
};

export default Reloader;
