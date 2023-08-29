import React, { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';
import { UserDropdown } from '@components/UserDropdown';
import { getUser } from '@api/users';
import useRequireLogin from '../hooks/useRequireLogin';
import { useAuth } from '@hooks/useAuth';
import { User } from '../types/index';

interface LayoutProps {
    children: React.ReactNode;
}

export const RootLayout = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { isLoggedIn } = useAuth();
    const { requireLogin } = useRequireLogin();

    useEffect(() => {
        setIsLoaded(false);

        if (isLoggedIn) {
            const fetchUserDetails = async () => {
                try {
                    const userDetails = await getUser();
                    setUser(userDetails);
                } catch (error) {
                    console.error('Could not fetch user details', error);
                } finally {
                    setIsLoaded(true);
                }
            };
            fetchUserDetails();
        } else {
            setUser(null);
            setIsLoaded(true);
        }
    }, [isLoggedIn]);

    return (
        <div className="layout">
            <div className="top-right">
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    {user ? (
                        <UserDropdown
                            userName={user.name}
                            userTitle={user.title}
                        />
                    ) : (
                        <button
                            onClick={() => requireLogin(() => {})}
                            className="sign-in-button"
                        >
                            Sign In
                        </button>
                    )}
                </Skeleton>
            </div>
            {children}
        </div>
    );
};
