import React, {Component} from 'react';
import { ScoreProps } from '../../types/score/score.tsx';

export class Score extends Component<ScoreProps> {
    
    render() {
        return (
            <div className='score-container'>
                <div className='time'>{Math.floor(this.props.time)} s</div>
                <div className='score'>{this.props.score}</div>
            </div>
        );
    }
}
