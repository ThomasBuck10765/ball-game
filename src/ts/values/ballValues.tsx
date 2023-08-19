import { BallValuesType } from "../types/values/ballValues";
import { GameValues } from "./gameValues";

const playerSpeed = GameValues.playerSpeed;

export const BallValues: BallValuesType = {
    pointBallRadius: 5,
    enemyBallRadius: 10,

    // Movement speed, etc
    playerSpeed: playerSpeed,
    pointBallSpeed: playerSpeed / 5,
    enemyBallSpeed: playerSpeed / 50, 
}
