import Dropdown from '../utility/Dropdown';
import { useModal } from '@hooks/useModal';
import AddUserModal from '@components/modals/AddUserModal';
import { useRouter } from 'next/router';

const SpaceSettingsMenu = () => {
    const router = useRouter();
    const { showModal } = useModal();
    const { space_id } = router.query;

    const items = [
        {
            key: 'addUser',
            label: 'Add User',
            action: () =>
                showModal(<AddUserModal space_id={space_id as string} />),
        },
    ];

    return <Dropdown items={items} dialogue={'Settings'} />;
};

export default SpaceSettingsMenu;
