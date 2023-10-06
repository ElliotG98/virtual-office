import Dropdown from '../utility/Dropdown';
import { useModal } from '@hooks/useModal';
import AddUserModal from '@components/modals/AddUserModal';
import { useRouter } from 'next/router';
import UsersModal from '@components/modals/UsersModal';
import { User } from '@customTypes/spaces';
import { useEffect } from 'react';

interface SpaceSettingsMenuProps {
    users: User[];
    userRequests: number;
}

const SpaceSettingsMenu = ({ users, userRequests }: SpaceSettingsMenuProps) => {
    const router = useRouter();
    const { showModal, updateModal } = useModal();
    const { space_id } = router.query;

    useEffect(() => {
        if (users) {
            updateModal(
                <UsersModal space_id={space_id as string} users={users} />,
            );
        }
    }, [users]);

    const items = [
        {
            key: 'addUser',
            label: 'Add User',
            action: () => {
                showModal(<AddUserModal space_id={space_id as string} />);
            },
        },
        {
            key: 'users',
            label: 'Users',
            badge: userRequests,
            action: () => {
                showModal(
                    <UsersModal space_id={space_id as string} users={users} />,
                );
            },
        },
    ];

    return <Dropdown items={items} dialogue={'Settings'} color="primary" />;
};

export default SpaceSettingsMenu;
