import { useState } from 'react';
import { ErrorContext } from './ErrorContext';
import ErrorToast from '@components/utility/ErrorToast';
import { HttpError } from '@customTypes/httpError';

interface ErrorProviderProps {
    children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [errors, setErrors] = useState<HttpError[]>([]);

    const apiCall = async <T,>(
        func: () => Promise<any>,
    ): Promise<T | undefined> => {
        try {
            const response = await func();
            return response;
        } catch (e: any) {
            console.error(e);
            if (e instanceof HttpError) {
                addError(e);
            }
        }
        return;
    };

    const addError = (error: HttpError) => {
        console.error(error.developerMessage);
        setErrors([...errors, error]);
    };

    const removeError = (error: HttpError) => {
        setErrors(errors.filter((e) => e !== error));
    };

    return (
        <ErrorContext.Provider value={{ addError, apiCall }}>
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
