import { User } from '@customTypes/spaces';
import { Avatar } from '@nextui-org/react';

interface SpaceProps {
    users: User[];
}

const Space = ({ users }: SpaceProps) => {
    return (
        <div
            className="relative mx-auto"
            style={{
                width: 800,
                height: 600,
                background: '#eee',
            }}
        >
            {users?.map((user) => (
                <div key={'activeUser-' + user.id}>
                    <Avatar
                        key={'avatar-' + user.id}
                        name={user.firstName}
                        color={user.currentUser ? 'success' : 'default'}
                    />
                </div>
            ))}
        </div>
    );
};

export default Space;
