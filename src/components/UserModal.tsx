import React from 'react';
import { User } from '../types/index';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';

interface UserModalProps {
    user: User;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
    const { isOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(close) => (
                        <>
                            <ModalHeader> {user.firstName} </ModalHeader>
                            <ModalBody>
                                <p>
                                    <b>Email:</b> {user.email}
                                </p>
                                <p>
                                    <b>Phone:</b> {user.phone}
                                </p>
                                <p>
                                    <b>Title:</b> {user.title}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={close}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserModal;
