import { ReactNode, useEffect, useRef, useState } from 'react';
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

    const updateModal = (newContent: ReactNode) => {
        setModalContent(
            <Modal className="max-w-fit" isOpen={true} onOpenChange={hideModal}>
                <ModalContent>{newContent}</ModalContent>
            </Modal>,
        );
    };

    const hideModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    const showModal = (content: ReactNode) => {
        setModalContent(
            <Modal className="max-w-fit" isOpen={true} onOpenChange={hideModal}>
                <ModalContent>{content}</ModalContent>
            </Modal>,
        );
        setIsModalOpen(true);
    };

    return (
        <ModalContext.Provider
            value={{ showModal, hideModal, modalContent, updateModal }}
        >
            {children}
            {isModalOpen &&
                portalTarget &&
                createPortal(modalContent, portalTarget)}
        </ModalContext.Provider>
    );
};
