import Table from '@components/utility/Table';
import { User } from '@customTypes/spaces';
import {
    Chip,
    ModalBody,
    ModalContent,
    ModalHeader,
    getKeyValue,
} from '@nextui-org/react';
import { Key, useCallback } from 'react';

type StatusColor = 'success' | 'danger' | 'warning';

interface StatusColorMapType {
    [key: string]: StatusColor;
}

const statusColorMap: StatusColorMapType = {
    approved: 'success',
    rejected: 'danger',
    requested: 'warning',
};

interface UsersModalProps {
    users: User[];
}

const UsersModal = ({ users }: UsersModalProps) => {
    const columns = [
        {
            key: 'name',
            label: 'NAME',
        },
        {
            key: 'status',
            label: 'STATUS',
        },
        {
            key: 'actions',
            label: 'ACTIONS',
        },
    ];

    const rows = users.map((user) => ({
        key: user.id,
        name: user.firstName + ' ' + user.lastName,
        status: user.status,
        actions: '',
    }));

    const renderCell = useCallback((user: any, columnKey: Key): any => {
        switch (columnKey) {
            case 'status':
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[user?.status] || 'default'}
                        size="sm"
                        variant="flat"
                    >
                        {user.status}
                    </Chip>
                );
            case 'actions':
                return <span>Remove</span>;
            default:
                return getKeyValue(user, columnKey);
        }
    }, []);

    return (
        <ModalContent>
            <ModalHeader>Users</ModalHeader>
            <ModalBody>
                <Table columns={columns} rows={rows} renderCell={renderCell} />
            </ModalBody>
        </ModalContent>
    );
};

export default UsersModal;
