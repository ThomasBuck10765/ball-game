import { useState } from 'react';
import Game from './ts/components/game/game';
import Menu from './ts/components/menu/mainMenu';
import HighScores from './ts/components/high-scores/highScores';
import GameSettings from './ts/components/settings/gameSettings';
import AccessibilitySettings from './ts/components/settings/accessibilitySettings';
import GameSelection from './ts/components/menu/gameSelection';
import LossScreen from './ts/components/game/lossScreen';
import appStates from './ts/enums/appStates';
import { BallValues } from './ts/values/ballValues';
import { GameValues } from './ts/values/gameValues';

export default function App() {
	const [state, setState] = useState(appStates.Menu);

	const [ballValues, setBallValues] = useState(BallValues);
	const [gameValues, setGameValues] = useState(GameValues);

	// TODO: Should we be using routing instead?
	const renderCurrentState = () => {
		switch(state) {
			case appStates.Menu:
				return <Menu setState={setState}></Menu>;
			case appStates.GameSelection:
				return <GameSelection setState={setState}></GameSelection>
			case appStates.Game:
				// return Game(setState);
				return <Game setState={setState} ballValues={ballValues} gameValues={gameValues}></Game>;
			case appStates.LossScreen:
				return <LossScreen setState={setState}></LossScreen>;
			case appStates.HighScores:
				return <HighScores setState={setState}></HighScores>
			case appStates.Settings:
				return <GameSettings setState={setState} ballValues={ballValues} setBallValues={setBallValues} 
					gameValues={gameValues} setGameValues={setGameValues}></GameSettings>
			case appStates.AccessibilityOptions:
				return <AccessibilitySettings setState={setState}></AccessibilitySettings>
			default: 
				return <Menu setState={setState}></Menu>;
		}
	}

	return (
		<div className='ball-game'>
			{renderCurrentState()}
		</div>
	);
}
