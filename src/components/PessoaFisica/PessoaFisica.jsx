import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PessoaFisica.css';
import { getClientesFisicos, saveClienteFisico, deleteClienteFisico, updateClienteFisico } from '../../Services/ClientFisicoServices';

const PessoaFisica = () => {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [clienteForm, setClienteForm] = useState({ cnh: '', nome: '', procuracao: null });
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setClienteForm({ ...clienteForm, procuracao: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('CNH', clienteForm.cnh);
            formData.append('nome', clienteForm.nome);
            if (clienteForm.procuracao) {
                formData.append('procuracao', clienteForm.procuracao);
            }

            if (isEditMode) {
                await updateClienteFisico(formData);
            } else {
                await saveClienteFisico(formData);
            }

            loadClientes();
            closeModal();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error.response ? error.response.data : error);
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
        setClienteForm({ cnh: '', nome: '', procuracao: null });
        setIsEditMode(false);
    };

    const handleViewProcuracao = (procuracao, type) => {
        const fileUrl = `data:${type};base64,${procuracao}`;
        const newWindow = window.open();
        newWindow.document.write(`<img src="${fileUrl}" alt="Procuracao" />`);
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
                                        <td>
                                            {cliente.procuracao ? (
                                                <button onClick={() => handleViewProcuracao(cliente.procuracao, 'image/png')}>Ver</button>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
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
                                <input id="procuracao" name="procuracao" type="file" accept="image/*" onChange={handleFileChange} />

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
