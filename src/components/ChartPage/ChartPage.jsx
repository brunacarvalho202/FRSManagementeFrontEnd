import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChartPage.css'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/funcionarios/todos');
      const funcionarios = response.data;
      const data = prepareChartData(funcionarios);
      setChartData(data);
    } catch (error) {
      console.error('Erro ao buscar dados para o gráfico:', error);
    }
  };

  const prepareChartData = (funcionarios) => {
    const labels = funcionarios.map(func => func.nome);
    const quantidadeFuncionarios = funcionarios.length;
    const dependentes = funcionarios.map(func => func.dependentes.length);
    const quantidadeDependentes = dependentes.reduce((total, num) => total + num, 0);

    return {
      labels,
      datasets: [
        {
          label: 'Quantidade de Funcionários',
          data: Array(labels.length).fill(quantidadeFuncionarios), 
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
        },
        {
          label: 'Quantidade de Dependentes',
          data: dependentes,
          borderColor: 'rgba(201, 203, 207, 1)', 
          backgroundColor: 'rgba(201, 203, 207, 0.2)',
          fill: false,
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quantidade de Funcionários e seus Dependentes',
      },
    },
  };

  return (
    <div>
      <div className="chart-title">GRÁFICO DE FUNCIONÁRIOS E DEPENDENTES</div>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate('/funcionarios')}>Voltar</button>
      </div>
    </div>
  );
};

export default ChartPage;
