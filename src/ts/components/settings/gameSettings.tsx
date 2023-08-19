import { Component } from 'react';
import { GameSettingsProps } from '../../types/settings/gameSettings';
import { BackButton } from '../general/backButton';

export class GameSettings extends Component<GameSettingsProps> {
    

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__game-items-container'>
                    Game
                </div>
            </div>
        );
    }
}
