import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser, useAuth } from '@lib/auth/auth';
import { CustomInput } from './CustomInput';
import { Button } from '@nextui-org/react';

interface LoginFormProps {
    onSuccess: () => void;
}

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { setIsLoggedIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        loginUser(data.email, data.password, setIsLoggedIn, onSuccess);
    };

    return (
        <div className="p-8 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                <CustomInput
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    label="Email"
                    name="email"
                    error={errors.email}
                />
                <CustomInput
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    label="Password"
                    name="password"
                    type="password"
                    error={errors.password}
                />
                <Button type="submit" className="global-button">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
