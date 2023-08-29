import { handleError, client } from './axios';
import { Space, User } from '../types/index';

export const createUser = async (user: User): Promise<string> => {
    try {
        const response = await client.post('/users', user);
        console.log(response.data);
        return response.data.id;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getSpacesByUser = async (): Promise<Space[]> => {
    try {
        const response = await client.get(`/users/spaces`);
        return response.data.spaces;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getUser = async (): Promise<User> => {
    try {
        const response = await client.get('/users');
        return response.data.user;
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};
