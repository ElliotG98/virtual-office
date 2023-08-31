import React from 'react';
import { AppError } from '@utility/error/AppError';
import Toast from './utility/Toast';

interface ErrorToastProps {
    error: AppError;
    onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ error, onClose }) => {
    return <Toast title="Error" message={error.message} onClose={onClose} />;
};

export default ErrorToast;
