import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface AuthContextValue {
    showModal: boolean;
    setShowModal: () => void;
    mode: 'login' | 'signup';
    setMode: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        email: string,
        password: string,
        attributeList: CognitoUserAttribute[],
    ) => Promise<CognitoUser>;
}
