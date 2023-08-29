import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { createContext, useContext } from 'react';

interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'login' | 'signup';
    setMode: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        email: string,
        password: string,
        attributeList: CognitoUserAttribute[],
    ) => Promise<CognitoUser>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
