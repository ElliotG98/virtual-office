import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useRequireLogin from '@hooks/useRequireLogin';
import { useForm } from 'react-hook-form';
import { createSpace } from '@api/spaces';
import Spinner from '../utility/spinner';
import Success from '../utility/success';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from '@nextui-org/react';

export const CreateSpaceModal: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const { requireLogin } = useRequireLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [spaceId, setSpaceId] = useState('');

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                onOpenChange();
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
        requireLogin(() => onOpen());
    };

    return (
        <>
            <Button onPress={handleOpenModal}>Create Space</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            {isLoading ? (
                                <Spinner />
                            ) : isSuccess ? (
                                <Success />
                            ) : (
                                <form
                                    onSubmit={handleSubmit(
                                        handleCreateSpaceSubmit,
                                    )}
                                >
                                    <ModalHeader>Create Space</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            {...register('spaceName', {
                                                required: true,
                                            })}
                                            label="Space Name"
                                            placeholder="Enter space name"
                                        />
                                        {errors.spaceName && (
                                            <span>
                                                {String(
                                                    errors.spaceName.message,
                                                )}
                                            </span>
                                        )}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </ModalFooter>
                                </form>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
