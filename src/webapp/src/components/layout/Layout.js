import React, { useState } from 'react';
import Header from '../header/header.js';
import SideBar from "../sidebar/sideBar.js";
import { Container } from 'reactstrap';

const Layout = ({ children }) => {
    const [rotaAtual, setRotaAtual] = useState('Dashboard');

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <SideBar 
                trocaRotas={(rota) => setRotaAtual(rota)}
            />
            <div style={{ flexGrow: 1 }}>
                <Header rotaAtual={rotaAtual} />
                <div style={{ 
                    overflow: 'auto', 
                    height: 'calc(100vh - 10vh)', 
                    maxWidth: 'calc(100vw - 15vw)',
                }}>
                    <Container fluid>
                        {children}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Layout;
