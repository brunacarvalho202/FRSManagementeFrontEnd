import React, { useState, useEffect } from 'react';
import { getFuncionarios, getServicos } from '../../Services/DashboardServices';
import './Dashboard.css';

const Dashboard = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        loadFuncionarios();
        loadServicos();
    }, []);

    const loadFuncionarios = async () => {
        try {
            const response = await getFuncionarios();
            setFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    const loadServicos = async () => {
        try {
            const response = await getServicos();
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-section">
                <h2>Funcionários</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Carteira de Trabalho</th>
                            <th>Telefone</th>
                            <th>Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario) => (
                            <tr key={funcionario.cpf}>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.cpf}</td>
                                <td>{funcionario.carteira_trabalho}</td>
                                <td>{funcionario.telefones ? funcionario.telefones.map(t => t.telefone).join(', ') : 'Campo Vazio'}</td>
                                <td>{funcionario.supervisor_cpf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Serviços</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((servico) => (
                            <tr key={servico.codigo_servico}>
                                <td>{servico.codigo_servico}</td>
                                <td>{servico.descricao}</td>
                                <td>{servico.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
