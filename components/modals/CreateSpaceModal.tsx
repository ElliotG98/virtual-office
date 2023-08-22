import React, { useState } from 'react';
import { Modal } from '@components/modals';
import { createSpace } from '@api/spaces';
import { useRouter } from 'next/router';
import useRequireLogin from '@hooks/useRequireLogin';

export const CreateSpaceModal: React.FC = () => {
    const router = useRouter();
    const { requireLogin } = useRequireLogin();
    const [isOpen, setIsOpen] = useState(false);
    const [spaceName, setSpaceName] = useState('');

    const handleCreateSpaceSubmit = async () => {
        if (spaceName) {
            const space_id = await createSpace(spaceName);
            if (space_id) {
                router.push(`/spaces/${space_id}`);
            }
        }
    };

    const handleOpenModal = () => {
        requireLogin(() => {
            setIsOpen(true);
        });
    };

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Space
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-2xl font-semibold">Create Space</h2>
                    <input
                        type="text"
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                        placeholder="Enter Office Name"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleCreateSpaceSubmit}
                        className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    );
};
