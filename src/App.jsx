import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import Management from './components/Management/Management';
import Options from './components/Options/Options';
import Clientes from './components/Clients/Clients';
import PessoaFisica from './components/PessoaFisica/PessoaFisica';
import PessoaJuridica from './components/PessoaJuridica/PessoaJuridica';
import GeralServices from './components/GeralServices/GeralServices';
import ChartPage from './components/ChartPage/ChartPage';
import UserProfile from './components/UserProfile/UserProfile';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <Banner />
                            <Footer />
                        </>
                    } />
                    <Route path="/opcoes" element={<Options />} />
                    <Route path="/funcionarios" element={
                        <>
                            <Header />
                            <Management />
                            <Footer />
                        </>
                    } />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/clientes/pessoa-fisica" element={
                        <>
                            <Header />
                            <PessoaFisica />
                            <Footer />
                        </>
                    } />
                    <Route path="/clientes/pessoa-juridica" element={
                        <>
                            <Header />
                            <PessoaJuridica />
                            <Footer />
                        </>
                    } />
                    <Route path="/servicos" element={
                        <>
                            <Header />
                            <GeralServices />
                            <Footer />
                        </>
                    } />
                    <Route path="/grafico" element={
                        <>
                            <Header />
                            <ChartPage />
                            <Footer />
                        </>
                    } />
                    <Route path="/perfil/:cpf" element={
                        <>
                            <UserProfile />
                            <Footer />
                        </>
                    } />
                    <Route path="/dashboard" element={
                        <>
                            <Header />
                            <Dashboard />
                            <Footer />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
