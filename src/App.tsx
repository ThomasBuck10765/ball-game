import React, { useState, useEffect } from 'react';
import { PlayerBall } from './ts/components/ball/playerBall';
import { BallValues } from './ts/values/ballValues/ballValues';
import { EnemyBall } from './ts/components/ball/enemyBall';
import { PointsBall } from './ts/components/ball/pointsBall';
import { BallProps } from './ts/types/ball/ball';
import { Score } from './ts/components/score/score';

function App() {
	// Player setup
	const [playerLeft, setPlayerLeft] = useState(250);
	const [playerTop, setPlayerTop] = useState(250);
	const playerSpeed = BallValues.playerSpeed;
	const playerRadius = BallValues.playerRadius;

	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);

	// Enemy setup
	const [enemyLeft, setEnemyLeft] = useState(200);
	const [enemyTop, setEnemyTop] = useState(200);
	const enemySpeed = BallValues.enemySpeed;

	// Initial score ball setup
	const scoreBallRadius = BallValues.ballRadius;
	const scorePointBalls = useState<BallProps>();

	scorePointBalls.push({radius: scoreBallRadius, coordinates: [50, 100], color: 'blue'});
	scorePointBalls.push({radius: scoreBallRadius, coordinates: [300, 100], color: 'green'});

	// Player movement
	const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {    
		let maxLeft = window.innerWidth - (2 * playerRadius);
		let maxTop = window.innerHeight - (2 * playerRadius);

		switch(event.code) {
			case "ArrowRight":
			case "KeyD":
				if (playerLeft + playerSpeed <= maxLeft) {
					setPlayerLeft(playerLeft + playerSpeed);
				} else {
					setPlayerLeft(maxLeft);
				}

				break;
			case "ArrowLeft":
			case "KeyA":
				if (playerLeft - playerSpeed >= 0) {
					setPlayerLeft(playerLeft - playerSpeed);
				} else {
					setPlayerLeft(0);
				}

				break;
			case "ArrowUp":
			case "KeyW":
				if (playerTop - playerSpeed >= 0) {
					setPlayerTop(playerTop - playerSpeed);
				} else {
					setPlayerTop(0);
				}

				break;
			case "ArrowDown":
			case "KeyS":
				if (playerTop + playerSpeed <= maxTop) {
					setPlayerTop(playerTop + playerSpeed);
				} else {
					setPlayerTop(maxTop);
				}

				break;
			default:
				console.log(`Key press: ${event.code}`);
		}
	};

	// TODO: Enemy movement

	// TODO?: Score ball movement

	// Starts a timer on app load
	useEffect(() => {
		const timer = setInterval(() => {
			console.log(time);
			setTime(time + 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [time]);

	return (
		<div className="ball-game" onKeyDown={keyDownEvent} tabIndex={0}>
			<Score score={score} time={time}></Score>

			<PlayerBall radius={BallValues.playerRadius} coordinates={[playerLeft, playerTop]}></PlayerBall>

			// TODO: Render point balls from scorePointBalls array above
			<PointsBall radius={BallValues.ballRadius} coordinates={[50, 100]} color={'blue'}></PointsBall>
			<PointsBall radius={BallValues.ballRadius} coordinates={[300, 100]} color={'green'}></PointsBall>
			<PointsBall radius={BallValues.ballRadius} coordinates={[250, 100]}></PointsBall>
			<PointsBall radius={BallValues.ballRadius} coordinates={[200, 100]}></PointsBall>
			<PointsBall radius={BallValues.ballRadius} coordinates={[150, 100]}></PointsBall>

			<EnemyBall radius={BallValues.enemyBallRadius} coordinates={[enemyLeft, enemyTop]}></EnemyBall>
		</div>
	);
}

export default App;
