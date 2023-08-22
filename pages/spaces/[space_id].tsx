import { useEffect, useState } from 'react';
import UserCard from '@components/UserCard';
import UserModal from '@components/UserModal';
import { getSpace, getSpaceUsers } from '@api/spaces';
import { useRouter } from 'next/router';
import { User } from '@customTypes/index';
import {
    DESK_DIMENSION,
    MIN_DISTANCE_BETWEEN_DESKS,
    OFFICE_DIMENSION,
    Point,
} from '@customTypes/officeDimensions';

type Desk = {
    position: Point;
    assignedTo?: User;
};

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

    const isOverlapping = (desk1: Point, desk2: Point): boolean => {
        return (
            desk1.x <
                desk2.x + DESK_DIMENSION.width + MIN_DISTANCE_BETWEEN_DESKS &&
            desk1.x + DESK_DIMENSION.width >
                desk2.x - MIN_DISTANCE_BETWEEN_DESKS &&
            desk1.y <
                desk2.y + DESK_DIMENSION.height + MIN_DISTANCE_BETWEEN_DESKS &&
            desk1.y + DESK_DIMENSION.height >
                desk2.y - MIN_DISTANCE_BETWEEN_DESKS
        );
    };

    const generateDesks = (deskCount: number): Point[] => {
        const desks: Point[] = [];

        for (let i = 0; i < deskCount; i++) {
            let newDeskPosition: Point;

            do {
                newDeskPosition = {
                    x:
                        Math.random() *
                        (OFFICE_DIMENSION.width - DESK_DIMENSION.width),
                    y:
                        Math.random() *
                        (OFFICE_DIMENSION.height - DESK_DIMENSION.height),
                };
            } while (
                desks.some((desk) => isOverlapping(newDeskPosition, desk))
            );

            desks.push(newDeskPosition);
        }

        return desks;
    };

    const assignDeskToUser = (user: User) => {
        const availableDesks = desks.filter((desk) => !desk.assignedTo);
        const randomDeskIndex = Math.floor(
            Math.random() * availableDesks.length,
        );
        const desk = availableDesks[randomDeskIndex];

        // Associate the desk with the user
        user.desk = desk.position;

        // Update the desks state with the assigned user
        const updatedDesks = desks.map((d) => {
            if (d.position === desk.position) {
                d.assignedTo = user;
            }
            return d;
        });
        setDesks(updatedDesks);
    };

    const [desks, setDesks] = useState<Desk[]>(generateDesks(20));

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
                className="relative mx-auto"
                style={{
                    width: OFFICE_DIMENSION.width,
                    height: OFFICE_DIMENSION.height,
                    background: '#eee',
                }}
            >
                {desks.map((desk, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            width: DESK_DIMENSION.width,
                            height: DESK_DIMENSION.height,
                            left: desk.position.x,
                            top: desk.position.y,
                            backgroundColor: desk.assignedTo
                                ? '#a0a0a0'
                                : '#d0d0d0',
                            border: '1px solid black',
                        }}
                    ></div>
                ))}
            </div>

            {/* <div
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
            )} */}
        </div>
    );
}
