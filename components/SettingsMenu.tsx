import { FC } from 'react';

interface Props {
    employeeId: number;
    onDelete: (id: number) => void;
    onProfileClick: () => void;
}

const SettingsMenu: FC<Props> = ({ employeeId, onDelete, onProfileClick }) => {
    const handleDelete = () => {
        onDelete(employeeId);
    };
    return (
        <div className="absolute top-0 left-0 w-0 h-6 opacity-0 group-hover:w-48 group-hover:opacity-100 transition-all duration-200 flex space-x-2">
            <button
                className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center"
                onClick={handleDelete}
            >
                <span role="img" aria-label="delete">
                    🗑️
                </span>
            </button>

            <button
                className="w-10 h-10 bg-green-500 text-white rounded-full flex justify-center items-center"
                onClick={onProfileClick}
            >
                <span role="img" aria-label="profile">
                    👤
                </span>
            </button>
        </div>
    );
};

export default SettingsMenu;
