import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getClientesFisicos = () => api.get('/clientes/fisico/todos');
export const getClienteFisicoByCNH = (cnh) => api.get(`/clientes/fisico/${cnh}`);
export const saveClienteFisico = (cliente) => api.post('/clientes/fisico', cliente);
export const updateClienteFisico = (cliente) => api.put(`/clientes/fisico`, cliente);
export const deleteClienteFisico = (cnh) => api.delete(`/clientes/fisico/${cnh}`);


