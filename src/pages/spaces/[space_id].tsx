import { useEffect, useState } from 'react';
import { getSpace, getSpaceUsers } from '@api/spaces';
import { useRouter } from 'next/router';
import { User, Space } from '@customTypes/index';
import { Avatar } from '@nextui-org/react';
import SpaceSettingsMenu from '@components/dropdowns/SpaceSettingsDropdown';
import { useSpace } from '@hooks/useQueries/useSpace';
import { useSpaceUsers } from '@hooks/useQueries/useSpaceUsers';

export default function Space() {
    const router = useRouter();
    const { space_id } = router.query;
    if (typeof space_id !== 'string') {
        router.replace('/');
    }

    const { data: space, isLoading: isLoadingSpace } = useSpace(
        space_id as string,
    );
    const { data: users, isLoading: isLoadingUsers } = useSpaceUsers(
        space_id as string,
    );

    if (isLoadingSpace || isLoadingUsers) return <p>Loading...</p>;

    const activeUsers = users?.filter((user) => user.status === 'approved');

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">
                {space?.name || 'Space'}
            </h1>

            <SpaceSettingsMenu users={users || []} />

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
