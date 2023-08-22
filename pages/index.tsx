import React from 'react';
import {
    CreateSpaceModal,
    JoinSpaceModal,
    LoginSignupModal,
} from '@components/modals';
import { useAuth } from '@lib/auth';
import { SpacesCarousel } from '@components/carousel';

export default function Home() {
    const { isLoggedIn } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-4">
                <CreateSpaceModal />
                <JoinSpaceModal />
            </div>

            {isLoggedIn && <SpacesCarousel />}

            <LoginSignupModal />
        </div>
    );
}
