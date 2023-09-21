import { ReactNode, useState } from 'react';
import { ModalContext } from './modalContext';
import { createPortal } from 'react-dom';

interface ModalProviderProps {
    children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const showModal = (content: ReactNode) => setModalContent(content);
    const hideModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalContent }}>
            {createPortal(children, document.body)}
        </ModalContext.Provider>
    );
};
