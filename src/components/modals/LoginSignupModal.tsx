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
import { getUser } from '@api/users';
import useUser from '@hooks/useUser';

export const LoginSignupModal = () => {
    const { showModal, setShowModal, mode, setMode } = useRequireLogin();
    const { setUser } = useUser();

    const loginSignupSuccess = () => {
        setShowModal();
        getUser()
            .then((userDetails) => {
                setUser(userDetails);
                localStorage.setItem('user', JSON.stringify(userDetails));
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

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
                                    <LoginForm onSuccess={loginSignupSuccess} />
                                ) : (
                                    <SignupForm
                                        onSuccess={loginSignupSuccess}
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
