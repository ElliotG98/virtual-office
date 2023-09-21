import { useEffect, useState } from 'react';
import { getSpace, getSpaceUsers } from '@api/spaces';
import { useRouter } from 'next/router';
import { User } from '@customTypes/index';
import { Avatar } from '@nextui-org/react';
import { useModal } from '@hooks/useModal';
import AddUserModal from '@components/modals/AddUserModal';

export default function Space() {
    const router = useRouter();
    const { space_id } = router.query;
    const { showModal } = useModal();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (typeof space_id !== 'string') {
            router.replace('/');
        } else {
            const space = await getSpace(space_id);
            console.log(space);
            const spaceUsers = await getSpaceUsers(space_id);
            console.log(spaceUsers);
            setUsers(spaceUsers);
        }
    };

    //Adding a user
    //When adding a user the user should be added as an active member of the space
    //The added user should see the space in their dashboard and be able to join and see other members

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">Space</h1>

            <button
                className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
                onClick={() => showModal(<AddUserModal />)}
            >
                Add User
            </button>

            <div
                className="relative mx-auto"
                style={{
                    width: 800,
                    height: 600,
                    background: '#eee',
                }}
            >
                {users.map((user) => (
                    <div key={user.id}>
                        <Avatar
                            name={user.firstName}
                            color={user.currentUser ? 'success' : 'default'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
