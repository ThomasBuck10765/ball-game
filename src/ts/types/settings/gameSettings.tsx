import { BaseComponentProps } from "../general/baseComponentProps";
import { BallValuesType } from "../values/ballValues";
import { GameValuesType } from "../values/gameValues";

export type GameSettingsProps = BaseComponentProps & {
    ballValues: BallValuesType;
    setBallValues: any;
    gameValues: GameValuesType;
    setGameValues: any;
}
