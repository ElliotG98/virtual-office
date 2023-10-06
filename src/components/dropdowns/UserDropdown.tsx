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
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';

interface UserDropdownProps {
    userName: string;
    userTitle: string;
}

export const UserDropdown = ({ userName, userTitle }: UserDropdownProps) => {
    const router = useRouter();
    const { setUser } = useUser();

    const dropdownItems = [
        {
            key: 'edit-profile',
            label: 'Edit Profile',
            action: async () => {
                //TODO: get update logic, how is update going to be handled (modal?)
                // const updatedUser = { title: 'New Title' };
                // await updateUser(updatedUser);
            },
        },
        {
            key: 'logout',
            label: 'Logout',
            action: () => {
                logoutUser();
                setUser(null);
                router.replace('/');
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
