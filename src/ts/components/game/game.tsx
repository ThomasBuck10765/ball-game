import React, { useState, useEffect } from 'react';
import { PlayerBall } from './ball/playerBall';
import { PointsBall } from './ball/pointsBall';
import { EnemyBall } from './ball/enemyBall';
import { GameInfo } from './gameInfo';
import { BallValues } from '../../values/ballValues';
import { GameValues } from '../../values/gameValues';
import { getRandomInt } from '../../helpers/randomNumbers';
import { areBallsInContact } from '../../helpers/ballsInContact';

function Game() {
	// Game setup
	const refreshRate = GameValues.refreshRate; // in ms

	// Player setup
	const [playerLeft, setPlayerLeft] = useState(250);
	const [playerTop, setPlayerTop] = useState(250);
	const playerSpeed = BallValues.playerSpeed;
	const playerRadius = BallValues.playerRadius;

	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	const [lives, setLives] = useState(GameValues.numberOfStartingLives);

	// Initial enemy setup
	const enemyBallRadius = BallValues.enemyBallRadius;
	const enemyBallSpawnTimeout = GameValues.enemyBallSpawnTimeout;
	const [enemyBalls, setEnemyBalls] = useState([
		{
			radius: enemyBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)],
		}
	])

	// Initial point ball setup TODO: with the minimum number
	const pointBallValue = GameValues.pointBallValue;
	const pointBallRadius = BallValues.pointBallRadius;
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
				
				break;
			default:
				console.log(`Key press: ${event.code}`);
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

			if (pointBalls.length <= GameValues.minimumNumberOfPointBalls) {
				SpawnPointBall(pointBalls, setPointBalls, pointBallRadius);
			}
		}
	}, [playerRadius, playerLeft, playerTop, pointBalls, pointBallRadius, pointBallValue, score, time]);
	

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
			if ((Math.round(time * 100) / 100) % GameValues.pointBallSpawnRate === 0) {
				SpawnPointBall(pointBalls, setPointBalls, pointBallRadius);
			}

			// Spawn in a new enemy ball
			if (enemyBalls.length < GameValues.maximumNumberOfEnemyBalls && (Math.round(time * 100) / 100) % GameValues.enemyBallSpawnRate === 0) {
				SpawnEnemyBall(enemyBalls, setEnemyBalls, enemyBallRadius);
			}

			// TODO: Do this properly, maybe needs to be handled above this ? That would suggest we need to move most of this to a Game Component. Would eventually extend this to have a menu, high scores, etc so that will need doing eventually either way
			if (lives <= 0) {
				window.location.reload();
			}

		}, refreshRate);
		return () => clearInterval(timer);
	}, [time, refreshRate, pointBalls, pointBallRadius, enemyBalls, enemyBallRadius, lives]);

	return (
		<div className="ball-game" onKeyDown={keyDownEvent} tabIndex={0}>
			

			<GameInfo score={score} time={time} lives={lives}></GameInfo>

			<PlayerBall radius={playerRadius} coordinates={[playerLeft, playerTop]}></PlayerBall>

			{
				pointBalls.map(pointBall => <PointsBall radius={pointBall.radius} coordinates={pointBall.coordinates} color={pointBall.color}></PointsBall>)
			}

			{
				enemyBalls.map(enemyBall => <EnemyBall radius={enemyBall.radius} coordinates={enemyBall.coordinates} playerCoordinates={[playerLeft, playerTop]}></EnemyBall>)
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
			color: ''
		}
	]))
}

function SpawnEnemyBall(enemyBalls: any, setEnemyBalls: any, enemyBallRadius: number, enemyBallSpawnTimeout: number = GameValues.enemyBallSpawnTimeout) {
	// Spawn in a new enemy ball
	setEnemyBalls(enemyBalls.concat([
		{
			radius: enemyBallRadius,
			coordinates: [getRandomInt(0, window.innerWidth - enemyBallRadius), getRandomInt(0, window.innerHeight - enemyBallRadius)],
		}
	]));
}

export default Game;
