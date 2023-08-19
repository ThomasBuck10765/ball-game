import { Component } from 'react'
import { BackButtonProps } from '../../types/general/backButton'
import appStates from '../../enums/appStates'

export default class BackButton extends Component<BackButtonProps> {
   
    previousState

    constructor(props: BackButtonProps) {
        super(props);

        // TODO: Or not in enum
        this.previousState = (props.previousState === undefined) ?
            appStates.Menu :
            props.previousState
    }

    render () {
        return (
            <div className={`${this.props.baseClass}__back-container`}>
                <div className={`${this.props.baseClass}__back`} onClick={() => this.props.setState(this.props.previousState)}>Back to {this.previousState}</div>
            </div>
        )
    }
}