import { setAuthorizationToken, handleError, client } from './axios';

const idToken = localStorage.getItem('cognito_id_token');
if (idToken) {
    setAuthorizationToken(idToken);
}

export const getSpace = async (space_id: string) => {
    try {
        const response = await client.get(`/spaces/${space_id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getSpaceUsers = async (space_id: string) => {
    try {
        const response = await client.get(`/spaces/${space_id}/users`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const createSpace = async (name: string) => {
    try {
        const response = await client.post('/spaces', { name });
        return response.data.space_id;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
