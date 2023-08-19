import { Component, Fragment } from 'react';
import { MainMenuProps } from '../../types/menu/mainMenu';
import appStates from '../../enums/appStates';
import BackButton from '../general/backButton';

export default class GameSelection extends Component<MainMenuProps> {

    // TODO: Make the background interesting here, have blue and green balls flying about randomly
    render() {
        return (
            <Fragment>
                <BackButton setState={this.props.setState} baseClass='game-selection'></BackButton> 
                <div className='main-menu'>
                    <div className='main-menu__items-container'>
                        <div className='game-selection__start' onClick={() => this.props.setState(appStates.Game)}>Regular</div>
                        <div className='main-menu__high-scores' onClick={() => this.props.setState(appStates.HighScores)}>High Scores</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
