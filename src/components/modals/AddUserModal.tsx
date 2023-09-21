import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const AddUserModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const handleAddUserSubmit = async () => {
        console.log('add user');
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
