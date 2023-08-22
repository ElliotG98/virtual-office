import { handleError, client } from './axios';
import { Space, User } from '@customTypes/index';

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
