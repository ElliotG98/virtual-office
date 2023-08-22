import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser, useAuth } from '@lib/auth/auth';

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
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    {errors.email && <span>Email is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    {errors.password && <span>Password is required</span>}
                </div>
                <button type="submit" className="global-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
