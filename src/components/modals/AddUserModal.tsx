import { addUserToSpace } from '@api/spaces';
import { useModal } from '@hooks/useModal';
import {
    Button,
    Input,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
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

    const handleAddUserSubmit = async (data: any) => {
        try {
            await addUserToSpace(space_id, data.userEmail);
            hideModal();
        } catch (e: any) {
            console.error(JSON.stringify(e));
            setError('userEmail', {
                type: 'manual',
                message: e?.message || 'An error occurred',
            });
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
                    })}
                    label="userEmail"
                    placeholder="Enter User Email"
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </ModalFooter>
        </form>
    );
};

export default AddUserModal;
