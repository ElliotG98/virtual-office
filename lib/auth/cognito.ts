import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.USER_POOL_ID as string,
    ClientId: process.env.USER_POOL_CLIENT_ID as string,
};

const userPool = new CognitoUserPool(poolData);

export { userPool };
