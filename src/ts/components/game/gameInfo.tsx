import {Component} from 'react';
import { GameInfoProps } from '../../types/game/gameInfo.tsx';

export default class GameInfo extends Component<GameInfoProps> {
    
    render() {
        return (
            <div className='game-info-container'>
                <div className='time'>{Math.floor(this.props.time)} s</div>
                <div className='score'>{this.props.score}</div>
                { this.props.showLives &&
                    <div className={`lives __${this.props.lives}`}>{this.props.lives}</div> }
            </div>
        );
    }
}
