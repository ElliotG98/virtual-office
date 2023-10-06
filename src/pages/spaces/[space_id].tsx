import { useRouter } from 'next/router';
import { Space } from '@customTypes/index';
import { Avatar, Badge } from '@nextui-org/react';
import SpaceSettingsMenu from '@components/dropdowns/SpaceSettingsDropdown';
import { useSpace } from '@hooks/useQueries/useSpace';
import { useSpaceUsers } from '@hooks/useQueries/useSpaceUsers';
import { useEffect } from 'react';

export default function Space() {
    const router = useRouter();
    const { space_id } = router.query;

    useEffect(() => {
        if (typeof space_id !== 'string') {
            router.replace('/');
        }
    }, [space_id, router]);

    const { data: space, isLoading: isLoadingSpace } = useSpace(
        space_id as string,
    );
    const { data: users, isLoading: isLoadingUsers } = useSpaceUsers(
        space_id as string,
    );

    if (isLoadingSpace || isLoadingUsers) return <p>Loading...</p>;

    const activeUsers = users?.filter((user) => user.status === 'approved');
    const userRequests = users?.filter((user) => user.status === 'requested');

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">
                {space?.name || 'Space'}
            </h1>

            <SpaceSettingsMenu
                userRequests={userRequests?.length || 0}
                users={users || []}
            />

            {/* TODO: CREATE SPACE SECTION COMPONENT */}

            <div
                className="relative mx-auto"
                style={{
                    width: 800,
                    height: 600,
                    background: '#eee',
                }}
            >
                {activeUsers?.map((user) => (
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
