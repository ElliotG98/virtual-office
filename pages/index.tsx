import React, { useState } from 'react';
import {
    CreateSpaceModal,
    JoinSpaceModal,
    LoginSignupModal,
} from '@components/modals';
import { useAuth } from '@lib/auth';
import { SpacesCarousel } from '@components/carousel';

export default function Home() {
    const { isLoggedIn } = useAuth();
    const [spacesUpdated, setSpacesUpdated] = useState(false);

    const handleJoinSuccess = () => {
        setSpacesUpdated(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-4">
                <CreateSpaceModal />
                <JoinSpaceModal onSuccess={handleJoinSuccess} />
            </div>

            {isLoggedIn && <SpacesCarousel key={Number(spacesUpdated)} />}

            <LoginSignupModal />
        </div>
    );
}
