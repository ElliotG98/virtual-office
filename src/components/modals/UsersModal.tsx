import Table from '@components/utility/Table';
import { User as UserType } from '@customTypes/spaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    Chip,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tooltip,
    User,
    getKeyValue,
} from '@nextui-org/react';
import { Key, useCallback, useState } from 'react';
import {
    approveUserRequestToSpace,
    rejectUserRequestToSpace,
    removeUserFromSpace,
} from '@api/spaces';
import { HttpError } from '@customTypes/httpError';
import { useError } from '@hooks/useError';

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
    space_id: string;
    users: UserType[];
}

const UsersModal = ({ space_id, users }: UsersModalProps) => {
    const { addError, apiCall } = useError();
    const [disableActions, setDisableActions] = useState(false);

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

    const rows = users
        .map((user) => ({
            key: user.id,
            email: user.email,
            currentUser: user.currentUser || false,
            name: user.firstName + ' ' + user.lastName,
            status: user?.status,
            actions: '',
        }))
        .sort((a, b) => ((a?.status || '') > (b?.status || '') ? 1 : -1));

    const handleRemoveUser = async (userId: string) => {
        setDisableActions(true);

        await apiCall(() => removeUserFromSpace(space_id, userId));

        setDisableActions(false);
    };

    const handleApproveUserRequest = async (userId: string) => {
        setDisableActions(true);

        await apiCall(() => approveUserRequestToSpace(space_id, userId));
        setDisableActions(false);
    };

    const handleRejectUserRequest = async (userId: string) => {
        setDisableActions(true);

        await apiCall(() => rejectUserRequestToSpace(space_id, userId));

        setDisableActions(false);
    };

    const renderCell = useCallback((user: any, columnKey: Key): any => {
        switch (columnKey) {
            case 'name':
                return (
                    <User
                        avatarProps={{ radius: 'sm', src: user.avatar }}
                        description={user.email}
                        name={user.name}
                    >
                        {user.email}
                    </User>
                );
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
                return (
                    <div className="flex space-x-4">
                        {user.status === 'requested' && (
                            <>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    aria-label="reject request"
                                    disabled={disableActions}
                                    onClick={() =>
                                        handleRejectUserRequest(user.key)
                                    }
                                >
                                    <Tooltip content="Reject Request">
                                        <FontAwesomeIcon
                                            icon={faX}
                                            size="sm"
                                            className="fa-solid fa-x"
                                            style={{ color: '#001c40' }}
                                        />
                                    </Tooltip>
                                </Button>

                                <Button
                                    size="sm"
                                    isIconOnly
                                    disabled={disableActions}
                                    aria-label="accept request"
                                    onClick={() =>
                                        handleApproveUserRequest(user.key)
                                    }
                                >
                                    <Tooltip content="Accept Request">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="fa-solid fa-check"
                                            size="sm"
                                            style={{ color: '#001c40' }}
                                        />
                                    </Tooltip>
                                </Button>
                            </>
                        )}

                        {user.status === 'approved' && !user.currentUser && (
                            <Button
                                size="sm"
                                isIconOnly
                                disabled={disableActions}
                                aria-label="remove user"
                                onClick={() => handleRemoveUser(user.key)}
                            >
                                <Tooltip content="Remove User">
                                    <FontAwesomeIcon
                                        icon={faUserMinus}
                                        size="sm"
                                        className="fa-solid fa-user-minus"
                                        style={{ color: '#001c40' }}
                                    />
                                </Tooltip>
                            </Button>
                        )}
                    </div>
                );
            default:
                return getKeyValue(user, columnKey);
        }
    }, []);

    return (
        <ModalContent className="w-full">
            <ModalHeader>USERS</ModalHeader>
            <ModalBody>
                <Table columns={columns} rows={rows} renderCell={renderCell} />
            </ModalBody>
        </ModalContent>
    );
};

export default UsersModal;
