import { ReactNode, useEffect, useState } from 'react';
import { ModalContext } from './modalContext';
import { createPortal } from 'react-dom';

interface ModalProviderProps {
    children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [portalTarget, setPortalTarget] = useState<Element | null>(null);

    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    const showModal = (content: ReactNode) => setModalContent(content);
    const hideModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalContent }}>
            {portalTarget && createPortal(children, portalTarget)}
        </ModalContext.Provider>
    );
};
