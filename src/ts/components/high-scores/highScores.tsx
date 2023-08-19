import React, { Component } from 'react';
import BackButton from '../general/backButton';
import { HighScoresProps } from '../../types/high-scores/highScores';
import { HighScoreItemProps } from '../../types/high-scores/highScoreItem';
import base, { authenticate } from '../../firebase/firebase';

export default class HighScores extends Component<HighScoresProps> {

    isLoading: boolean;

    highScoreItems: HighScoreItemProps[];
    highScoreItemsOriginal: HighScoreItemProps[];
    ref: any;

    constructor(props: HighScoresProps) {
        super(props);

        this.isLoading = true;

        this.highScoreItems = [];
        this.highScoreItemsOriginal = [];
    }

    componentDidMount(): void {
        this.getHighScoresAsync();

        this.ref = base.syncState('highScoreItems', {
            context: this,
            state: 'highScoreItems'
        });
    }

    componentWillUnmount(): void {
        base.removeBinding(this.ref);
    }

    getHighScoresAsync = async () => {
        const isAuthenticated = await authenticate();

        if (isAuthenticated) {
            // TODO: any way we can limit the results?
            base.fetch('highScores', {
                context: this,
                asArray: true,
            }).then((data: HighScoreItemProps[]) => {
                // By default, arrange the data to show the top results first
                this.highScoreItems = data.sort((a, b) => {
                    return b.score - a.score;
                });
                this.highScoreItemsOriginal = (this.highScoreItems);

                this.isLoading = false;
                this.forceUpdate();
            }).catch((error: any) => {
                console.log(error);
                this.isLoading = false;
                this.forceUpdate();
            })
        } else {
            this.isLoading = false;
            this.forceUpdate();
        }
    }

    filterHighScoresByName = () => {
        this.highScoreItems = this.highScoreItems.filter((highScore) => highScore.name === this.props.username);
        this.forceUpdate();
    }

    resetDisplayedHighScores = () => {
        this.highScoreItems = (this.highScoreItemsOriginal);
        this.forceUpdate();
    }

    renderHighScoreItem = (highScore: HighScoreItemProps, index: number) => {
        return (
            <tr className='high-score__entry-row' key={index}>
                <td className="high-score__entry-points">{highScore.score}</td>
                <td className="high-score__entry-name">{highScore.name}</td>
                <td className="high-score__entry-time">{Math.round(highScore.time * 100) / 100}</td>
                <td className="high-score__entry-date">{highScore.dateSubmitted}</td>
            </tr>
        );
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
                        <span className="high-score__description">Please note that these are (currently) only for the Regular game mode with no altered settings.</span>
                    </div>

                    <br />

                    {
                        this.isLoading ?
                            <div>Fetching high scores...</div>
                            : this.highScoreItems.length > 0 ?
                                <React.Fragment>
                                    <div className='high-score__filter-container'>
                                        <button className='high-score__filter' type='submit' onClick={this.filterHighScoresByName}>Filter scores to Username {this.props.username}</button>
                                    </div>

                                    <div className='high-score__filter-container'>
                                        <button className='high-score__filter' type='reset' onClick={this.resetDisplayedHighScores}>Top scores</button>
                                    </div>

                                    <br />
                                    <table className='high-score__entries-table'>
                                        <thead>
                                            <tr className='high-score__entries-table-header-row'>
                                                <th>Points</th>
                                                <th>Username</th>
                                                <th>Time (s)</th>
                                                <th>Date submitted</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.highScoreItems.map((highScore, index) => this.renderHighScoreItem(highScore, index))}
                                        </tbody>
                                    </table>
                                </React.Fragment>
                                : <div>Sorry, the high scores aren't available at the moment -please try again later. If the problem persists, please report it to me on <a href='https://github.com/ThomasBuck10765/ball-game' target='_blank' rel='noopener noreferrer'>GitHub</a>.</div>
                    }
                </div>
            </div>
        );
    }
}
