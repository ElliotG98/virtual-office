import axios from 'axios';

export const client = axios.create({
    baseURL: 'https://6aaraodxof.execute-api.eu-west-2.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthorizationToken = (token: string) => {
    client.defaults.headers['Authorization'] = `Bearer ${token}`;
};
