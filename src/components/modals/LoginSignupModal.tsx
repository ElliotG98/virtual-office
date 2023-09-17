import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react';
import SignupForm from '../forms/Signup';
import LoginForm from '../forms/Login';
import useRequireLogin from '@hooks/useRequireLogin';

export const LoginSignupModal = () => {
    const { showModal, setShowModal, mode, setMode } = useRequireLogin();

    return (
        <>
            <Modal isOpen={showModal} onOpenChange={setShowModal}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {mode === 'login' ? 'Login' : 'Signup'}
                            </ModalHeader>
                            <ModalBody>
                                {mode === 'login' ? (
                                    <LoginForm
                                        onSuccess={() => setShowModal()}
                                    />
                                ) : (
                                    <SignupForm
                                        onSuccess={() => setShowModal()}
                                    />
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    onClick={() =>
                                        setMode(
                                            mode === 'login'
                                                ? 'signup'
                                                : 'login',
                                        )
                                    }
                                    className="text-sm underline"
                                >
                                    {mode === 'login'
                                        ? 'Need an account? Sign Up'
                                        : 'Already have an account? Login'}
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
