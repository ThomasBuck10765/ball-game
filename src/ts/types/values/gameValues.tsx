export type GameValuesType = {
    refreshRate: number;

    playerSpeed: number;
    playerRadius: number;
    numberOfStartingLives: number;

    pointBallSpawnRate: number;
    pointBallValue: number;
    pointBallsMoving: boolean;
    minimumNumberOfPointBalls: number;

    enemyBallSpawnRate: number;
    enemyBallSpawnTimeout: number;
    enemyBallsMoving: boolean;
    maximumNumberOfEnemyBalls: number;
}
