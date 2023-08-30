import React from 'react';
import {
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';
import { logoutUser } from '@services/cognito';
import { useAuth } from '@hooks/useAuth';

interface UserDropdownProps {
    userName: string;
    userTitle: string;
}

export const UserDropdown = ({ userName, userTitle }: UserDropdownProps) => {
    const { setIsLoggedIn } = useAuth();
    const dropdownItems = [
        {
            key: 'edit-profile',
            label: 'Edit Profile',
            action: () => {
                console.log('Edit profile clicked');
            },
        },
        {
            key: 'logout',
            label: 'Logout',
            action: () => {
                logoutUser();
                setIsLoggedIn(false);
            },
        },
    ];

    const handleDropdownItemClick = (key: string) => {
        const item = dropdownItems.find((i) => i.key === key);
        item?.action();
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light">
                    <User name={userName} description={userTitle} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" items={dropdownItems}>
                {(item: any) => (
                    <DropdownItem
                        key={String(item.key)}
                        onClick={() => handleDropdownItemClick(item.key!)}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
