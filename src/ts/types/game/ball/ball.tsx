export type BaseBallProps = {
    radius: number,
    coordinates: number[],
}

export type BallProps = BaseBallProps & {
    color?: string,
    speed: number,
    isMoving: boolean,
    refreshRate: number,
};

export type EnemyBallProps = BaseBallProps & {
    playerCoordinates: number[],
    speed: number,
    isMoving: boolean,
    enemyBallTimeout: number,
    refreshRate: number,
};

export type PointBallType = BaseBallProps & {
    id: number,
    color?: string,
}

export type EnemyBallType = BaseBallProps & {
    id: number
}
