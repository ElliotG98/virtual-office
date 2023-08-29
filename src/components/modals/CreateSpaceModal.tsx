import React, { useEffect, useState } from 'react';
import { Modal } from '.';
import { createSpace } from '@api/spaces';
import { useRouter } from 'next/router';
import useRequireLogin from '@hooks/useRequireLogin';
import { useForm } from 'react-hook-form';
import Spinner from '../utility/spinner';
import Success from '../utility/success';

export const CreateSpaceModal: React.FC = () => {
    const router = useRouter();
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
    const [spaceId, setSpaceId] = useState('');

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
                router.push(`/spaces/${spaceId}`);
            }, 1500);
        }
    }, [isSuccess, router]);

    const handleCreateSpaceSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const space_id = await createSpace(data.spaceName);
            if (space_id) {
                setSpaceId(space_id);
                setIsSuccess(true);
            } else {
                setError('spaceName', {
                    type: 'manual',
                    message: 'Unable to create space',
                });
            }
        } catch (error: any) {
            setError('spaceName', {
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
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Space
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {isLoading ? (
                        <Spinner />
                    ) : isSuccess ? (
                        <Success />
                    ) : (
                        <form onSubmit={handleSubmit(handleCreateSpaceSubmit)}>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <h2 className="text-2xl font-semibold">
                                    Create Space
                                </h2>
                                <input
                                    type="text"
                                    {...register('spaceName', {
                                        required: 'Space name is required',
                                    })}
                                    placeholder="Enter Office Name"
                                    className="border p-2 rounded w-full"
                                />
                                {errors.spaceName && (
                                    <div className="text-red-500">
                                        {String(errors.spaceName.message)}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded w-full"
                                    disabled={isLoading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </>
    );
};
