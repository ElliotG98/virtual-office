import { HttpError } from '@customTypes/httpError';
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

export const apiCall = async <T>(promise: Promise<T>): Promise<T> => {
    try {
        const response = await promise;
        return response;
    } catch (error: any) {
        console.log('error', JSON.stringify(error));
        const statusCode = error?.response?.status;
        const message = error?.response?.data?.message || 'An error occurred';
        const developerMessage = error?.response?.data?.developerMessage;

        throw new HttpError(statusCode, message, developerMessage);
    }
};
