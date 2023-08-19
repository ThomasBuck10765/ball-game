import { Component } from 'react';
import BackButton from '../general/backButton';
import { GameSettingsProps } from '../../types/settings/gameSettings';
import { setToFloatValueOrDefault, setToIntValueOrDefault } from '../../helpers/valueOrDefault';
import { BallValues } from '../../values/ballValues';
import { GameValues } from '../../values/gameValues';

export default class GameSettings extends Component<GameSettingsProps> {
    
    // Resets values to the defaults
    resetAllValues() {
        this.props.setBallValues({
            ...(BallValues)
        })

        this.props.setGameValues({
            ...(GameValues)
        })
    }

    setValue(isBallValue: boolean, updatedValue: any) {
        if (isBallValue) {
            this.props.setBallValues({
                ...(this.props.ballValues),
                ...(updatedValue)
            })
        }
        else {
            this.props.setGameValues({
                ...(this.props.gameValues),
                ...(updatedValue)
            })
        }
    }

    renderIndividualBooleanValue(isBallValue: boolean, fieldName: string, valueName: string, value: boolean) {
        return (
            <tr className='settings-menu__individual-setting __boolean'>
                <th>
                    <span>{fieldName}</span>
                </th>
                <th>
                    <input title={fieldName} type='checkbox' checked={value} onChange={() => {
                        let updatedValue: any = {};

                        updatedValue[valueName] = !value;
                        this.setValue(isBallValue, updatedValue);
                    }} />
                </th>
            </tr>
        );
    }

    renderIndividualValue(isBallValue: boolean, fieldName: string, valueName: string, value: number, floatValue?: boolean, defaultValue?: number) {
        return (
            <tr className='settings-menu__individual-setting __number'>
                <th>
                    <span>{fieldName}:</span>
                </th>
                <th>
                    <input title={fieldName} type='number' value={value} onChange={e => {
                        let updatedValue: any = {};

                        if (floatValue === undefined || !floatValue) {
                            updatedValue[valueName] = setToIntValueOrDefault(e.target.value, (defaultValue === undefined ? 1 : defaultValue))
                            this.setValue(isBallValue, updatedValue)
                        }
                        else {
                            updatedValue[valueName] = setToFloatValueOrDefault(e.target.value, (defaultValue === undefined ? 1 : defaultValue))
                            this.setValue(isBallValue, updatedValue)
                        }
                    }} />
                </th>
            </tr>
        );
    }

    renderBallValues() {
        const isBallValue = true;

        return (
            <table >
                <thead></thead>
                <tbody>
                    {this.renderIndividualValue(isBallValue, 'Player radius (px)', 'playerRadius', this.props.ballValues.playerRadius)}
                    {this.renderIndividualValue(isBallValue, 'Point ball radius (px)', 'pointBallRadius', this.props.ballValues.pointBallRadius)}
                    {this.renderIndividualValue(isBallValue, 'Enemy ball radius (px)', 'enemyBallRadius', this.props.ballValues.enemyBallRadius)}

                    <br />

                    {this.renderIndividualValue(isBallValue, 'Player speed', 'playerSpeed', this.props.ballValues.playerSpeed)}
                    {this.renderIndividualValue(isBallValue, 'Point ball speed', 'pointBallSpeed', this.props.ballValues.pointBallSpeed)}
                    {this.renderIndividualValue(isBallValue, 'Enemy ball speed', 'enemyBallSpeed', this.props.ballValues.enemyBallSpeed)}
                </tbody>
            </table>
        );
    }

    renderGameValues() {
        const isBallValue = false;

        return (
            <table>
                <thead></thead>
                <tbody>
                    {this.renderIndividualValue(isBallValue, 'Refresh rate (ms)', 'refreshRate', this.props.gameValues.refreshRate, true, 8.333333)}

                    <br />

                    {this.renderIndividualValue(isBallValue, 'Number of starting lives', 'numberOfStartingLives', this.props.gameValues.numberOfStartingLives)}

                    <br />

                    {this.renderIndividualValue(isBallValue, 'Point ball spawn rate (s)', 'pointBallSpawnRate', this.props.gameValues.pointBallSpawnRate)}
                    {this.renderIndividualValue(isBallValue, 'Point ball value', 'pointBallValue', this.props.gameValues.pointBallValue)}
                    {this.renderIndividualBooleanValue(isBallValue, 'Are point balls moving?', 'pointBallsMoving', this.props.gameValues.pointBallsMoving)}

                    <br />

                    {this.renderIndividualValue(isBallValue, 'Enemy ball spawn rate (s)', 'enemyBallSpawnRate', this.props.gameValues.enemyBallSpawnRate)}
                    {this.renderIndividualValue(isBallValue, 'Enemy ball spawn timeout (s)', 'enemyBallSpawnTimeout', this.props.gameValues.enemyBallSpawnTimeout)}
                    {this.renderIndividualBooleanValue(isBallValue, 'Are enemy balls moving?', 'enemyBallsMoving', this.props.gameValues.enemyBallsMoving)}

                    <br />

                    {this.renderIndividualValue(isBallValue, 'Minimum number of point balls', 'minimumNumberOfPointBalls', this.props.gameValues.minimumNumberOfPointBalls)}
                    {this.renderIndividualValue(isBallValue, 'Maximum number of enemy balls', 'maximumNumberOfEnemyBalls', this.props.gameValues.maximumNumberOfEnemyBalls)}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__game-items-container'>
                    <div className="settings-menu__title-container">
                        <span className="settings-menu__title">Game Settings</span>
                    </div>
                    <div className="settings-menu__description-container">
                        <span className='settings-menu__description'>Game settings can be changed here. Changes are saved automatically. Game settings are reset on page refresh/reload.</span>
                        <br />
                        <span className='settings-menu__description'>Note that making any changes here will prevent you from submitting high scores.</span>
                    </div>

                    <div className="settings-menu__settings-container">

                        <div className='settings-menu__type-settings-container __ball'>
                            <span className='settings-menu__type-settings-text'>Ball settings:</span>
                            {
                                this.renderBallValues()
                            }
                        </div>

                        <div className="settings-menu__type-settings-container __game">
                            <span className='settings-menu__type-settings-text'>Game settings:</span>
                            {
                                this.renderGameValues()
                            }
                        </div>

                        <button className='settings-menu__reset-settings' type='reset' onClick={() => this.resetAllValues()}>Reset all values</button>
                    </div>
                </div>
            </div>
        );
    }
}
