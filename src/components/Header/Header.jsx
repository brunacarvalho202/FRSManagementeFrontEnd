import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo-container">
                    <div className="header-logo">FRS</div>
                    <div className="header-subtitle">SERVIÇOS E EMPLACAMENTO</div>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-button">INICIO</Link>
                    <Link to="/dashboard" className="nav-button">DASHBOARD</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
