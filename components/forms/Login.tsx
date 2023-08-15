import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '@config/cognito';
import { loginUser, useAuth } from '@config/auth';

interface LoginFormProps {
    onSuccess: () => void;
}

const Login: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        loginUser(email, password, setIsLoggedIn, onSuccess);
    };

    return (
        <div className="p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button type="submit" className="global-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
