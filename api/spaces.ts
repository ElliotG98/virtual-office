export const createSpace = async (name: string) => {
    const idToken = localStorage.getItem('cognito_id_token');
    try {
        const response = await fetch('/spaces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ name }),
        });

        console.log(response);

        return response;
    } catch (error) {
        alert(error);
    }
};
