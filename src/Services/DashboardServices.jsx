import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getFuncionarios = () => {
    return axios.get(`${API_URL}/funcionarios/todos`, {
        params: {
            include: 'telefone' 
        }
    });
};

export const getServicos = () => {
    return axios.get(`${API_URL}/servicos/todos_servicos`);
};
