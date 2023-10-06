import { useRouter } from 'next/router';
import { Avatar } from '@nextui-org/react';
import SpaceSettingsMenu from '@components/dropdowns/SpaceSettingsDropdown';
import { useSpace } from '@hooks/useQueries/useSpace';
import { useSpaceUsers } from '@hooks/useQueries/useSpaceUsers';
import { useEffect } from 'react';
import Space from '@components/Space';

export default function SpacePage() {
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

    const activeUsers =
        users?.filter((user) => user.status === 'approved') || [];
    const userRequests =
        users?.filter((user) => user.status === 'requested') || [];

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">
                {space?.name || 'Space'}
            </h1>

            <SpaceSettingsMenu
                userRequests={userRequests?.length || 0}
                users={users || []}
            />

            <Space users={activeUsers} />
        </div>
    );
}
