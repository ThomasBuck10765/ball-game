import { Component } from 'react';
import BackButton from '../general/backButton';
import { AccessibilitySettingsProps } from '../../types/settings/accessibilitySettings';
import { AddScroll, RemoveScroll } from '../../helpers/allowScroll';

export default class AccessibilitySettings extends Component<AccessibilitySettingsProps> {

    componentDidMount(): void {
        AddScroll();
    }

    componentWillUnmount(): void {
        RemoveScroll();
    }

    render() {
        return (
            <div className='settings-menu'>
                <BackButton setState={this.props.setState} baseClass='settings-menu'></BackButton>

                <div className='settings-menu__accessibility-items-container'>
                    Nothing to see here yet
                </div>
            </div>
        );
    }
}
