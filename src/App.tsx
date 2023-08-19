import React, { useState, useEffect } from 'react';
import { PlayerBall } from './ts/components/ball/playerBall';
import { BallValues } from './ts/values/ballValues';
import { EnemyBall } from './ts/components/ball/enemyBall';
import { PointsBall } from './ts/components/ball/pointsBall';
import { Score } from './ts/components/score/score';
import { GameValues } from './ts/values/gameValues';
import { getRandomInt } from './ts/helpers/randomNumbers';

function App() {
	// Game setup
	const refreshRate = GameValues.refreshRate; // in ms

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
	const enemyRadius = BallValues.enemyBallRadius;

	// Initial point ball setup
	const pointBallValue = GameValues.pointBallValue;
	const pointBallRadius = BallValues.pointBallRadius;
	const pointBallSpeed = BallValues.pointBallSpeed;
	const [pointBalls, setPointBalls] = useState([
		{
			radius: pointBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - pointBallRadius), getRandomInt(0, window.innerHeight - pointBallRadius)],
			color: 'blue',
		},
		{
			radius: pointBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - pointBallRadius), getRandomInt(0, window.innerHeight - pointBallRadius)],
			color: 'green'
		}
	])

	// Player movement
	const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {    
		let maxLeft = window.innerWidth - (2 * playerRadius);
		let maxTop = window.innerHeight - (2 * playerRadius);

		console.log(event.code)

		switch(event.code) {
			case "ArrowRight":
			case "KeyD":
				if (playerLeft + playerSpeed <= maxLeft + playerRadius) {
					setPlayerLeft(playerLeft + playerSpeed);
				} else {
					setPlayerLeft(maxLeft + playerRadius);
				}

				break;
			case "ArrowLeft":
			case "KeyA":
				if (playerLeft - playerSpeed >= playerRadius) {
					setPlayerLeft(playerLeft - playerSpeed);
				} else {
					setPlayerLeft(playerRadius);
				}

				break;
			case "ArrowUp":
			case "KeyW":
				if (playerTop - playerSpeed >= playerRadius) {
					setPlayerTop(playerTop - playerSpeed);
				} else {
					setPlayerTop(playerRadius);
				}

				break;
			case "ArrowDown":
			case "KeyS":
				if (playerTop + playerSpeed <= maxTop + playerRadius) {
					setPlayerTop(playerTop + playerSpeed);
				} else {
					setPlayerTop(maxTop + playerRadius);
				}

				break;
			default:
				console.log(`Key press: ${event.code}`);
		}
	};

	// TODO: Detect if point balls touch player ball

	// TODO: Enemy movement

	// Detect if enemy ball touches player ball
	// TODO: Work on this detection, it's a bit iffy
	useEffect(() => {
		const radiusDiff = enemyRadius + playerRadius;

		if (Math.abs(playerLeft - enemyLeft) <= radiusDiff) {
			if (Math.abs(playerTop - enemyTop) <= radiusDiff) {
				console.log("hit");
			}
		}
	});

	// Starts a timer on app load, establishes a refresh rate of 60 fps
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(time + (refreshRate / 1000));
		}, refreshRate);
		return () => clearInterval(timer);
	}, [time, refreshRate]);

	return (
		<div className="ball-game" onKeyDown={keyDownEvent} tabIndex={0}>
			<Score score={score} time={time}></Score>

			<PlayerBall radius={playerRadius} coordinates={[playerLeft - playerRadius, playerTop - playerRadius]}></PlayerBall>

			{
				pointBalls.map(pointBall => <PointsBall radius={pointBall.radius} coordinates={pointBall.coordinates} color={pointBall.color}></PointsBall>)
			}

			<EnemyBall radius={enemyRadius} coordinates={[enemyLeft - enemyRadius, enemyTop - enemyRadius]}></EnemyBall>
		</div>
	);
}

export default App;
