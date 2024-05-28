import React, { useEffect, useState } from 'react';
import './GeralServices.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import search from '../../assets/search-button.svg';
import { getServicos, saveServico, updateServico, deleteServico } from '../../Services/ServicoService';

const GeralServices = () => {
    const [servicos, setServicos] = useState([]);
    const [filteredServicos, setFilteredServicos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        codigo_servico: '',
        descricao: '',
        valor: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchServicos();
    }, []);

    const fetchServicos = async () => {
        try {
            const response = await getServicos();
            setServicos(response.data);
            setFilteredServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredServicos(servicos);
        } else {
            setFilteredServicos(
                servicos.filter(servico =>
                    servico.codigo_servico.toString().includes(e.target.value)
                )
            );
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedForm = {
                ...form,
                valor: parseFloat(form.valor.replace(',', '.')) // Corrigindo o formato do valor
            };

            if (isEditing) {
                await updateServico(formattedForm);
            } else {
                await saveServico(formattedForm);
            }
            fetchServicos();
            closeModal();
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao salvar serviço:', error);
        }
    };

    const handleDelete = async (codigo_servico) => {
        try {
            await deleteServico(codigo_servico);
            fetchServicos();
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
        }
    };

    const openModal = () => {
        document.getElementById('modal-wrapper').classList.add('active');
    };

    const closeModal = () => {
        document.getElementById('modal-wrapper').classList.remove('active');
        setForm({
            codigo_servico: '',
            descricao: '',
            valor: ''
        });
    };

    const openEditModal = (servico) => {
        setForm(servico);
        setIsEditing(true);
        openModal();
    };

    return (
        <div className="service-management">
            <Header />
            <div className="content">
                <div className="service-wrapper">
                    <div className="service-header">
                        <span>Controle de Serviços</span>
                        <div className="header-buttons">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    id="search" 
                                    className="search-input" 
                                    placeholder="Buscar por Código do Serviço" 
                                    value={searchTerm} 
                                    onChange={handleSearch} 
                                />
                                <div className="search-icon">
                                    <img src={search} alt="Search Icon" />
                                </div>
                            </div>
                            <button onClick={() => openModal()} type="button" className="banner-button2" id="BTN-new">ADICIONAR</button>
                        </div>
                    </div>

                    <div className="service-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código do Serviço</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th className="acao">Editar</th>
                                    <th className="acao">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServicos.map((servico) => (
                                    <tr key={servico.codigo_servico}>
                                        <td>{servico.codigo_servico}</td>
                                        <td>{servico.descricao}</td>
                                        <td>{servico.valor}</td>
                                        <td className="acao">
                                            <button onClick={() => openEditModal(servico)}>Editar</button>
                                        </td>
                                        <td className="acao">
                                            <button onClick={() => handleDelete(servico.codigo_servico)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-wrapper" id="modal-wrapper">
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="codigo_servico">Código do Serviço</label>
                                <input id="codigo_servico" type="text" value={form.codigo_servico} onChange={handleInputChange} required />

                                <label htmlFor="descricao">Descrição</label>
                                <input id="descricao" type="text" value={form.descricao} onChange={handleInputChange} required />

                                <label htmlFor="valor">Valor</label>
                                <input id="valor" type="text" value={form.valor} onChange={handleInputChange} required />

                                <div className="modal-buttons">
                                    <button type="button" className="banner-button2" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="banner-button2">{isEditing ? 'Atualizar' : 'Salvar'}</button>
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

export default GeralServices;
