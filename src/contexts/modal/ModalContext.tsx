import { createContext, ReactNode } from 'react';

interface ModalContextType {
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
    modalContent: ReactNode | null;
    updateModal: (content: ReactNode) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
    undefined,
);
