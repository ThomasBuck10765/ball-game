import { BaseComponentProps } from "../general/baseComponentProps";
import { BallValuesType } from "../values/ballValues";
import { GameValuesType } from "../values/gameValues";

export type GameProps = BaseComponentProps & {
    ballValues: BallValuesType;
    gameValues: GameValuesType;
}
