'use client';

import { AuthContext } from '@lib/auth';
import { useState } from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                showModal,
                setShowModal,
                mode,
                setMode,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
