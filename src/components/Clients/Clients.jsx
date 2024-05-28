import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Clients.css';

const Clients = () => {
    return (
        <div className="clients-page">
            <Header />
            <div className="clients-content">
                <div className="title">
                    ESCOLHA UMA OPÇÃO
                </div>
                <div className="option-boxes">
                    <Link to="/clientes/pessoa-fisica" className="option-box">Pessoa Física</Link>
                    <Link to="/clientes/pessoa-juridica" className="option-box">Pessoa Jurídica</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Clients;
