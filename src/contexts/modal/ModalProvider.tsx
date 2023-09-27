import { ReactNode, useEffect, useState } from 'react';
import { ModalContext } from './ModalContext';
import { createPortal } from 'react-dom';
import { Modal, ModalContent } from '@nextui-org/react';

interface ModalProviderProps {
    children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portalTarget, setPortalTarget] = useState<Element | null>(null);

    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    const showModal = (content: ReactNode) => {
        setModalContent(
            <Modal isOpen={true} onOpenChange={hideModal}>
                <ModalContent>{content}</ModalContent>
            </Modal>,
        );
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalContent }}>
            {children}
            {isModalOpen &&
                portalTarget &&
                createPortal(modalContent, portalTarget)}
        </ModalContext.Provider>
    );
};
