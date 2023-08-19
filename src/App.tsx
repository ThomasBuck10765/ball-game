import { useState } from 'react';
import Game from './ts/components/game/game';
import MainMenu from './ts/components/menu/mainMenu';
import HighScores from './ts/components/high-scores/highScores';
import GameSettings from './ts/components/settings/gameSettings';
import AccessibilitySettings from './ts/components/settings/accessibilitySettings';
import GameSelection from './ts/components/menu/gameSelection';
import LossScreen from './ts/components/game/lossScreen';
import appStates from './ts/enums/appStates';
import { BallValues } from './ts/values/ballValues';
import { GameValues } from './ts/values/gameValues';
import SetUsername from './ts/components/set-username/setUsername';
import { getCookie } from './ts/helpers/cookie';

export default function App() {
	const [state, setState] = useState(appStates.SetUsername);
	const [username, setUsername] = useState(getCookie('username'));

	const [ballValues, setBallValues] = useState(BallValues);
	const [gameValues, setGameValues] = useState(GameValues);

	const renderGameState = () => {
		switch(state) {
			case appStates.Game:
				// return Game(setState);
				return <Game setState={setState} ballValues={ballValues} gameValues={gameValues} username={username}></Game>;
			case appStates.GameOneLife:
				return <Game setState={setState} ballValues={ballValues} gameValues={{...(gameValues), ...({numberOfStartingLives: 1})}}></Game>;
			case appStates.GameEndless:
				return <Game setState={setState} ballValues={ballValues} gameValues={{...(gameValues), ...({maximumNumberOfEnemyBalls: 0})}}></Game>;
		}
	}

	// TODO: Should we be using routing instead?
	const renderCurrentState = () => {
		switch(state) {
			case appStates.SetUsername:
				return <SetUsername setState={setState} username={username} setUsername={setUsername}></SetUsername>
			case appStates.MainMenu:
				return <MainMenu setState={setState}></MainMenu>;
			case appStates.GameSelection:
				return <GameSelection setState={setState}></GameSelection>
			case appStates.Game:
			case appStates.GameOneLife:
			case appStates.GameEndless:
				return renderGameState();
			case appStates.LossScreen:
				return <LossScreen setState={setState}></LossScreen>;
			case appStates.HighScores:
				return <HighScores setState={setState} username={username}></HighScores>
			case appStates.Settings:
				return <GameSettings setState={setState} ballValues={ballValues} setBallValues={setBallValues} 
					gameValues={gameValues} setGameValues={setGameValues}></GameSettings>
			case appStates.AccessibilityOptions:
				return <AccessibilitySettings setState={setState}></AccessibilitySettings>
			default: 
				return <MainMenu setState={setState}></MainMenu>;
		}
	}

	return (
		<div className='ball-game'>
			{renderCurrentState()}
		</div>
	);
}
