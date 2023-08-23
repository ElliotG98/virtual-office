import { handleError, client } from './axios';
import { Space, UserSpaceStatus, User } from '@customTypes/index';

export const getSpace = async (space_id: string): Promise<Space> => {
    try {
        const response = await client.get<Space>(`/spaces/${space_id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getSpaceUsers = async (space_id: string): Promise<User> => {
    try {
        const response = await client.get<User>(`/spaces/${space_id}/users`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const createSpace = async (name: string): Promise<string> => {
    try {
        const response = await client.post<{ space_id: string }>('/spaces', {
            name,
        });
        return response.data.space_id;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const addUserToSpace = async (
    space_id: string,
    status: UserSpaceStatus,
): Promise<string> => {
    try {
        const response = await client.post(`/spaces/${space_id}/users`, {
            status,
        });
        return response.data.space_id;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
