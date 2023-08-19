import { BallValuesType } from "../types/values/ballValues";

const playerSpeed = 25

export const BallValues: BallValuesType = {
    playerRadius: 25,
    pointBallRadius: 5,
    enemyBallRadius: 10,

    // Movement speed, etc
    playerSpeed: playerSpeed,
    pointBallSpeed: playerSpeed / 5,
    enemyBallSpeed: playerSpeed / 50, 
}
