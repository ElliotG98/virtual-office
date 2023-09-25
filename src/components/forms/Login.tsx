import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import { CustomInput } from './CustomInput';
import { Button } from '@nextui-org/react';
import useUser from '@hooks/useUser';

interface LoginFormProps {
    onSuccess: () => void;
}

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { login } = useAuth();
    const { setIsLoading } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
            onSuccess();
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
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
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;
