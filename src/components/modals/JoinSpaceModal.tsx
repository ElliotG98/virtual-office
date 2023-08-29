import React, { useEffect, useState } from 'react';
import { Modal } from '.';
import useRequireLogin from '@hooks/useRequireLogin';
import { sendUserRequestToSpace } from '@api/spaces';
import Spinner from '../utility/spinner';
import { useForm } from 'react-hook-form';
import Success from '../utility/success';

export const JoinSpaceModal: React.FC<{ onSuccess: () => void }> = ({
    onSuccess,
}) => {
    const { requireLogin } = useRequireLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
                onSuccess();
            }, 1500);
        }
    }, [isSuccess, onSuccess]);

    const handleJoinSpaceSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await sendUserRequestToSpace(data.spaceId);
            if (response) {
                setIsSuccess(true);
            } else {
                setError('spaceId', {
                    type: 'manual',
                    message: 'Successfully requested space',
                });
            }
        } catch (error: any) {
            setError('spaceId', {
                type: 'manual',
                message: error?.message || 'An error occurred',
            });
        }
        setIsLoading(false);
    };

    const handleOpenModal = () => {
        requireLogin(() => setIsOpen(true));
    };

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Join Space
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {isLoading ? (
                        <Spinner />
                    ) : isSuccess ? (
                        <Success />
                    ) : (
                        <form onSubmit={handleSubmit(handleJoinSpaceSubmit)}>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <h2 className="text-2xl font-semibold">
                                    Request to Join Space
                                </h2>
                                <input
                                    type="text"
                                    {...register('spaceId', {
                                        required: 'Space ID is required',
                                    })}
                                    placeholder="Enter Space ID"
                                    className="border p-2 rounded w-full"
                                />
                                {errors.spaceId?.message && (
                                    <div className="text-red-500">
                                        {String(errors.spaceId.message)}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded w-full"
                                    disabled={isLoading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center space-y-4"></div>
            </Modal>
        </>
    );
};
