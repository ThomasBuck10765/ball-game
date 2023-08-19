import { Component } from 'react'
import { BackButtonProps } from '../../types/general/backButton'
import { appStates } from '../../enums/appStates'

export class BackButton extends Component<BackButtonProps> {

    render () {
        return (
            <div className={`${this.props.baseClass}__back-container`}>
                <div className={`${this.props.baseClass}__back`} onClick={() => this.props.setState(appStates.Menu)}>Back button</div>
            </div>
        )
    }
}