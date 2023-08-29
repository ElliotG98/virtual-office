import axios from 'axios';

export const client = axios.create({
    baseURL: 'https://yvoguinwo3.execute-api.eu-west-2.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('cognito_id_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
