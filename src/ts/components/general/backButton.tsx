import { Component } from 'react'
import { BackButtonProps } from '../../types/general/backButton'
import appStates from '../../enums/appStates'

export default class BackButton extends Component<BackButtonProps> {

    render () {
        return (
            <div className={`${this.props.baseClass}__back-container`}>
                <div className={`${this.props.baseClass}__back`} onClick={() => this.props.setState(this.props.previousState === undefined ? appStates.Menu : this.props.previousState)}>Back button</div>
            </div>
        )
    }
}