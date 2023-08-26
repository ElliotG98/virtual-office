import React, { useEffect, useState } from 'react';
import { UserDropdown } from '@components/UserDropdown';
import { getUser } from '@api/users';
import useRequireLogin from '@hooks/useRequireLogin';
import { useAuth } from '@lib/auth';
import { User } from '@customTypes/index';

interface LayoutProps {
    children: React.ReactNode;
}

export const RootLayout = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<User | null>(null);
    const { isLoggedIn } = useAuth();
    const { requireLogin } = useRequireLogin();

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserDetails = async () => {
                try {
                    const userDetails = await getUser();
                    console.log('userDetails', userDetails);
                    setUser(userDetails);
                } catch (error) {
                    console.error('Could not fetch user details', error);
                }
            };
            fetchUserDetails();
        } else {
            setUser(null);
        }
    }, [isLoggedIn]);

    console.log('user', user);
    return (
        <div className="layout">
            <div className="top-right">
                {user ? (
                    <UserDropdown userName={user.name} userTitle={user.title} />
                ) : (
                    <button
                        onClick={() => requireLogin(() => {})}
                        className="sign-in-button"
                    >
                        Sign In
                    </button>
                )}
            </div>
            {children}
        </div>
    );
};
