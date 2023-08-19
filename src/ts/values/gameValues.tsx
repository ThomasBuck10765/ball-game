export const GameValues = {
    refreshRate: 16.666667, // in ms, leads to roughly 60 frames per second

    numberOfStartingLives: 3,

    pointBallSpawnRate: 1, // in seconds
    pointBallValue: 100,
    pointBallsMoving: true,
    minimumNumberOfPointBalls: 3,

    enemyBallSpawnRate: 30, // in seconds
    enemyBallSpawnTimeout: 5, // in seconds; TODO: actual timeout slightly less than given value, fix
    enemyBallsMoving: true,
    maximumNumberOfEnemyBalls: 10
}
