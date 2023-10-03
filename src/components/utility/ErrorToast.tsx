import React from 'react';
import Toast from './Toast';
import { HttpError } from '@customTypes/httpError';

interface ErrorToastProps {
    error: HttpError;
    onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ error, onClose }) => {
    return <Toast title="Error" message={error.message} onClose={onClose} />;
};

export default ErrorToast;
