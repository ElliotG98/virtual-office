import { getSpaceUsers } from '@api/spaces';
import { useQuery } from '@tanstack/react-query';

export const useSpaceUsers = (space_id: string) => {
    return useQuery(['spaceUsers', space_id], () => getSpaceUsers(space_id));
};
