import { Component } from 'react';
import BackButton from '../general/backButton';
import { HighScoresProps } from '../../types/high-scores/highScores';
import { HighScoreItemProps } from '../../types/high-scores/highScoreItem';

export default class HighScores extends Component<HighScoresProps> {

    highScoreItems: HighScoreItemProps[];

    constructor(props: HighScoresProps) {
        super(props);

        // Example data
        this.highScoreItems = [
            {
                score: 10000,
                dateSubmitted: new Date(),
                time: 5,
                name: 'John Doe'
            },
            {
                score: 12000,
                dateSubmitted: new Date(),
                time: 15,
                name: 'John, but better'
            },
            {
                score: 17000,
                dateSubmitted: new Date(),
                time: 30,
                name: 'John, but best'
            }
        ];

        this.highScoreItems.sort((a, b) => {
            return b.score - a.score;
        })
    }

    sortHighScoreItems() {
        this.highScoreItems.sort((a, b) => {
            return b.score - a.score;
        })
    }

    render() {
        return (
            <div className='high-score'>
                <BackButton setState={this.props.setState} baseClass='high-score'></BackButton>

                <div className='high-score__main-container'>
                    <div className="high-score__title-container">
                        <div className="high-score__title">High Scores</div>
                    </div>

                    <div className="high-score__description-container">
                        <span className="high-score__description">Please note that these are only for the Regular game mode with no altered settings.</span>
                    </div>

                    <div>
                        <button type='submit'>TODO: Scores matching username {this.props.username}</button>
                    </div>

                    <div>
                        <button type='reset'>TODO: Top scores</button>
                    </div>

                    <br />

                    {
                        this.highScoreItems.map(highScore => 
                            <div className='high-score__entries-container'>
                                <div className='high-score__entry'>{highScore.score} points, {highScore.dateSubmitted.toLocaleDateString("en-GB")}, {highScore.time} s, {highScore.name}</div> 
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
