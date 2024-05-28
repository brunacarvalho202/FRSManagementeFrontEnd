import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDependentes, saveDependente, updateDependente, deleteDependente } from '../../Services/DependenteServices';
import axios from 'axios';
import './UserProfile.css';
import Footer from '../Footer/Footer';

const UserProfile = () => {
    const { cpf } = useParams();
    const [userData, setUserData] = useState(null);
    const [dependenteForm, setDependenteForm] = useState({
        nome: '',
        cpfDependente: '',
        cpfFuncionario: cpf
    });
    const [isEditingDependente, setIsEditingDependente] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/funcionarios/${cpf}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUserData();
        fetchDependentes();
    }, [cpf]);

    const fetchDependentes = async () => {
        try {
            const response = await getDependentes();
            setUserData((prevState) => ({
                ...prevState,
                dependentes: response.data.filter(dep => dep.cpfFuncionario === cpf && dep.nome && dep.cpfDependente)
            }));
        } catch (error) {
            console.error('Erro ao buscar dependentes:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setDependenteForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    const handleSubmitDependente = async (e) => {
        e.preventDefault();
        try {
            if (isEditingDependente) {
                await updateDependente(dependenteForm.cpfDependente, dependenteForm);
            } else {
                await saveDependente(dependenteForm);
            }
            fetchDependentes();
            closeModal();
        } catch (error) {
            console.error('Erro ao salvar dependente:', error);
        }
    };

    const handleEditDependente = (dependente) => {
        setDependenteForm(dependente);
        setIsEditingDependente(true);
        openModal();
    };

    const handleDeleteDependente = async (cpfDependente) => {
        try {
            await deleteDependente(cpfDependente);
            fetchDependentes();
        } catch (error) {
            console.error('Erro ao excluir dependente:', error);
        }
    };

    const openModal = () => {
        document.getElementById('modal-wrapper').classList.add('active');
    };

    const closeModal = () => {
        document.getElementById('modal-wrapper').classList.remove('active');
        setDependenteForm({
            nome: '',
            cpfDependente: '',
            cpfFuncionario: cpf
        });
        setIsEditingDependente(false);
    };

    const determineCargo = () => {
        if (userData.supervisor_cpf === userData.cpf) {
            return "Funcionário Supervisor";
        } else {
            return "Funcionário Comum";
        }
    };

    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="user-profile">
            <div className="background-top">
                <div className="profile-header">Perfil de Usuário</div>
                <div className="back-button" onClick={() => navigate(-1)}>VOLTAR</div>
            </div>
            <div className="background-main">
                <div className="name-cpf">
                    <div>
                        <div className="name">{userData.nome}</div>
                        <div className="cpf">CPF: {userData.cpf}</div>
                    </div>
                </div>
                <div className="profile-info">
                    <div className="info-row">
                        <div className="info-block">
                            <div className="label">Cargo</div>
                            <div className="input">{determineCargo()}</div>
                        </div>
                        <div className="info-block">
                            <div className="label">Endereço - Rua</div>
                            <div className="input">{userData.endereco?.rua || 'Campo Vazio'}</div>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-block">
                            <div className="label">Carteira de Trabalho</div>
                            <div className="input">{userData.carteira_trabalho || 'Campo Vazio'}</div>
                        </div>
                        <div className="info-block">
                            <div className="label">Endereço - Bairro</div>
                            <div className="input">{userData.endereco?.bairro || 'Campo Vazio'}</div>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-block">
                            <div className="label">Telefone(s)</div>
                            <div className="input">{userData.telefone?.join(', ') || 'Campo Vazio'}</div>
                        </div>
                        <div className="info-block">
                            <div className="label">Endereço - Número</div>
                            <div className="input">{userData.endereco?.numero || 'Campo Vazio'}</div>
                        </div>
                    </div>
                </div>
                <div className="dependents">
                    <div className="dependents-title">Dependentes</div>
                    {userData.dependentes && userData.dependentes.length > 0 ? (
                        userData.dependentes.map((dep, index) => (
                            <div key={index} className="email">
                                {index + 1}. {dep.nome} ({dep.cpfDependente})
                                <button className="edit-button" onClick={() => handleEditDependente(dep)}>Editar</button>
                                <button className="delete-button" onClick={() => handleDeleteDependente(dep.cpfDependente)}>Excluir</button>
                            </div>
                        ))
                    ) : (
                        <div className="email">Nenhum dependente cadastrado!</div>
                    )}
                    <button className="banner-button2 dependents-action" onClick={() => openModal()}>ADICIONAR DEPENDENTES</button>
                </div>
            </div>

            <div className="modal-wrapper" id="modal-wrapper">
                <div className="modal">
                    <form onSubmit={handleSubmitDependente}>
                        <label htmlFor="nome">Nome do Dependente</label>
                        <input id="nome" type="text" value={dependenteForm.nome} onChange={handleInputChange} required />

                        <label htmlFor="cpfDependente">CPF do Dependente</label>
                        <input id="cpfDependente" type="text" value={dependenteForm.cpfDependente} onChange={handleInputChange} required />

                        <div className="modal-buttons">
                            <button type="button" className="banner-button2" onClick={closeModal}>Cancelar</button>
                            <button type="submit" className="banner-button2">{isEditingDependente ? 'Atualizar' : 'Adicionar'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
