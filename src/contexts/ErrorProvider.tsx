import { AppError } from '@utility/error/AppError';
import { useState } from 'react';
import { ErrorContext } from './ErrorContext';
import ErrorToast from '@components/ErrorToast';

interface ErrorProviderProps {
    children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [errors, setErrors] = useState<AppError[]>([]);

    const addError = (error: AppError) => {
        console.error(error.developerMessage);
        setErrors([...errors, error]);
    };

    const removeError = (error: AppError) => {
        setErrors(errors.filter((e) => e !== error));
    };

    return (
        <ErrorContext.Provider value={{ addError }}>
            {children}

            {errors.map((error, index) => (
                <ErrorToast
                    key={index}
                    error={error}
                    onClose={() => removeError(error)}
                />
            ))}
        </ErrorContext.Provider>
    );
};
