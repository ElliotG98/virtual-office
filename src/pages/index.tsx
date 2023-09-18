import React, { useState } from 'react';
import {
    CreateSpaceModal,
    JoinSpaceModal,
    LoginSignupModal,
} from '@components/modals';
import { SpacesCarousel } from '@components/carousel';
import useUser from '@hooks/useUser';

export default function Home() {
    const { user } = useUser();
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

            {user && <SpacesCarousel key={Number(spacesUpdated)} />}

            <LoginSignupModal />
        </div>
    );
}
