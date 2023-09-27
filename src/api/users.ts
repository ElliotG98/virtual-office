import { client, apiCall } from './axios';
import { User } from '../types/index';

export const createUser = async (user: User): Promise<string> => {
    const response = await apiCall(client.post('/users', user));
    console.log(response.data);
    return response.data.id;
};

export const getUser = async (): Promise<User> => {
    const response = await apiCall(client.get('/users'));
    return response.data.user;
};

export const updateUser = async (user: Partial<User>): Promise<void> => {
    const { id, email, ...rest } = user;
    await apiCall(client.patch('/users', rest));
};
