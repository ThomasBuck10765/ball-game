import {Component} from 'react';
import { GameInfoProps } from '../../types/gameInfo/gameInfo.tsx';

export class GameInfo extends Component<GameInfoProps> {
    
    render() {
        return (
            <div className='game-info-container'>
                <div className='time'>{Math.floor(this.props.time)} s</div>
                <div className='score'>{this.props.score}</div>
                <div className={`lives __${this.props.lives}`}>{this.props.lives}</div>
            </div>
        );
    }
}
