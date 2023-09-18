import { useAuth } from '@hooks/useAuth';
import useUser from '@hooks/useUser';

const useRequireLogin = () => {
    const { user } = useUser();
    const { showModal, setShowModal, mode, setMode } = useAuth();

    const requireLogin = (callback: () => void) => {
        if (user) {
            callback();
        } else {
            setShowModal();
            setMode('login');
        }
    };

    return { showModal, setShowModal, mode, setMode, requireLogin };
};

export default useRequireLogin;
