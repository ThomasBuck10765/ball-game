import React, { useState, useEffect } from 'react';
import GameInfo from './gameInfo';
import BackButton from '../general/backButton';
import { PlayerBall } from './ball/playerBall';
import { PointsBall } from './ball/pointsBall';
import { EnemyBall } from './ball/enemyBall';
import { getRandomInt } from '../../helpers/randomNumbers';
import { areBallsInContact } from '../../helpers/ballsInContact';
import appStates from '../../enums/appStates';
import { GameValuesType } from '../../types/values/gameValues';
import { BallValuesType } from '../../types/values/ballValues';
import { GameValues } from '../../values/gameValues';
import { BallValues } from '../../values/ballValues';
import { EnemyBallType, PointBallType } from '../../types/game/ball/ball';
import base, { authenticate } from '../../firebase/firebase';
import { HighScoreItemProps } from '../../types/high-scores/highScoreItem';

let pointBallId = 1;
let enemyBallId = 1;

function Game(stateProps: any) {
	// Game setup

	let gameValues: GameValuesType = stateProps.gameValues;
	let ballValues: BallValuesType = stateProps.ballValues;	

	const hasEditedValues = (JSON.stringify(gameValues) !== JSON.stringify(GameValues) || JSON.stringify(ballValues) !== JSON.stringify(BallValues));

	const refreshRate = gameValues.refreshRate; // in ms

	// Player setup
	const [playerLeft, setPlayerLeft] = useState(250);
	const [playerTop, setPlayerTop] = useState(250);
	const playerSpeed = ballValues.playerSpeed;
	const playerRadius = ballValues.playerRadius;

	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	const [lives, setLives] = useState(gameValues.numberOfStartingLives);

	// Initial point ball setup
	const [pointBalls, setPointBalls] = useState<PointBallType[]>([]);

	// Initial enemy setup
	const enemyBallRadius = ballValues.enemyBallRadius;
	const [enemyBalls, setEnemyBalls] = useState<EnemyBallType[]>([]);

	// Player movement (desktop only)
	const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {    
		let maxLeft = window.innerWidth - playerRadius;
		let maxTop = window.innerHeight - playerRadius;

		switch(event.code) {
			case "ArrowRight":
			case "KeyD":
			case "Numpad6":
				if (playerLeft + playerSpeed > maxLeft) {
					setPlayerLeft(maxLeft);
				} else {
					setPlayerLeft(playerLeft + playerSpeed);
				}

				break;
			case "ArrowLeft":
			case "KeyA":
			case "Numpad4":
				if (playerLeft - playerSpeed < playerRadius) {
					setPlayerLeft(playerRadius);
				} else {
					setPlayerLeft(playerLeft - playerSpeed);
				}

				break;
			case "ArrowUp":
			case "KeyW":
			case "Numpad8":
				if (playerTop - playerSpeed < playerRadius) {
					setPlayerTop(playerRadius);
				} else {
					setPlayerTop(playerTop - playerSpeed);
				}

				break;
			case "ArrowDown":
			case "KeyS":
			case "Numpad2":
				if (playerTop + playerSpeed > maxTop) {
					setPlayerTop(maxTop);
				} else {
					setPlayerTop(playerTop + playerSpeed);
				}

				break;
			default:
				break;
		}
	};

	const setPlayerWithinBounds = (x: number, y: number, maxLeft: number, maxTop: number) => {
		if (x < playerRadius) {
			setPlayerLeft(playerRadius);
		}
		else {
			setPlayerLeft(Math.min(x, maxTop));
		}

		if (y < playerRadius) {
			setPlayerTop(playerRadius);
		}
		else {
			setPlayerTop(Math.min(y, maxTop));
		}

		return;
	}

	// Player movement (mobile only)
	const clickEvent = (event: React.MouseEvent<HTMLDivElement>) => {
		// TODO: Refine condition
		if (window.innerWidth <= 991) {
			let maxLeft = window.innerWidth - playerRadius;
			let maxTop = window.innerHeight - playerRadius;

			let clickX = event.clientX;
			let clickY = event.clientY;

			// If tap is closer than distance of speed, go there
			if ((clickX - playerLeft)**2 + (clickY - playerTop)**2 < playerSpeed**2) {
				setPlayerWithinBounds(clickX, clickY, maxLeft, maxTop);

				return;
			}

			let angle = Math.atan((clickX - playerLeft) / (clickY - playerTop));
		
			let displaceLeft = playerSpeed * Math.sin(angle);
			let displaceTop = playerSpeed * Math.cos(angle);

			// Phase inversion due to domain of Math.atan (-π/2, π/2)
			if (clickY < playerTop) {
				displaceLeft = -displaceLeft;
				displaceTop = -displaceTop;
			}

			setPlayerWithinBounds((playerLeft + displaceLeft), (playerTop + displaceTop), maxLeft, maxTop);
		}
	}

	// Detect if point balls touch player ball
	useEffect(() => {
		const radiusAdded = ballValues.pointBallRadius + ballValues.playerRadius;

		let ballsToDeleteById: number[] = [];
		
		pointBalls.forEach(pointBall => {
			if (areBallsInContact([playerLeft, playerTop], pointBall.coordinates, radiusAdded)) {
				ballsToDeleteById.push(pointBall.id);
			}
		});

		if (ballsToDeleteById.length !== 0) {
			setScore(score + (ballsToDeleteById.length) * gameValues.pointBallValue);

			setPointBalls(pointBalls.filter(function (ball) {
				return !ballsToDeleteById.includes(ball.id);
			}));

			// Ensure there are the minimum number of point balls
			EnsureMinimumPointBalls(pointBalls, setPointBalls, gameValues, ballValues);
		}
	}, [playerLeft, playerTop, pointBalls, score, time, gameValues, ballValues]);

	// Detect if enemy ball touches player ball
	useEffect(() => {
		const radiusAdded = playerRadius + enemyBallRadius;

		let enemiesToDeleteById: number[] = [];

		// TODO: Update so that whether the ball is active is considered
		enemyBalls.forEach(enemy => {
			if (areBallsInContact([playerLeft, playerTop], enemy.coordinates, radiusAdded)) {
				enemiesToDeleteById.push(enemy.id);
			}
		});

		if (enemiesToDeleteById.length !== 0) {
			setLives(lives - enemiesToDeleteById.length);

			setEnemyBalls(enemyBalls.filter(function (enemy) {
				return !enemiesToDeleteById.includes(enemy.id);
			}))
		}
	}, [playerRadius, playerLeft, playerTop, enemyBalls, enemyBallRadius, lives, time]);

	// Deals with dying
	useEffect(() => {
		if (lives <= 0 && score > 0) {
			if (!hasEditedValues) {
				// From here, submit an API call to save the new high score
				submitScore({
					name: stateProps.username,
					score: score,
					time: time,
					dateSubmitted: new Date().toLocaleDateString("en-GB")
				})
			}

			stateProps.setState(appStates.LossScreen);
		}
	});

	// Starts a timer on app load which enforces a refresh rate of 60 fps (default)
	// Spawns in balls
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(time + (gameValues.refreshRate / 1000));

			// Spawn in a new point ball
			if ((Math.round(time * 100) / 100) % gameValues.pointBallSpawnRate === 0) {
				SpawnPointBall(pointBalls, setPointBalls, gameValues, ballValues);
			}

			// Spawn in a new enemy ball, ensure one spawns at beginning
			if (enemyBalls.length < gameValues.maximumNumberOfEnemyBalls && (Math.round(time * 100) / 100) % gameValues.enemyBallSpawnRate === 0) {
				SpawnEnemyBall(enemyBalls, setEnemyBalls, ballValues.enemyBallRadius, [playerLeft, playerTop], playerRadius);
			}
			

		}, gameValues.refreshRate);

		// Ensure there are the minimum number of point balls
		EnsureMinimumPointBalls(pointBalls, setPointBalls, gameValues, ballValues);

		return () => clearInterval(timer);
	}, [time, pointBalls, enemyBalls, playerLeft, playerTop, playerRadius, gameValues, ballValues]);

	return (
		<div className="ball-game" onKeyDown={keyDownEvent} tabIndex={0} onClick={clickEvent}>
			<BackButton setState={stateProps.setState} baseClass='ball-game' previousState={appStates.GameSelection}></BackButton>

			<GameInfo score={score} time={time} lives={lives} showLives={gameValues.maximumNumberOfEnemyBalls > 0}></GameInfo>

			<PlayerBall radius={playerRadius} coordinates={[playerLeft, playerTop]} speed={playerSpeed} isMoving={true} refreshRate={refreshRate}></PlayerBall>

			{
				pointBalls.map(pointBall => <PointsBall key={pointBall.id} radius={pointBall.radius} coordinates={pointBall.coordinates} color={pointBall.color} speed={ballValues.pointBallSpeed} isMoving={gameValues.pointBallsMoving} refreshRate={refreshRate}></PointsBall>)
			}

			{
				enemyBalls.map(enemyBall => <EnemyBall key={enemyBall.id} radius={enemyBall.radius} coordinates={enemyBall.coordinates} playerCoordinates={[playerLeft, playerTop]} speed={ballValues.enemyBallSpeed} isMoving={gameValues.enemyBallsMoving} enemyBallTimeout={gameValues.enemyBallSpawnTimeout} refreshRate={refreshRate}></EnemyBall>)
			}
		</div>
	);
}

async function submitScore(highScoreItem: HighScoreItemProps) {
	const isAuthenticated = await authenticate();
	if (isAuthenticated) {
		base.push('highScores', {
			data: highScoreItem
		});
	}
}

function EnsureMinimumPointBalls(pointBalls: PointBallType[], setPointBalls: any, gameValues: GameValuesType, ballValues: BallValuesType) {
	if (pointBalls.length <= gameValues.minimumNumberOfPointBalls) {
		for (let i = 0; i < (gameValues.minimumNumberOfPointBalls - pointBalls.length); i++) {
			SpawnPointBall(pointBalls, setPointBalls, gameValues, ballValues)
		}
	}
}

// TODO: Can we fix these anys to actual types?
function SpawnPointBall(pointBalls: PointBallType[], setPointBalls: any, gameValues: GameValuesType, ballValues: BallValuesType) {
	// Spawn in a new point ball
	setPointBalls(pointBalls.concat(
		{
			id: pointBallId++,
			radius: ballValues.pointBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - ballValues.pointBallRadius), getRandomInt(0, window.innerHeight - ballValues.pointBallRadius)],
			color: Math.round(Math.random()) ? 'green' : 'blue'
		}
	))

	return pointBallId;
}

function SpawnEnemyBall(enemyBalls: EnemyBallType[], setEnemyBalls: any, enemyBallRadius: number, playerCoordinates: number[], playerRadius: number) {

	// Ensure enemy ball cannot spawn on player
	let coordinates: number[] = [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)];
	while (areBallsInContact(playerCoordinates, coordinates, playerRadius + enemyBallRadius)) {
		coordinates = [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)];
	}

	// Spawn in a new enemy ball
	setEnemyBalls(enemyBalls.concat([
		{
			id: enemyBallId++,
			radius: enemyBallRadius,
			coordinates: coordinates
		}
	]));

	return enemyBallId;
}

export default Game;
