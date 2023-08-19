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

	// Initial enemy setup
	const enemyBallRadius = ballValues.enemyBallRadius;
	const [enemyBalls, setEnemyBalls] = useState([
		{
			radius: enemyBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)],
		}
	])

	// Initial point ball setup TODO: with the minimum number
	const pointBallValue = gameValues.pointBallValue;
	const pointBallRadius = ballValues.pointBallRadius;
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
			case "Numpad6":
				if (playerLeft + playerSpeed <= maxLeft + playerRadius) {
					setPlayerLeft(playerLeft + playerSpeed);
				} else {
					setPlayerLeft(maxLeft + playerRadius);
				}

				break;
			case "ArrowLeft":
			case "KeyA":
			case "Numpad4":
				if (playerLeft - playerSpeed >= playerRadius) {
					setPlayerLeft(playerLeft - playerSpeed);
				} else {
					setPlayerLeft(playerRadius);
				}

				break;
			case "ArrowUp":
			case "KeyW":
			case "Numpad8":
				if (playerTop - playerSpeed >= playerRadius) {
					setPlayerTop(playerTop - playerSpeed);
				} else {
					setPlayerTop(playerRadius);
				}

				break;
			case "ArrowDown":
			case "KeyS":
			case "Numpad2":
				if (playerTop + playerSpeed <= maxTop + playerRadius) {
					setPlayerTop(playerTop + playerSpeed);
				} else {
					setPlayerTop(maxTop + playerRadius);
				}

				break;

			case "Escape":
				// TODO: Something? Open menu to quit?
				break;
			default:
				break;
		}
	};

	// Detect if point balls touch player ball
	useEffect(() => {
		const radiusAdded = pointBallRadius + playerRadius;

		// TODO: Clean this
		let ballsToDelete = [{}];
		ballsToDelete.pop();
		
		pointBalls.forEach(pointBall => {
			if (areBallsInContact([playerLeft, playerTop], pointBall.coordinates, radiusAdded)) {
				ballsToDelete.push(pointBall);
			}
		});

		if (ballsToDelete.length !== 0) {
			setScore(score + (ballsToDelete.length) * pointBallValue);

			setPointBalls(pointBalls.filter(function (ball) {
				return !ballsToDelete.includes(ball);
			}));

			if (pointBalls.length <= gameValues.minimumNumberOfPointBalls) {
				SpawnPointBall(pointBalls, setPointBalls, pointBallRadius);
			}
		}
	}, [playerRadius, playerLeft, playerTop, pointBalls, pointBallRadius, pointBallValue, score, time, gameValues]);

	// Detect if enemy ball touches player ball
	useEffect(() => {
		const radiusAdded = playerRadius + enemyBallRadius;

		// TODO: Clean this
		let enemiesToDelete = [{}];
		enemiesToDelete.pop();

		// TODO: Update so that whether the ball is active is considered
		enemyBalls.forEach(enemy => {
			if (areBallsInContact([playerLeft, playerTop], enemy.coordinates, radiusAdded)) {
				enemiesToDelete.push(enemy);
			}
		});

		if (enemiesToDelete.length !== 0) {
			setLives(lives - 1);

			setEnemyBalls(enemyBalls.filter(function (enemy) {
				return !enemiesToDelete.includes(enemy);
			}))
		}
	}, [playerRadius, playerLeft, playerTop, enemyBalls, enemyBallRadius, lives, time]);

	// Starts a timer on app load which enforces a refresh rate of 60 fps
	// Sets up spawning of point and enemy balls
	// Deals with dying
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(time + (refreshRate / 1000));

			// Spawn in a new point ball
			if ((Math.round(time * 100) / 100) % gameValues.pointBallSpawnRate === 0) {
				SpawnPointBall(pointBalls, setPointBalls, pointBallRadius);
			}

			// Spawn in a new enemy ball
			if (enemyBalls.length < gameValues.maximumNumberOfEnemyBalls && (Math.round(time * 100) / 100) % gameValues.enemyBallSpawnRate === 0) {
				SpawnEnemyBall(enemyBalls, setEnemyBalls, enemyBallRadius);
			}

			// TODO: Do this properly, maybe needs to be handled above this ? That would suggest we need to move most of this to a Game Component, which likely needs doing anyway
			if (lives <= 0) {
				// Use hasEditedValues to determine whether to save scores
				stateProps.setState(appStates.LossScreen);
			}

		}, refreshRate);
		return () => clearInterval(timer);
	}, [time, refreshRate, pointBalls, pointBallRadius, enemyBalls, enemyBallRadius, lives, gameValues, stateProps]);

	return (
		<div className="ball-game" onKeyDown={keyDownEvent} tabIndex={0}>
			<BackButton setState={stateProps.setState} baseClass='ball-game' previousState={appStates.GameSelection}></BackButton>

			<GameInfo score={score} time={time} lives={lives}></GameInfo>

			<PlayerBall radius={playerRadius} coordinates={[playerLeft, playerTop]} speed={playerSpeed} isMoving={true} refreshRate={refreshRate}></PlayerBall>

			{
				pointBalls.map(pointBall => <PointsBall radius={pointBall.radius} coordinates={pointBall.coordinates} color={pointBall.color} speed={ballValues.pointBallSpeed} isMoving={gameValues.pointBallsMoving} refreshRate={refreshRate}></PointsBall>)
			}

			{
				enemyBalls.map(enemyBall => <EnemyBall radius={enemyBall.radius} coordinates={enemyBall.coordinates} playerCoordinates={[playerLeft, playerTop]} speed={ballValues.enemyBallSpeed} isMoving={gameValues.enemyBallsMoving} enemyBallTimeout={gameValues.enemyBallSpawnTimeout} refreshRate={refreshRate}></EnemyBall>)
			}
		</div>
	);
}

// TODO: Fix these anys to actual types
function SpawnPointBall(pointBalls: any, setPointBalls: any, pointBallRadius: number) {
	// Spawn in a new point ball
	setPointBalls(pointBalls.concat([
		{
			radius: pointBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - pointBallRadius), getRandomInt(0, window.innerHeight - pointBallRadius)],
			color: Math.round(Math.random()) ? 'green' : 'blue'
		}
	]))
}

function SpawnEnemyBall(enemyBalls: any, setEnemyBalls: any, enemyBallRadius: number) {
	// Spawn in a new enemy ball
	setEnemyBalls(enemyBalls.concat([
		{
			radius: enemyBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)],
		}
	]));
}

export default Game;
