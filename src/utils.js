import axios from 'axios';

// Função que formata a data para "month-short dd, yyyy"
export function formatDate(dateString) {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
};

// Função para obter o token de autenticação
export async function getToken() {
    const csrftoken = getCookie('csrftoken');

    return await axios.post('http://localhost:8000/users/generate-token/', {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    })
        .then(response => {
            return response.data.access_token;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
};

// Função para obter o CSRF token
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Função para obter os dados do usuário
export async function getUserData() {
    try {
        const response = await axios.get('http://localhost:8000/users/profile/', {
            withCredentials: true,
        });
        return response.data;

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

// Função para obter as listas de imagens salvas de um usuário
export async function getSavedCollections() {
    try {
        const response = await axios.get('http://localhost:8000/saved-collections/list/', {
            withCredentials: true,
        });
        return response.data.collections;
    } catch (error) {
        console.error("Error fetching saved collections:", error);
    }
};

// Função para atualizar o nome de uma lista de imagens específica
export const updateListName = (listName, newName, lists, setLists, setSavedCollections) => {
    const updatedLists = [...lists];
    updatedLists[lists.indexOf(listName)] = newName;
    setLists(updatedLists);
    setSavedCollections(updatedLists);
};

// Função para atualizar a lista de saved collections após uma exclusão
export function deleteSavedCollection(lists, listName, setLists, setSavedCollections) {
    const updatedLists = [...lists];
    updatedLists.splice(lists.indexOf(listName), 1);
    setLists(updatedLists);
    setSavedCollections(updatedLists);
};