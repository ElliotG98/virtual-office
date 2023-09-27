import { handleError, client, apiCall } from './axios';
import { Space, User } from '../types/index';

export const getSpace = async (space_id: string): Promise<Space> => {
    const response = await apiCall(
        client.get<{ space: Space }>(`/spaces/${space_id}`),
    );
    return response.data.space;
};

export const getSpaceUsers = async (space_id: string): Promise<User[]> => {
    const response = await apiCall(
        client.get<{ users: User[] }>(`/spaces/${space_id}/users`),
    );
    return response.data.users;
};

export const getSpacesByUser = async (): Promise<Space[]> => {
    const response = await apiCall(client.get(`/users/spaces`));
    return response.data.spaces;
};

export const createSpace = async (name: string): Promise<string> => {
    const response = await apiCall(
        client.post<{ space_id: string }>('/spaces', { name }),
    );
    return response.data.space_id;
};

export const sendUserRequestToSpace = async (
    space_id: string,
): Promise<string> => {
    const response = await apiCall(
        client.post(`/spaces/${space_id}/users/request`),
    );
    return response.data?.message;
};

export const approveUserRequestToSpace = async (
    space_id: string,
    user_id: string,
): Promise<{ message?: string }> => {
    const response = await apiCall(
        client.post(`/spaces/${space_id}/users/${user_id}/approve`),
    );
    return response.data;
};

export const rejectUserRequestToSpace = async (
    space_id: string,
    user_id: string,
): Promise<{ message?: string }> => {
    const response = await apiCall(
        client.post(`/spaces/${space_id}/users/${user_id}/reject`),
    );
    return response.data;
};

export const addUserToSpace = async (
    space_id: string,
    email: string,
): Promise<{ message?: string }> => {
    const response = await apiCall(
        client.post(`/spaces/${space_id}/users/invite`, { email }),
    );
    return response.data;
};
