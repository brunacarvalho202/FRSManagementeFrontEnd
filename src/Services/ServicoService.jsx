import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/servicos', 
});

export const getServicos = () => api.get('/todos_servicos');
export const getServicoByCodigo = (codigo) => api.get(`/${codigo}`);
export const saveServico = (servico) => api.post('/novo_servico', servico);
export const updateServico = (servico) => api.put('/atualizar_servico', servico);
export const deleteServico = (codigo) => api.delete(`/${codigo}`);
