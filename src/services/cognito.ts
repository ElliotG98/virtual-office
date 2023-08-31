import {
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
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

export const logoutUser = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const cognitoUser = userPool.getCurrentUser();
            if (cognitoUser !== null) {
                cognitoUser.signOut();
                resolve();
            } else {
                reject('No user logged in');
            }
        } catch (err) {
            reject(err);
        }
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

export const refreshSession = async (): Promise<string | null> => {
    return new Promise<string | null>((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser !== null) {
            cognitoUser.getSession(
                async (
                    err: Error | null,
                    session: CognitoUserSession | null,
                ) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!session) {
                        resolve(null);
                        return;
                    }
                    if (session.isValid()) {
                        resolve(session.getIdToken().getJwtToken());
                        return;
                    }
                    cognitoUser.refreshSession(
                        session.getRefreshToken(),
                        (err, session) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(session.getIdToken().getJwtToken());
                        },
                    );
                },
            );
        } else {
            resolve(null);
        }
    });
};
