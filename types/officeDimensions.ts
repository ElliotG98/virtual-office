export type Point = {
    x: number;
    y: number;
};

export type Dimension = {
    width: number;
    height: number;
};

export const OFFICE_DIMENSION: Dimension = {
    width: 800,
    height: 600,
};

export const DESK_DIMENSION: Dimension = {
    width: 60,
    height: 40,
};

export const MIN_DISTANCE_BETWEEN_DESKS = 30;
