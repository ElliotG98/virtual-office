import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface AuthContextValue {
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
