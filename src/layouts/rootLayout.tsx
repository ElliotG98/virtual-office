import React from 'react';
import { Skeleton } from '@nextui-org/react';
import { UserDropdown } from '@components/dropdowns/UserDropdown';
import useRequireLogin from '../hooks/useRequireLogin';
import useUser from '@hooks/useUser';

interface LayoutProps {
    children: React.ReactNode;
}

export const RootLayout = ({ children }: LayoutProps) => {
    const { user, isLoading } = useUser();
    const { requireLogin } = useRequireLogin();

    return (
        <div className="layout">
            <div className="top-right">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
                    {user ? (
                        <UserDropdown
                            userName={user.firstName + ' ' + user.lastName}
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
