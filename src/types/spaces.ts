export type UserSpaceStatus = 'approved' | 'requested' | 'rejected';

export interface Space {
    name: string;
    space_id: string;
    status: UserSpaceStatus;
}

export interface User {
    id?: string;
    status?: UserSpaceStatus;
    currentUser?: boolean;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
}
