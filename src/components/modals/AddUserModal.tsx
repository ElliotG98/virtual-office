import { addUserToSpace } from '@api/spaces';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { set, useForm } from 'react-hook-form';

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

    const handleAddUserSubmit = async (data: any) => {
        try {
            await addUserToSpace(space_id, data.userEmail);
        } catch (e: any) {
            setError('userEmail', {
                type: 'manual',
                message: e?.message || 'An error occurred',
            });
        }
    };

    return (
        <Modal>
            <ModalContent>
                {() => (
                    <form onSubmit={handleSubmit(handleAddUserSubmit)}>
                        <ModalHeader>Add User</ModalHeader>
                        <ModalBody>
                            <Input
                                {...register('userEmail', {
                                    required: true,
                                })}
                                label="userEmail"
                                placeholder="Enter User Email"
                            />
                            {errors.userEmail && (
                                <span>{String(errors.userEmail.message)}</span>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            (isLoading ? ( ) : isSuccess ? ( ) : (
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                            ))
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddUserModal;
