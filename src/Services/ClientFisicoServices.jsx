import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/clientes', 
});

export const getClientesFisicos = () => api.get('/fisico/todos');
export const getClienteFisicoByCNH = (cnh) => api.get(`/fisico/${cnh}`);
export const saveClienteFisico = (cliente) => api.post('/fisico/novo', cliente);
export const updateClienteFisico = (cliente) => api.put('/fisico/atualizar', cliente);
export const deleteClienteFisico = (cnh) => api.delete(`/fisico/${cnh}`);
