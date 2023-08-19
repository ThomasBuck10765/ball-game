import { Component } from 'react';
import { AccessibilitySettingsProps } from '../../types/settings/accessibilitySettings';
import { BackButton } from '../general/backButton';

export class AccessibilitySettings extends Component<AccessibilitySettingsProps> {
    

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__accessibility-items-container'>
                    Accessibility
                </div>
            </div>
        );
    }
}