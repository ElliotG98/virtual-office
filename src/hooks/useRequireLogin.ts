import { useAuth } from '@hooks/useAuth';

const useRequireLogin = () => {
    const { isLoggedIn, showModal, setShowModal, mode, setMode } = useAuth();

    const requireLogin = (callback: () => void) => {
        if (isLoggedIn) {
            callback();
        } else {
            setShowModal(true);
            setMode('login');
        }
    };

    return { showModal, setShowModal, mode, setMode, requireLogin };
};

export default useRequireLogin;
