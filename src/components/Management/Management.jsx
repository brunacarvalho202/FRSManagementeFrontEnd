import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Management.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import search from '../../assets/search-button.svg';
import { getFuncionarios, saveFuncionario, updateFuncionario, deleteFuncionario } from '../../Services/FuncionarioService';

const Management = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        nome: '',
        endereco: {
            rua: '',
            bairro: '',
            numero: ''
        },
        cpf: '',
        carteira_trabalho: '',
        telefone: [{ numero: '' }],
        supervisor_cpf: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    const fetchFuncionarios = async () => {
        try {
            const response = await getFuncionarios();
            setFuncionarios(response.data);
            setFilteredFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredFuncionarios(funcionarios);
        } else {
            setFilteredFuncionarios(
                funcionarios.filter(funcionario =>
                    funcionario.cpf.includes(e.target.value)
                )
            );
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id.startsWith('endereco-')) {
            const field = id.split('-')[1];
            setForm((prevForm) => ({
                ...prevForm,
                endereco: { ...prevForm.endereco, [field]: value }
            }));
        } else if (id.startsWith('telefone-')) {
            const index = parseInt(id.split('-')[1], 10);
            const newTelefones = form.telefone.map((t, i) => i === index ? { numero: value } : t);
            setForm((prevForm) => ({
                ...prevForm,
                telefone: newTelefones
            }));
        } else {
            setForm((prevForm) => ({ ...prevForm, [id]: value }));
        }
    };

    const addTelefoneField = () => {
        setForm((prevForm) => ({
            ...prevForm,
            telefone: [...prevForm.telefone, { numero: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedForm = {
                ...form,
                telefone: form.telefone.map(t => t.numero) // Ajuste para telefone
            };
            if (isEditing) {
                await updateFuncionario(formattedForm);
            } else {
                await saveFuncionario(formattedForm);
            }
            fetchFuncionarios();
            closeModal();
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao salvar funcionário:', error);
        }
    };

    const handleDelete = async (cpf) => {
        try {
            await deleteFuncionario(cpf);
            fetchFuncionarios();
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    const openModal = () => {
        document.getElementById('modal-wrapper').classList.add('active');
    };

    const closeModal = () => {
        document.getElementById('modal-wrapper').classList.remove('active');
        setForm({
            nome: '',
            endereco: {
                rua: '',
                bairro: '',
                numero: ''
            },
            cpf: '',
            carteira_trabalho: '',
            telefone: [{ numero: '' }],
            supervisor_cpf: ''
        });
    };

    const openEditModal = (funcionario) => {
        setForm({
            ...funcionario,
            carteira_trabalho: funcionario.carteira_trabalho || '',
            telefone: funcionario.telefones ? funcionario.telefones.map(t => ({ numero: t })) : [{ numero: '' }] // Certifique-se de mapear corretamente os telefones
        });
        setIsEditing(true);
        openModal();
    };

    return (
        <div className="employee-registration">
            <Header />
            <div className="content">
                <div className="employee-wrapper">
                    <div className="employee-header">
                        <span>Controle de Funcionários</span>
                        <div className="header-buttons">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    id="search" 
                                    className="search-input" 
                                    placeholder="Buscar por CPF" 
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

                    <div className="employee-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th className="acao">+Informações</th>
                                    <th className="acao">Editar</th>
                                    <th className="acao">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFuncionarios.map((funcionario) => (
                                    <tr key={funcionario.cpf}>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cpf}</td>
                                        <td className="acao">
                                            <Link to={`/perfil/${funcionario.cpf}`}>+Informações</Link>
                                        </td>
                                        <td className="acao">
                                            <button onClick={() => openEditModal(funcionario)}>Editar</button>
                                        </td>
                                        <td className="acao">
                                            <button onClick={() => handleDelete(funcionario.cpf)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-wrapper" id="modal-wrapper">
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                <div className="form-section">
                                    <div className="form-column">
                                        <label htmlFor="nome">Nome</label>
                                        <input id="nome" type="text" value={form.nome} onChange={handleInputChange} required />

                                        <label htmlFor="cpf">CPF</label>
                                        <input id="cpf" type="text" value={form.cpf} onChange={handleInputChange} required />

                                        <label htmlFor="carteira_trabalho">Carteira de Trabalho</label>
                                        <input id="carteira_trabalho" type="text" value={form.carteira_trabalho} onChange={handleInputChange} required />

                                        {form.telefone.map((t, index) => (
                                            <div key={index}>
                                                <label htmlFor={`telefone-${index}`}>Telefone</label>
                                                <input
                                                    id={`telefone-${index}`}
                                                    type="text"
                                                    value={t.numero}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        ))}
                                        <button type="button" onClick={addTelefoneField}>Adicionar Telefone</button>
                                    </div>
                                    <div className="form-column">
                                        <label htmlFor="endereco-rua">Endereço - Rua</label>
                                        <input id="endereco-rua" type="text" value={form.endereco.rua} onChange={handleInputChange} required />

                                        <label htmlFor="endereco-bairro">Endereço - Bairro</label>
                                        <input id="endereco-bairro" type="text" value={form.endereco.bairro} onChange={handleInputChange} required />

                                        <label htmlFor="endereco-numero">Endereço - Número</label>
                                        <input id="endereco-numero" type="text" value={form.endereco.numero} onChange={handleInputChange} required />

                                        <label htmlFor="supervisor_cpf">CPF do Supervisor</label>
                                        <input id="supervisor_cpf" type="text" value={form.supervisor_cpf} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="modal-buttons">
                                    <button type="button" className="banner-button2" onClick={() => closeModal()}>Cancelar</button>
                                    <button type="submit" className="banner-button2">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="chart-button">
                    <Link to="/grafico" className="chart-link">Gráfico</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Management;
