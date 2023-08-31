import React, { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
} from '@nextui-org/react';

interface ToastProps {
    title: string;
    message: string;
    onClose: () => void;
    autoCloseTime?: number;
}

const Toast: React.FC<ToastProps> = ({
    title,
    message,
    onClose,
    autoCloseTime = 5000,
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, autoCloseTime);
        return () => clearTimeout(timer);
    }, [onClose, autoCloseTime]);

    return (
        <Card className="toast-card">
            <CardHeader>
                <span>{title}</span>
                <Button size="sm" onClick={onClose}>
                    X
                </Button>
            </CardHeader>
            <CardBody>
                <p>{message}</p>
            </CardBody>
            <CardFooter>
                <p>For more details, check console.</p>
            </CardFooter>
        </Card>
    );
};

export default Toast;
