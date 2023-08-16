import { useEffect, useState } from 'react';
import UserCard from '@components/UserCard';
import UserModal from '@components/UserModal';
import { getSpace, getSpaceUsers } from '@api/spaces';
import { useRouter } from 'next/router';
import { User } from '@customTypes/index';

export default function Space() {
    const router = useRouter();
    const { space_id } = router.query;

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const maxUsers = 100;
    const zoomLevel = users.length > 10 ? 'scale(0.5)' : 'scale(1)';

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
            setUsers([...users, spaceUsers]);
        }
    };

    const generateRandomName = () => {
        const names = [
            'Alice',
            'Bob',
            'Charlie',
            'Diana',
            'Eve',
            'Frank',
            'Grace',
        ];
        return names[Math.floor(Math.random() * names.length)];
    };

    const addUser = () => {
        // if (users.length < maxUsers) {
        //     const id = new Date().getTime(); // Unique ID based on timestamp
        //     setUsers([...users, { id, name: generateRandomName() }]);
        // }
    };

    const removeUser = (id: string) => {
        //TODO: remove user from space -> refetch users
        setUsers(users.filter((emp) => emp.id !== id));
    };

    const openUserProfile = (user: User) => {
        setSelectedUser(user);
    };

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">Space</h1>

            <button
                onClick={addUser}
                className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
            >
                Add User
            </button>
            <div
                className="flex flex-wrap justify-center transform transition-transform duration-300"
                style={{ transform: zoomLevel }}
            >
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDelete={removeUser}
                        onProfileClick={() => openUserProfile(user)}
                    />
                ))}
            </div>
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}
