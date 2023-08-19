import { Component } from 'react';
import { MenuProps } from '../../types/menu/menu';
import { appStates } from '../../enums/appStates';

export default class Menu extends Component<MenuProps> {
    
    // TODO: Make the background interesting here, have blue and green balls flying about randomly
    render() {
        return (
            <div className='main-menu'>
                <div className='main-menu__items-container'>
                    <div className='main-menu__start' onClick={() => this.props.setState(appStates.Game)}>Start</div>
                    <div className='main-menu__high-scores' onClick={() => this.props.setState(appStates.HighScores)}>High Scores</div>
                    <div className='main-menu__settings' onClick={() => this.props.setState(appStates.Settings)}>Game Settings</div>
                    <div className='main-menu__accessibility-options' onClick={() => this.props.setState(appStates.AccessibilityOptions)}>Accessibility Options</div>
                </div>
            </div>
        );
    }
}
