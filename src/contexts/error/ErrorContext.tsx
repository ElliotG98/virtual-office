import { createContext } from 'react';
import { AppError } from '@utility/error/AppError';

interface ErrorContextProps {
    addError: (error: AppError) => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(
    undefined,
);
