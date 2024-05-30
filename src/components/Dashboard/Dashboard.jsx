import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './Dashboard.css';

// Registrar componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [clienteFisicoCount, setClienteFisicoCount] = useState(0);
    const [clienteJuridicoCount, setClienteJuridicoCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [funcionariosResponse, servicosResponse, fisicoCountResponse, juridicoCountResponse] = await Promise.all([
                    axios.get('http://localhost:8080/funcionarios/todos', {
                        params: {
                            include: 'telefone'
                        }
                    }),
                    axios.get('http://localhost:8080/servicos/todos_servicos'),
                    axios.get('http://localhost:8080/clientes/fisico/count'),
                    axios.get('http://localhost:8080/clientes/juridico/count')
                ]);

                setFuncionarios(funcionariosResponse.data);
                setServicos(servicosResponse.data);
                setClienteFisicoCount(fisicoCountResponse.data);
                setClienteJuridicoCount(juridicoCountResponse.data);
                setDataLoaded(true);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ['Clientes Físicos', 'Clientes Jurídicos'],
        datasets: [
            {
                label: 'Clientes',
                data: [clienteFisicoCount, clienteJuridicoCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    if (!dataLoaded) {
        return <div>Carregando dados...</div>;
    }

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
                            <th>Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario) => (
                            <tr key={funcionario.cpf}>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.cpf}</td>
                                <td>{funcionario.carteira_trabalho}</td>
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
            <div className="dashboard-section">
                <h2>Gráfico de Clientes</h2>
                <div className="chart-container">
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
