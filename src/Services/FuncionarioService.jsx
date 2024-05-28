import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/funcionarios', 
});

export const getFuncionarios = () => api.get('/todos');
export const getFuncionarioByCPF = (cpf) => api.get(`/${cpf}`);
export const saveFuncionario = (funcionario) => api.post('/novo', funcionario);
export const updateFuncionario = (funcionario) => api.put('/atualizar', funcionario);
export const deleteFuncionario = (cpf) => api.delete(`/${cpf}`);
