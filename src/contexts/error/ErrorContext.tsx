import { HttpError } from '@customTypes/httpError';
import { createContext } from 'react';

interface ErrorContextProps {
    addError: (error: HttpError) => void;
    apiCall: <T>(func: () => Promise<any>) => Promise<T | undefined>;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(
    undefined,
);
