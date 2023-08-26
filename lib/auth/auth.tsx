import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import React, { createContext, useContext, useState } from 'react';
import { userPool } from './cognito';

interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'login' | 'signup';
    setMode: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
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

export const signupUser = (
    email: string,
    password: string,
    attributeList: CognitoUserAttribute[],
    onSuccess: (user: CognitoUser) => void,
    onError: (message: string) => void,
) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
            onError(err.message);
            return;
        }
        if (result?.user) {
            onSuccess(result.user);
        }
    });
};

export const confirmRegistration = (
    cognitoUser: CognitoUser,
    verificationCode: string,
    onSuccess: (result: string) => void,
    onError: (message: string) => void,
) => {
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
            onError(err.message);
            return;
        }
        onSuccess('Verification success: ' + result);
    });
};
