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
import { useError } from '@hooks/useError';
import { useQueryClient } from '@tanstack/react-query';

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
    const { apiCall } = useError();
    const queryClient = useQueryClient();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
        {},
    );

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

    const handleAction = async (
        userId: string,
        action: 'approve' | 'reject' | 'remove',
    ) => {
        setLoadingStates({ ...loadingStates, [userId]: true });

        const actions = {
            approve: async () =>
                apiCall(() => approveUserRequestToSpace(space_id, userId)),
            reject: async () =>
                apiCall(() => rejectUserRequestToSpace(space_id, userId)),
            remove: async () =>
                apiCall(() => removeUserFromSpace(space_id, userId)),
        };

        await actions[action]();

        queryClient.invalidateQueries({ queryKey: ['spaceUsers'] });

        setLoadingStates({ ...loadingStates, [userId]: false });
    };

    const renderCell = useCallback(
        (user: any, columnKey: Key): any => {
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
                                        disabled={loadingStates[user.key]}
                                        isLoading={loadingStates[user.key]}
                                        onClick={() =>
                                            handleAction(user.key, 'reject')
                                        }
                                    >
                                        {!loadingStates[user.key] && (
                                            <Tooltip content="Reject Request">
                                                <FontAwesomeIcon
                                                    icon={faX}
                                                    size="sm"
                                                    className="fa-solid fa-x"
                                                    style={{ color: '#001c40' }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Button>

                                    <Button
                                        size="sm"
                                        isIconOnly
                                        disabled={loadingStates[user.key]}
                                        isLoading={loadingStates[user.key]}
                                        aria-label="approve request"
                                        onClick={() =>
                                            handleAction(user.key, 'approve')
                                        }
                                    >
                                        {!loadingStates[user.key] && (
                                            <Tooltip content="Accept Request">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="fa-solid fa-check"
                                                    size="sm"
                                                    style={{ color: '#001c40' }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Button>
                                </>
                            )}

                            {user.status === 'approved' &&
                                !user.currentUser && (
                                    <Button
                                        size="sm"
                                        isIconOnly
                                        disabled={loadingStates[user.key]}
                                        isLoading={loadingStates[user.key]}
                                        aria-label="remove user"
                                        onClick={() =>
                                            handleAction(user.key, 'remove')
                                        }
                                    >
                                        {!loadingStates[user.key] && (
                                            <Tooltip content="Remove User">
                                                <FontAwesomeIcon
                                                    icon={faUserMinus}
                                                    size="sm"
                                                    className="fa-solid fa-user-minus"
                                                    style={{ color: '#001c40' }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Button>
                                )}
                        </div>
                    );
                default:
                    return getKeyValue(user, columnKey);
            }
        },
        [loadingStates, users],
    );

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
