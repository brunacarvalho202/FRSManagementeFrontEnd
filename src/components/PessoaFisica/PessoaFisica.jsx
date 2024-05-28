import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PessoaFisica.css';
import { getClientesFisicos, saveClienteFisico, updateClienteFisico, deleteClienteFisico } from '../../Services/ClientFisicoServices';

const PessoaFisica = () => {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [clienteForm, setClienteForm] = useState({ cnh: '', nome: '', procuracao: '' });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            const response = await getClientesFisicos();
            setClientes(response.data);
            setFilteredClientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredClientes(clientes);
        } else {
            setFilteredClientes(
                clientes.filter(cliente =>
                    cliente.cnh.includes(e.target.value)
                )
            );
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setClienteForm({ ...clienteForm, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateClienteFisico(clienteForm);
            } else {
                await saveClienteFisico(clienteForm);
            }
            loadClientes();
            closeModal();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
        }
    };

    const handleEdit = (cliente) => {
        setClienteForm(cliente);
        setIsEditMode(true);
        openModal();
    };

    const handleDelete = async (cnh) => {
        try {
            await deleteClienteFisico(cnh);
            loadClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    const openModal = () => {
        document.getElementById('modal-wrapper').classList.add('active');
    };

    const closeModal = () => {
        document.getElementById('modal-wrapper').classList.remove('active');
        setClienteForm({ cnh: '', nome: '', procuracao: '' });
        setIsEditMode(false);
    };

    return (
        <div className="cliente-controle">
            <Header />
            <div className="content">
                <div className="cliente-wrapper">
                    <div className="cliente-header">
                        <span>Controle de Clientes - Pessoa Física</span>
                        <div className="header-buttons">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    id="search" 
                                    className="search-input" 
                                    placeholder="Buscar por CNH" 
                                    value={searchTerm} 
                                    onChange={handleSearch} 
                                />
                            </div>
                            <button onClick={openModal} type="button" className="banner-button2" id="new">Adicionar</button>
                        </div>
                    </div>
                    <div className="cliente-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CNH</th>
                                    <th>Procuracao</th>
                                    <th className="acao">Editar</th>
                                    <th className="acao">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClientes.map((cliente) => (
                                    <tr key={cliente.cnh}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cnh}</td>
                                        <td>{cliente.procuracao}</td>
                                        <td className="acao">
                                            <button onClick={() => handleEdit(cliente)}>Editar</button>
                                        </td>
                                        <td className="acao">
                                            <button onClick={() => handleDelete(cliente.cnh)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-wrapper" id="modal-wrapper">
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="nome">Nome</label>
                                <input id="nome" name="nome" type="text" required value={clienteForm.nome} onChange={handleInputChange} />

                                <label htmlFor="cnh">CNH</label>
                                <input id="cnh" name="cnh" type="text" required value={clienteForm.cnh} onChange={handleInputChange} />

                                <label htmlFor="procuracao">Procuracao</label>
                                <input id="procuracao" name="procuracao" type="text" required value={clienteForm.procuracao} onChange={handleInputChange} />

                                <div className="modal-buttons">
                                    <button type="button" id="btn-cancelar" className="banner-button2" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" id="btn-salvar" className="banner-button2">{isEditMode ? 'Atualizar' : 'Salvar'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PessoaFisica;
