export type BallProps = {
    radius: number,
    coordinates: number[],
    color?: string,
};

export type EnemyBallProps = {
    radius: number,
    coordinates: number[],
    playerCoordinates: number[]
};
