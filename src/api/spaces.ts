import { handleError, client } from './axios';
import { Space, User } from '../types/index';

export const getSpace = async (space_id: string): Promise<Space> => {
    try {
        const response = await client.get<Space>(`/spaces/${space_id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getSpaceUsers = async (space_id: string): Promise<User[]> => {
    try {
        const response = await client.get<{ users: User[] }>(
            `/spaces/${space_id}/users`,
        );
        return response.data.users;
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

export const sendUserRequestToSpace = async (
    space_id: string,
): Promise<string> => {
    try {
        const response = await client.post(`/spaces/${space_id}/users/request`);
        return response.data?.message;
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};

export const approveUserRequestToSpace = async (
    space_id: string,
    user_id: string,
): Promise<{ message?: string }> => {
    try {
        const response = await client.post(
            `/spaces/${space_id}/users/${user_id}/approve`,
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const rejectUserRequestToSpace = async (
    space_id: string,
    user_id: string,
): Promise<{ message?: string }> => {
    try {
        const response = await client.post(
            `/spaces/${space_id}/users/${user_id}/reject`,
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const addUserToSpace = async (space_id: string, email: string) => {};
