import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
//mport './Dashboard.css' from '../../Dashboard/Dashboard.css';

// Registrar componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [clienteFisicoCount, setClienteFisicoCount] = useState(0);
    const [clienteJuridicoCount, setClienteJuridicoCount] = useState(0);

    useEffect(() => {
        loadFuncionarios();
        loadServicos();
        loadClientesCount();
    }, []);

    const loadFuncionarios = async () => {
        try {
            const response = await axios.get('http://localhost:8080/funcionarios/todos', {
                params: {
                    include: 'telefone'
                }
            });
            setFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    const loadServicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/servicos/todos_servicos');
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const loadClientesCount = async () => {
        try {
            const responseFisico = await axios.get('http://localhost:8080/clientes/fisico/count');
            const responseJuridico = await axios.get('http://localhost:8080/clientes/juridico/count');
            setClienteFisicoCount(responseFisico.data);
            setClienteJuridicoCount(responseJuridico.data);
        } catch (error) {
            console.error('Erro ao buscar contagem de clientes:', error);
        }
    };

    const data = {
        labels: ['Clientes Físicos', 'Clientes Jurídicos'],
        datasets: [
            {
                label: 'Clientes',
                data: [clienteFisicoCount, clienteJuridicoCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
 
            <div className="dashboard-section">
                <h2>Gráfico de Clientes</h2>
                <Pie data={data} />
            </div>
        </div>
    );
};

export default Dashboard;
