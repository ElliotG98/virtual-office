import SignupForm from '@components/forms/Signup';
import LoginForm from '@components/forms/Login';
import { Modal } from '@components/modals';
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
