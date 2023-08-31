'use client';

import { loginUser, refreshSession, signupUser } from '@services/cognito';
import { AuthContext } from '@contexts/AuthContext';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isOpen: showModal, onOpenChange: setShowModal } = useDisclosure();
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    useEffect(() => {
        initializeSession();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const token = await loginUser(email, password);
            localStorage.setItem('cognito_id_token', token);
            setIsLoggedIn(true);
        } catch (error: any) {
            alert(error);
        }
    };

    const initializeSession = async () => {
        try {
            const token = await refreshSession();
            if (token) {
                localStorage.setItem('cognito_id_token', token);
                setIsLoggedIn(true);
            }
        } catch (error: any) {
            console.error('Could not refresh session:', error);
            setIsLoggedIn(false);
        }
    };

    const signup = async (
        email: string,
        password: string,
        attributeList: CognitoUserAttribute[],
    ): Promise<CognitoUser> => {
        try {
            return signupUser(email, password, attributeList);
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                showModal,
                setShowModal,
                mode,
                setMode,
                login,
                signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
