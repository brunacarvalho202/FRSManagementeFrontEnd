import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/dependente', 
});

export const getDependentesByFuncionario = async (cpfFuncionario) => {
    return api.get(`/funcionario/${cpfFuncionario}`);
};

export const getDependentes = () => api.get('/todos');
export const getDependenteByCPF = (cpfDependente) => api.get(`/${cpfDependente}`);
export const saveDependente = (dependente) => api.post('/novo', dependente);
export const updateDependente = (cpfDependente, dependente) => api.put(`/atualizar/${cpfDependente}`, dependente);
export const deleteDependente = (cpfDependente) => api.delete(`/${cpfDependente}`);
