import { addUserToSpace } from '@api/spaces';
import { useModal } from '@hooks/useModal';
import {
    Button,
    Input,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddUserModalProps {
    space_id: string;
}

const AddUserModal = ({ space_id }: AddUserModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const { hideModal } = useModal();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddUserSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            await addUserToSpace(space_id, data.userEmail);
            queryClient.invalidateQueries({ queryKey: ['spaceUsers'] });
            setIsLoading(false);
            hideModal();
        } catch (e: any) {
            setError('userEmail', {
                type: 'manual',
                message: e?.message || 'An error occurred',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAddUserSubmit)}>
            <ModalHeader>Add User</ModalHeader>
            <ModalBody>
                {errors.userEmail && (
                    <span className="text-red-600">
                        {String(errors.userEmail.message)}
                    </span>
                )}
                <Input
                    {...register('userEmail', {
                        required: true,
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Not a valid email',
                        },
                    })}
                    type="email"
                    label="Email"
                    placeholder="Enter an email"
                />
            </ModalBody>
            <ModalFooter>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                )}
            </ModalFooter>
        </form>
    );
};

export default AddUserModal;
