import React, {Component} from 'react';
import { ScoreProps } from '../../types/score/score.tsx';


export class Score extends Component<ScoreProps> {
    constructor(props: ScoreProps) {
        super(props);
    }    

    render() {
        return (
            <div className='score-container'>
                <div className='time'>{this.props.time}</div>
                <div className='score'>{this.props.score}</div>
            </div>
        );
    }
}
