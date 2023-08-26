import React, { forwardRef, ForwardedRef } from 'react';
import { Input, InputProps as NextUIInputProps } from '@nextui-org/react';

interface CustomInputProps extends NextUIInputProps {
    label: string;
    error?: {
        message?: string;
    };
    rules?: any;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, error, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                    {label}
                </label>
                <Input ref={ref} {...rest} />
                {error && <span className="text-red-600">{error.message}</span>}
            </div>
        );
    },
);
