import SignupForm from '../forms/Signup';
import LoginForm from '../forms/Login';
import { Modal } from '.';
import useRequireLogin from '@hooks/useRequireLogin';

export const LoginSignupModal = () => {
    const { showModal, setShowModal, mode, setMode } = useRequireLogin();

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            {mode === 'login' ? (
                <LoginForm onSuccess={() => setShowModal(false)} />
            ) : (
                <SignupForm onSuccess={() => setShowModal(false)} />
            )}
            <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm underline"
            >
                {mode === 'login'
                    ? 'Need an account? Sign Up'
                    : 'Already have an account? Login'}
            </button>
        </Modal>
    );
};
