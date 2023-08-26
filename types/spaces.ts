export type UserSpaceStatus = 'active' | 'requested' | 'removed';

export interface Space {
    name: string;
    space_id: string;
    status?: string;
}

export interface User {
    name: string;
    email: string;
    title: string;
}
