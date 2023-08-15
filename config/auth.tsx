import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import React, { createContext, useContext, useState } from 'react';
import { userPool } from './cognito';

interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const loginUser = (
    email: string,
    password: string,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    onSuccess: () => void,
) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
            console.log('authentication successful', session);
            const idToken = session.getIdToken().getJwtToken();
            localStorage.setItem('cognito_id_token', idToken);
            setIsLoggedIn(true);
            onSuccess();
        },
        onFailure: (err) => {
            alert(err.message);
        },
    });
};
