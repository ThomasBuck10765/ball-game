import React, { Component } from 'react';
import BackButton from '../general/backButton';
import { HighScoresProps } from '../../types/high-scores/highScores';
import { HighScoreItemProps } from '../../types/high-scores/highScoreItem';
import base from '../../firebase/base';

export default class HighScores extends Component<HighScoresProps> {

    highScoreItems: HighScoreItemProps[];
    highScoreItemsOriginal: HighScoreItemProps[];
    ref: any;

    constructor(props: HighScoresProps) {
        super(props);

        this.highScoreItems = [];
        this.highScoreItemsOriginal = [];

        // TODO: any way we can limit the results?
        base.fetch('highScores', {
            context: this,
            asArray: true,
        }).then((data: HighScoreItemProps[]) => {
            // By default, arrange the data to show the top results first
            this.highScoreItems = data.sort((a, b) => {
                return b.score - a.score;
            });
            this.highScoreItemsOriginal = {...(this.highScoreItems)};
        }).catch((error: any) => {
            this.highScoreItems = [];
        })
    }

    componentDidMount(): void {
        // TODO: If we do routing, we can sync more specifically here. Don't think we'd want to do that as they're global high scores?
        this.ref = base.syncState('highScoreItems', {
            context: this,
            state: 'highScoreItems'
        });
    }

    componentWillUnmount(): void {
        base.removeBinding(this.ref);
    }

    resetDisplayedHighScoreItems() {
        this.highScoreItems = {...(this.highScoreItemsOriginal)};
    }

    sortHighScoreItems() {
        this.resetDisplayedHighScoreItems();
        this.highScoreItems.sort((a, b) => {
            return b.score - a.score;
        })
    }

    filterHighScoreItemsByName() {
        console.log(1);
        console.log(this.highScoreItems);
        this.highScoreItems = this.highScoreItems.filter((highScore) => highScore.name === this.props.username)
        console.log(this.highScoreItems);
    }

    renderHighScoreItem = (highScore: HighScoreItemProps, index: number) => {
        return (
            <div className='high-score__entries-container' key={index}>
                <div className='high-score__entry'>{highScore.score} points, {highScore.dateSubmitted}, {Math.round(highScore.time * 100) / 100}s, {highScore.name}</div> 
            </div>
        )
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
                        this.highScoreItems.length > 0 ?
                            this.highScoreItems.map((highScore, index) => this.renderHighScoreItem(highScore, index))
                            : <div>Sorry, the high scores aren't available at the moment -please try again later.</div>
                    }
                </div>
            </div>
        );
    }
}
