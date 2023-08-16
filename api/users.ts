import { handleError, client } from './axios';
import { User } from '@customTypes/index';

export const createUser = async (user: User): Promise<string> => {
    try {
        const response = await client.post<User>('/users', user);
        console.log(response.data);
        return response.data.id;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
