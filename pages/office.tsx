import { useState } from 'react';
import EmployeeCard, { Employee } from '@components/EmployeeCard';
import EmployeeModal from '@components/EmployeeModal';

export default function Office() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );
    const maxEmployees = 100;
    const zoomLevel = employees.length > 10 ? 'scale(0.5)' : 'scale(1)';

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

    const addEmployee = () => {
        if (employees.length < maxEmployees) {
            const id = new Date().getTime(); // Unique ID based on timestamp
            setEmployees([...employees, { id, name: generateRandomName() }]);
        }
    };

    const removeEmployee = (id: number) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    const openEmployeeProfile = (employee: Employee) => {
        setSelectedEmployee(employee);
    };

    return (
        <div className="min-h-screen bg-gray-800 overflow-hidden">
            <h1 className="text-white text-center py-4">Office Space</h1>

            <button
                onClick={addEmployee}
                className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
            >
                Add Employee
            </button>
            <div
                className="flex flex-wrap justify-center transform transition-transform duration-300"
                style={{ transform: zoomLevel }}
            >
                {employees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onDelete={removeEmployee}
                        onProfileClick={() => openEmployeeProfile(employee)}
                    />
                ))}
            </div>
            {selectedEmployee && (
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
}
