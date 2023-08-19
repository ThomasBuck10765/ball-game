import { Component } from "react";
import { LossScreenProps } from "../../types/game/lossScreen";
import BackButton from "../general/backButton";

export default class LossScreen extends Component<LossScreenProps> {

    render() {
        return (
            <div className="loss-screen">
                <BackButton setState={this.props.setState} baseClass="loss-screen"></BackButton>
                <div className="loss-screen__text-container">
                    <span className="loss-screen__text">GAME OVER</span>
                </div>
            </div>
        );
    }
}
