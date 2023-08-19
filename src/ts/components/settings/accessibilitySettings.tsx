import { Component } from 'react';
import BackButton from '../general/backButton';
import { AccessibilitySettingsProps } from '../../types/settings/accessibilitySettings';

export default class AccessibilitySettings extends Component<AccessibilitySettingsProps> {
    

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__accessibility-items-container'>
                    
                </div>
            </div>
        );
    }
}
