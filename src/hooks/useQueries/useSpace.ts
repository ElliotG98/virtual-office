import { useQuery } from '@tanstack/react-query';
import { getSpace } from '@api/spaces';

export const useSpace = (space_id: string) => {
    return useQuery(['space', space_id], () => getSpace(space_id));
};
