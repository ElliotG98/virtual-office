import React, { useState } from 'react';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '@config/cognito';
import { loginUser, useAuth } from '@config/auth';

interface SignupFormProps {
    onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
    const { setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
        ];

        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                alert(err.message);
                return;
            }

            if (result?.user) {
                setCognitoUser(result.user);
                setIsVerificationStep(true);
            }
        });
    };

    const handleVerify = (event: React.FormEvent) => {
        event.preventDefault();

        if (cognitoUser) {
            cognitoUser.confirmRegistration(
                verificationCode,
                true,
                (err, result) => {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    console.log('Verification success:', result);
                    loginUser(email, password, setIsLoggedIn, onSuccess);
                },
            );
        }
    };

    return (
        <div className="p-8 bg-white rounded shadow-md">
            {isVerificationStep ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Verify Email
                    </h2>
                    <form onSubmit={handleVerify}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 m-2 text-white rounded bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div> */}
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 m-2 text-white rounded bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Signup
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default SignupForm;
