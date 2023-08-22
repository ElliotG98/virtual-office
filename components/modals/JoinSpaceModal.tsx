import React, { useState } from 'react';
import { Modal } from '@components/modals';
import useRequireLogin from '@hooks/useRequireLogin';

export const JoinSpaceModal: React.FC = () => {
    const { requireLogin } = useRequireLogin();
    const [isOpen, setIsOpen] = useState(false);
    const [spaceId, setSpaceId] = useState('');

    const handleJoinSpaceSubmit = () => {
        console.log('Join Space clicked with Space ID:', spaceId);
    };

    const handleOpenModal = () => {
        requireLogin(() => setIsOpen(true));
    };

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Join Space
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-2xl font-semibold">Join Space</h2>
                    <input
                        type="text"
                        value={spaceId}
                        onChange={(e) => setSpaceId(e.target.value)}
                        placeholder="Enter Space ID"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleJoinSpaceSubmit}
                        className="bg-green-500 text-white p-2 rounded w-full"
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    );
};
