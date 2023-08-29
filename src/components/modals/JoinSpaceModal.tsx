import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendUserRequestToSpace } from '@api/spaces';
import useRequireLogin from '@hooks/useRequireLogin';
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

export const JoinSpaceModal: React.FC<{ onSuccess: () => void }> = ({
    onSuccess,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { requireLogin } = useRequireLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                onOpenChange();
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
        requireLogin(() => onOpen());
    };

    return (
        <>
            <Button onPress={handleOpenModal}>Join Space</Button>
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
                                        handleJoinSpaceSubmit,
                                    )}
                                >
                                    <ModalHeader>
                                        Request to Join Space
                                    </ModalHeader>
                                    <ModalBody>
                                        <Input
                                            {...register('spaceId', {
                                                required: true,
                                            })}
                                            label="Space ID"
                                            placeholder="Enter space ID"
                                        />
                                        {errors.spaceId && (
                                            <span>
                                                {String(errors.spaceId.message)}
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
