import React from 'react';
import {
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';

interface UserDropdownProps {
    userName: string;
    userTitle: string;
}

export const UserDropdown = ({ userName, userTitle }: UserDropdownProps) => {
    const dropdownItems = [
        {
            key: 'edit-profile',
            label: 'Edit Profile',
        },
        {
            key: 'logout',
            label: 'Logout',
        },
    ];

    const handleDropdownItemClick = (key: string) => {
        switch (key) {
            case 'edit-profile':
                // Implement edit profile logic here
                break;
            case 'logout':
                // Implement logout logic here
                break;
            default:
                break;
        }
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
