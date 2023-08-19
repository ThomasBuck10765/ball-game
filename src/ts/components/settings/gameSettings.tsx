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

    renderBallValues() {
        return (
        <div>
            
            <div>
                <label>
                    <span>pointBallRadius</span>
                    <input type='number' value={this.props.ballValues.pointBallRadius} onChange={e => this.props.setBallValues({
                        ...(this.props.ballValues),
                        ...{
                            pointBallRadius: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>enemyBallRadius</span>
                    <input type='number' value={this.props.ballValues.enemyBallRadius} onChange={e => this.props.setBallValues({
                        ...(this.props.ballValues),
                        ...{
                            enemyBallRadius: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    <span>playerSpeed</span>
                    <input type='number' value={this.props.ballValues.playerSpeed} onChange={e => this.props.setBallValues({
                        ...(this.props.ballValues),
                        ...{
                            playerSpeed: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />                    
                </label>
            </div>
            <div>
                <label>
                    <span>pointBallSpeed</span>
                    <input type='number' value={this.props.ballValues.pointBallSpeed} onChange={e => this.props.setBallValues({
                        ...(this.props.ballValues),
                        ...{
                            pointBallSpeed: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />                    
                </label>
            </div>
            <div>
                <label>
                    <span>enemyBallSpeed</span>
                    <input type='number' value={this.props.ballValues.enemyBallSpeed} onChange={e => this.props.setBallValues({
                        ...(this.props.ballValues),
                        ...{
                            enemyBallSpeed: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />                    
                </label>
            </div>
        </div>
        );
    }

    renderGameValues() {
        return (
        <div>
            <div>
                <label>
                    <span>refreshRate</span>
                    <input type='number' value={this.props.gameValues.refreshRate} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            refreshRate: setToFloatValueOrDefault(e.target.value, 8.333333)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>playerSpeed</span>
                    <input type='number' value={this.props.gameValues.playerSpeed} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            playerSpeed: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>playerRadius</span>
                    <input type='number' value={this.props.gameValues.playerRadius} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            playerRadius: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>numberOfStartingLives</span>
                    <input type='number' value={this.props.gameValues.numberOfStartingLives} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            numberOfStartingLives: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>pointBallSpawnRate</span>
                    <input type='number' value={this.props.gameValues.pointBallSpawnRate} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            pointBallSpawnRate: setToFloatValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>pointBallValue</span>
                    <input type='number' value={this.props.gameValues.pointBallValue} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            pointBallValue: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>
            
            <div>
                <label>
                    <span>pointBallsMoving</span>
                    <input type='checkbox' checked={this.props.gameValues.pointBallsMoving} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            pointBallsMoving: !this.props.gameValues.pointBallsMoving
                        }
                    })}/>
                </label>
            </div>

            <div>
                <label>
                    <span>minimumNumberOfPointBalls</span>
                    <input type='number' value={this.props.gameValues.minimumNumberOfPointBalls} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            minimumNumberOfPointBalls: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>enemyBallSpawnRate</span>
                    <input type='number' value={this.props.gameValues.enemyBallSpawnRate} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            enemyBallSpawnRate: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>enemyBallSpawnTimeout</span>
                    <input type='number' value={this.props.gameValues.enemyBallSpawnTimeout} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            enemyBallSpawnTimeout: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>
            
            <div>
                <label>
                    <span>enemyBallsMoving</span>
                    <input type='checkbox' checked={this.props.gameValues.enemyBallsMoving} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            enemyBallsMoving: !this.props.gameValues.enemyBallsMoving
                        }
                    })} />
                </label>
            </div>

            <div>
                <label>
                    <span>maximumNumberOfEnemyBalls</span>
                    <input type='number' value={this.props.gameValues.maximumNumberOfEnemyBalls} onChange={e => this.props.setGameValues({
                        ...(this.props.gameValues),
                        ...{
                            maximumNumberOfEnemyBalls: setToIntValueOrDefault(e.target.value, 1)
                        }
                    })} />
                </label>
            </div>

        </div>
        );
    }

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__game-items-container'>
                    Game settings can be changed here. Changes are saved automatically. TODO: Note that making any changes here will prevent you from saving/submitting high scores 

                    <br></br>
                    <div>Ball Values:</div>
                    {
                        this.renderBallValues()
                    }

                    <br></br>
                    <div>Game Values:</div>
                    {
                        this.renderGameValues()
                    }

                    <br></br>
                    <button type='reset' onClick={() => this.resetAllValues()}>Reset all values</button>
                </div>
            </div>
        );
    }
}
