import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { confirmUserRegistration } from '@services/cognito';
import { useAuth } from '@hooks/useAuth';
import { createUser } from '@api/users';
import { CustomInput } from './CustomInput';
import { Button } from '@nextui-org/react';

interface SignupFormProps {
    onSuccess: () => void;
}

interface FormData {
    username: string;
    email: string;
    title: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
    const { setIsLoggedIn, login, signup } = useAuth();
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (data: FormData) => {
        setEmail(data.email);
        setPassword(data.password);
        setUsername(data.username);
        setTitle(data.title);

        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: data.email }),
        ];

        try {
            const user = await signup(data.email, data.password, attributeList);
            setCognitoUser(user);
            setIsVerificationStep(true);
        } catch (error: any) {
            setError(error?.message || 'Failed to sign up');
        }
    };

    const handleVerification = async (verificationCode: string) => {
        if (cognitoUser) {
            try {
                const confirmationMessage = await confirmUserRegistration(
                    cognitoUser,
                    verificationCode,
                );
                console.log(confirmationMessage);
                try {
                    await login(email, password);
                    try {
                        await createUser({
                            email,
                            name: username,
                            title,
                        });
                        onSuccess();
                    } catch (error) {
                        setIsLoggedIn(false);
                        setError('Failed to create user in database.');
                        console.error(error);
                    }
                } catch (error) {
                    setError('Failed to log in.');
                    console.error(error);
                }
            } catch (error: any) {
                setError(error?.message);
            }
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

    console.log('here');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-semibold mb-4">Sign up</h2>

            <CustomInput
                {...register('username', { required: 'Username is required' })}
                label="Username"
                name="username"
                error={errors.username}
            />

            <CustomInput
                {...register('email', { required: 'Email is required' })}
                label="Email"
                name="email"
                error={errors.email}
            />

            <CustomInput
                {...register('title', { required: 'Title is required' })}
                label="Title"
                name="title"
                error={errors.title}
            />

            <CustomInput
                {...register('password', { required: 'Password is required' })}
                label="Password"
                name="password"
                type="password"
                error={errors.password}
            />

            <CustomInput
                {...register('confirmPassword', {
                    required: 'Confirm password is required',
                })}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword}
            />

            <Button type="submit" className="global-button">
                Signup
            </Button>
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
            <h2 className="text-2xl font-semibold mb-4">Verification</h2>

            <CustomInput
                {...register('verificationCode', {
                    required: 'Verification Code is required',
                })}
                label="Verification Code"
                name="verificationCode"
                error={errors.verificationCode}
            />
            <Button type="submit" className="global-button">
                Verify
            </Button>
        </form>
    );
};

export default SignupForm;
