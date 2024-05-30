import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Options.css';

const Options = () => {
    return (
        <div className="options-page">
            <Header />
            <div className="options-content">
                <div className="title">
                    ESCOLHA UMA OPÇÃO
                </div>
                <div className="option-boxes">
                    <Link to="/clientes" className="option-box">CLIENTES</Link>
                    <Link to="/funcionarios" className="option-box">FUNCIONÁRIOS</Link>
                    <Link to="/servicos" className="option-box">SERVIÇOS</Link>
                    <Link to="/veiculos" className="option-box">VEICULOS</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Options;
