import { FC } from 'react';
import { Employee } from './EmployeeCard';

interface Props {
    employee: Employee;
    onClose: () => void;
}

const EmployeeModal: FC<Props> = ({ employee, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">{employee.name}</h2>
                <p>
                    <strong>Email:</strong> {employee.email}
                </p>
                <p>
                    <strong>Phone:</strong> {employee.phone}
                </p>
                <p>
                    <strong>Title:</strong> {employee.title}
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

export default EmployeeModal;
