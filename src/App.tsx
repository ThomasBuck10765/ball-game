import React, { useState, useEffect } from 'react';
import Game from './ts/components/game/game';
import Menu from './ts/components/menu/menu';
import HighScores from './ts/components/high-scores/highScores';
import GameSettings from './ts/components/settings/gameSettings';
import AccessibilitySettings from './ts/components/settings/accessibilitySettings';
import { appStates } from './ts/enums/appStates';
import { BallValues } from './ts/values/ballValues';
import { GameValues } from './ts/values/gameValues';

function App() {
	const [state, setState] = useState(appStates.Menu);

	const [ballValues, setBallValues] = useState(BallValues);
	const [gameValues, setGameValues] = useState(GameValues);

	// TODO: Should we be using routing instead?
	const renderCurrentState = () => {
		switch(state) {
			case appStates.Menu:
				return <Menu setState={setState}></Menu>;
			case appStates.Game:
				return <Game setState={setState}></Game>;
			case appStates.HighScores:
				return <HighScores setState={setState}></HighScores>
			case appStates.Settings:
				return <GameSettings setState={setState}></GameSettings>
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

export default App;
