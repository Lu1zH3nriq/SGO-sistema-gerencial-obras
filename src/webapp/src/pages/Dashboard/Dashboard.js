import React, { useState } from 'react';
import { useUIContextController } from '../../context/index.js';

import Header from 'components/header/header.js';
import SideBar from 'components/sidebar/sideBar.js';
import { Container, Row, Col } from 'reactstrap';

const Dashboard = () => {
    const [state] = useUIContextController();
    const { userType, userId, userName } = state;
    const [rotaSelecionada, setRotaSelecionada] = useState('Dashboard');

    const _userType = {
        Admin: 1,
        Comum: 2,
    }

    return (
        <>
            <Header
                rotaAtual={rotaSelecionada}
            />
            <SideBar
                trocaRotas={(rota) => setRotaSelecionada(rota)}
            />

            <Container fluid className="position-relative" style={{ height: '100vh' }}>
                <div className="position-absolute top-20 start-140 d-flex" style={{ width: '100%', height: '100%' }}>
                    <div className="text-center">
                        <h2>Usuário: {userName}</h2>
                        <h2>Email: {userId}</h2>
                        <h2>Permissão: {[_userType[userType]]} </h2>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Dashboard;