import { useEffect, useState } from 'react';
import { getSpace, getSpaceUsers } from '@api/spaces';
import { useRouter } from 'next/router';
import { User, Space } from '@customTypes/index';
import { Avatar } from '@nextui-org/react';
import SpaceSettingsMenu from '@components/dropdowns/SpaceSettingsDropdown';

export default function Space() {
    const router = useRouter();
    const { space_id } = router.query;
    const [users, setUsers] = useState<User[]>([]);
    const [space, setSpace] = useState<Space | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (typeof space_id !== 'string') {
            router.replace('/');
        } else {
            const [space, spaceUsers] = await Promise.all([
                getSpace(space_id),
                getSpaceUsers(space_id),
            ]);
            console.log('space', space);
            console.log('spaceUsers', spaceUsers);
            setUsers(spaceUsers);
            setSpace(space);
        }
    };

    const activeUsers = users.filter((user) => user.status === 'approved');
    const requestedUsers = users.filter((user) => user.status === 'requested');

    /**
     * TODO:
     * - Test adding a user
     * - Display notifications to the user about space requests
     */

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">
                {space?.name || 'Space'}
            </h1>

            <SpaceSettingsMenu />

            <div
                className="relative mx-auto"
                style={{
                    width: 800,
                    height: 600,
                    background: '#eee',
                }}
            >
                {activeUsers.map((user) => (
                    <div key={'activeUser-' + user.id}>
                        <Avatar
                            key={'avatar-' + user.id}
                            name={user.firstName}
                            color={user.currentUser ? 'success' : 'default'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
