import { Component } from 'react';
import { HighScoresProps } from '../../types/high-scores/highScores';
import { BackButton } from '../general/backButton';

export class HighScores extends Component<HighScoresProps> {
    

    render() {
        return (
            <div className='high-score'>
                <BackButton setState={this.props.setState} baseClass='high-score'></BackButton>

                <div className='high-score__main-container'>
                    <div className="high-score__title-container">
                        <div className="high-score__title">High Scores</div>
                    </div>

                    <div className='high-score__entries-container'>
                        <div className='high-score__entry'>1000 points, 30/06/23 5:30, Name ?</div> 
                    </div>
                </div>
            </div>
        );
    }
}
