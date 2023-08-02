import { FC } from 'react';
import SettingsMenu from './SettingsMenu';

export interface Employee {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    title?: string;
}

interface Props {
    employee: Employee;
    onDelete: (id: number) => void;
    onProfileClick: () => void;
}

const EmployeeCard: FC<Props> = ({ employee, onDelete, onProfileClick }) => {
    const initial = employee.name[0].toUpperCase();

    return (
        <div className="m-4 group relative">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center">
                {initial}
            </div>

            <div className="w-64 h-32 bg-gradient-to-r from-brown-700 via-brown-600 to-brown-700 mb-2 relative hover:bg-opacity-80 transition-all duration-200">
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {employee.name}
                </div>
                <SettingsMenu
                    employeeId={employee.id}
                    onDelete={onDelete}
                    onProfileClick={onProfileClick}
                />
            </div>
        </div>
    );
};

export default EmployeeCard;
