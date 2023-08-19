import { Component } from "react";
import { SetUsernameProps } from "../../types/set-username/setUsername";
import appStates from "../../enums/appStates";
import { setCookie } from "../../helpers/cookie";

// These are from the npm package, https://github.com/LDNOOBW/naughty-words-js
var words = require("naughty-words");

export default class SetUsername extends Component<SetUsernameProps> {

    attemptToSaveUsername() {
        if (this.props.username !== '') {
            let isSwear = false;
            words.en.forEach((word: string) => {
                // Remove spaces, turn to lower case, check if result contains a swear.
                // TODO: This can be quite easily worked around, plus it's JS checking so isn't ideal as it could be overwritten, look into possibly using an API to check
                if (this.props.username.replace(/\s/g, '').toLowerCase().includes(word)) {
                    isSwear = true;
                }
            })

            if (isSwear) {
                alert('Please use a different username, that is, or contains, a swear.\nNo one is impressed by that.')
                return;
            }

            setCookie('username', this.props.username)
            this.props.setState(appStates.MainMenu)
            return;
        }
        alert('Please enter a username.')
    }

    render() {
        return (
            <div className="set-username">
                <div className="set-username__title-container">Ball Game</div>

                <div className="set-username__description-container">
                    <span className="set-username__description">Please note that your Username might not be unique, and this is only to keep track of high scores.</span>
                    <br />
                    <span className="set-username__description">Your Username will be stored in a cookie so will be saved on refresh.</span>
                </div>

                <div className="set-username__username-container">
                    <label>
                        <span>Enter your username: </span>
                        
                        <input type='text' value={this.props.username} onChange={e => {
                            this.props.setUsername(e.target.value);
                        }}
                        />
                    </label>
                </div>

                <div className="set-username__continue-container">
                    <button className="set-username__continue" type='submit' onClick={() => this.attemptToSaveUsername()}>Continue</button>
                </div>
            </div>
        )
    }
}
