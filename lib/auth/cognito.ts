import {
    CognitoUserAttribute,
    CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.USER_POOL_ID as string,
    ClientId: process.env.USER_POOL_CLIENT_ID as string,
};

export const userPool = new CognitoUserPool(poolData);

export const loginUser = async (
    email: string,
    password: string,
): Promise<string> => {
    return new Promise((resolve, reject) => {
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
                resolve(session.getIdToken().getJwtToken());
            },
            onFailure: (err) => {
                reject(err.message);
            },
        });
    });
};

export const signupUser = (
    email: string,
    password: string,
    attributeList: CognitoUserAttribute[],
): Promise<CognitoUser> => {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                reject(err);
            }
            if (result?.user) {
                resolve(result.user);
            }
        });
    });
};

export const confirmUserRegistration = (
    cognitoUser: CognitoUser,
    verificationCode: string,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(
            verificationCode,
            true,
            (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result) {
                    resolve('Verification success: ' + result);
                }
            },
        );
    });
};
