import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PessoaJuridica.css';
import { getClientesJuridicos, saveClienteJuridico, deleteClienteJuridico, updateClienteJuridico } from '../../Services/ClientJuridicoServices';

const PessoaJuridica = () => {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [clienteForm, setClienteForm] = useState({ cnh: '', nome: '', procuracao: null, contrato_social: null });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            const response = await getClientesJuridicos();
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
        const { id, files } = e.target;
        setClienteForm({ ...clienteForm, [id]: files[0] });
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
            if (clienteForm.contrato_social) {
                formData.append('contrato_social', clienteForm.contrato_social);
            }

            if (isEditMode) {
                await updateClienteJuridico(formData);
            } else {
                await saveClienteJuridico(formData);
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
            await deleteClienteJuridico(cnh);
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
        setClienteForm({ cnh: '', nome: '', procuracao: null, contrato_social: null });
        setIsEditMode(false);
    };

    const handleViewFile = (file, type) => {
        const fileUrl = `data:${type};base64,${file}`;
        const newWindow = window.open();
        newWindow.document.write(`<iframe src="${fileUrl}" frameborder="0" style="border:0; width:100%; height:100%;" allowfullscreen></iframe>`);
    };

    return (
        <div className="cliente-controle">
            <Header />
            <div className="content">
                <div className="cliente-wrapper">
                    <div className="cliente-header">
                        <span>Controle de Clientes - Pessoa Jurídica</span>
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
                                    <th>Contrato Social</th>
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
                                                <button onClick={() => handleViewFile(cliente.procuracao, 'image/png')}>Ver</button>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td>
                                            {cliente.contrato_social ? (
                                                <button onClick={() => handleViewFile(cliente.contrato_social, 'image/png')}>Ver</button>
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
                                <input id="procuracao" name="procuracao" type="file" accept=".pdf" onChange={handleFileChange} />

                                <label htmlFor="contrato_social">Contrato Social</label>
                                <input id="contrato_social" name="contrato_social" type="file" accept=".pdf" onChange={handleFileChange} />

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

export default PessoaJuridica;
