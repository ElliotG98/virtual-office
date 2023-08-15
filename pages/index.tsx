import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@components/Modal';
import LoginForm from '@components/forms/Login';
import SignupForm from '@components/forms/Signup';
import { useAuth } from '@config/auth';
import { createSpace } from '@api/spaces';

export default function Home() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [spaceName, setSpaceName] = useState('');
    const [showSpaceNameInput, setShowSpaceNameInput] = useState(false);

    const handleCreateSpaceClick = async () => {
        if (isLoggedIn) {
            if (spaceName) {
                const response = await createSpace(spaceName);

                if (response?.ok) {
                    router.push(`/spaces`);
                }
            } else {
                setShowSpaceNameInput(true);
            }
        } else {
            setShowModal(true);
            setMode('login');
        }
    };

    const handleLoginSuccess = () => {
        setShowModal(false);
        setIsLoggedIn(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={handleCreateSpaceClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Space
            </button>

            {showSpaceNameInput && (
                <div>
                    <input
                        type="text"
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                        placeholder="Enter Office Name"
                    />
                    <button onClick={handleCreateSpaceClick}>Submit</button>
                </div>
            )}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {mode === 'login' ? (
                    <LoginForm onSuccess={handleLoginSuccess} />
                ) : (
                    <SignupForm onSuccess={handleLoginSuccess} />
                )}
                <button
                    onClick={() =>
                        setMode(mode === 'login' ? 'signup' : 'login')
                    }
                    className="text-sm underline"
                >
                    {mode === 'login'
                        ? 'Need an account? Sign Up'
                        : 'Already have an account? Login'}
                </button>
            </Modal>
        </div>
    );
}
