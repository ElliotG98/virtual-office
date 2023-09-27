import { createContext, ReactNode } from 'react';

interface ModalContextType {
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
    modalContent: ReactNode | null;
}

export const ModalContext = createContext<ModalContextType | undefined>(
    undefined,
);
