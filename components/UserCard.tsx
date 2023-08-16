import { FC } from 'react';
import SettingsMenu from './SettingsMenu';
import { User } from '@customTypes/index';

interface Props {
    user: User;
    onDelete: (id: string) => void;
    onProfileClick: () => void;
}

const UserCard: FC<Props> = ({ user, onDelete, onProfileClick }) => {
    const initial = user.name[0].toUpperCase();

    return (
        <div className="m-4 group relative">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center">
                {initial}
            </div>

            <div className="w-64 h-32 bg-gradient-to-r from-brown-700 via-brown-600 to-brown-700 mb-2 relative hover:bg-opacity-80 transition-all duration-200">
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {user.name}
                </div>
                <SettingsMenu
                    userId={user.id}
                    onDelete={onDelete}
                    onProfileClick={onProfileClick}
                />
            </div>
        </div>
    );
};

export default UserCard;
