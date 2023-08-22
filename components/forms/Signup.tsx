import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { signupUser, confirmRegistration } from '@lib/auth';
import { loginUser, useAuth } from '../../lib/auth/auth';
import { createUser } from '@api/users';

interface SignupFormProps {
    onSuccess: () => void;
}

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
    const { setIsLoggedIn } = useAuth();
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignup = (data: FormData) => {
        setEmail(data.email);
        setPassword(data.password);
        setUsername(data.username);

        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: data.email }),
        ];

        signupUser(
            data.email,
            data.password,
            attributeList,
            (user) => {
                setCognitoUser(user);
                setIsVerificationStep(true);
            },
            (error) => setError(error),
        );
    };

    const handleVerification = (verificationCode: string) => {
        if (cognitoUser) {
            confirmRegistration(
                cognitoUser,
                verificationCode,
                async (result) => {
                    console.log(result);
                    try {
                        await loginUser(
                            email,
                            password,
                            setIsLoggedIn,
                            async () => {
                                try {
                                    await createUser({ email, name: username });
                                    onSuccess();
                                } catch (error) {
                                    setIsLoggedIn(false);
                                    setError(
                                        'Failed to create user in database.',
                                    );
                                    console.error(error);
                                }
                            },
                        );
                    } catch (error) {
                        setError('Failed to log in.');
                        console.error(error);
                    }
                },
                (error) => setError(error),
            );
        }
    };

    return (
        <div className="p-8 bg-white rounded shadow-md">
            {error && <div className="text-red-600">{error}</div>}
            {isVerificationStep ? (
                <VerificationStep onVerify={handleVerification} />
            ) : (
                <SignupStep onSignup={handleSignup} />
            )}
        </div>
    );
};

const SignupStep: React.FC<{
    onSignup: (data: FormData) => void;
}> = ({ onSignup }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { message: 'Passwords do not match!' });
            return;
        }
        onSignup(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username', { required: true })} />
            {errors.username && <span>Username is required</span>}
            <input {...register('email', { required: true })} />
            {errors.email && <span>Email is required</span>}
            <input
                type="password"
                {...register('password', { required: true })}
            />
            {errors.password && <span>Password is required</span>}
            <input
                type="password"
                {...register('confirmPassword', { required: true })}
            />
            {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
            )}
            <button type="submit">Signup</button>
        </form>
    );
};

const VerificationStep: React.FC<{
    onVerify: (verificationCode: string) => void;
}> = ({ onVerify }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ verificationCode: string }>();

    const onSubmit = (data: { verificationCode: string }) => {
        onVerify(data.verificationCode);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('verificationCode', { required: true })}
                className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.verificationCode && (
                <span>Verification Code is required</span>
            )}
            <button
                type="submit"
                className="px-4 py-2 m-2 text-white rounded bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
                Verify
            </button>
        </form>
    );
};

export default SignupForm;
