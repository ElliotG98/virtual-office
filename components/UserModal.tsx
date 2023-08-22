import { FC } from 'react';
import { User } from '@customTypes/index';

interface Props {
    user: User;
    onClose: () => void;
}

const UserModal: FC<Props> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">{user.name}</h2>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                    <strong>Title:</strong> {user.title}
                </p>

                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white rounded px-4 py-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserModal;
