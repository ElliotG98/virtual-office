import { handleError, client } from './axios';
import { User } from '../types/index';

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

export const updateUser = async (user: Partial<User>): Promise<void> => {
    try {
        const { id, email, ...rest } = user;
        const response = await client.patch('/users', rest);
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};
