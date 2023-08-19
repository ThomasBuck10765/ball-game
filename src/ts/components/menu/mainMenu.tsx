import { Component, Fragment } from 'react';
import { MainMenuProps } from '../../types/menu/mainMenu';
import appStates from '../../enums/appStates';
import BackButton from '../general/backButton';

export default class MainMenu extends Component<MainMenuProps> {

    // TODO: Make the background interesting here, have blue and green balls flying about randomly
    render() {
        return (
            <Fragment>
                <BackButton setState={this.props.setState} baseClass='main-menu' previousState={appStates.SetUsername}></BackButton>
                <div className='main-menu'>
                    <div className='main-menu__items-container'>
                        <div className='main-menu__start' onClick={() => this.props.setState(appStates.GameSelection)}>Pick Game Mode</div>
                        <div className='main-menu__high-scores' onClick={() => this.props.setState(appStates.HighScores)}>High Scores</div>
                        <div className='main-menu__settings' onClick={() => this.props.setState(appStates.Settings)}>Game Settings</div>
                        <div className='main-menu__accessibility-options' onClick={() => this.props.setState(appStates.AccessibilityOptions)}>Accessibility Options</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
