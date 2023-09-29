import Dropdown from '../utility/Dropdown';
import { useModal } from '@hooks/useModal';
import AddUserModal from '@components/modals/AddUserModal';
import { useRouter } from 'next/router';
import UsersModal from '@components/modals/UsersModal';
import { User } from '@customTypes/spaces';

interface SpaceSettingsMenuProps {
    users: User[];
}

const SpaceSettingsMenu = ({ users }: SpaceSettingsMenuProps) => {
    const router = useRouter();
    const { showModal } = useModal();
    const { space_id } = router.query;

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
            action: () => {
                showModal(<UsersModal users={users} />);
            },
        },
    ];

    return <Dropdown items={items} dialogue={'Settings'} color="primary" />;
};

export default SpaceSettingsMenu;
