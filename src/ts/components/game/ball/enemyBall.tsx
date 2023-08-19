import { Component } from 'react';
import { EnemyBallProps } from '../../../types/game/ball/ball.tsx';
import { GameValues } from '../../../values/gameValues.tsx';
import { BallValues } from '../../../values/ballValues.tsx';

const enemyBallTimeout = GameValues.enemyBallSpawnTimeout;

export class EnemyBall extends Component<EnemyBallProps> {
    xSpeed: number = 0;
    ySpeed: number = 0;

    timeUntilActive: number;

    timer?: NodeJS.Timer;

    constructor(props: EnemyBallProps) {
        super(props);

        this.timeUntilActive = enemyBallTimeout;
    }

    componentDidMount(): void {
        if (GameValues.enemyBallsMoving) {
            const enemySpeed = BallValues.enemyBallSpeed;

            this.timer = setInterval(() => {
                // If still in timeout, don't move. Refresh rate is in milliseconds but time until active is seconds
                if (this.timeUntilActive > 0) {
                    this.timeUntilActive -= GameValues.refreshRate / 1000;
                    return;
                }
                else {
                    let radius = this.props.radius;

                    let x = this.props.coordinates[0];
                    let y = this.props.coordinates[1];
    
                    let Px = this.props.playerCoordinates[0];
                    let Py = this.props.playerCoordinates[1];
    
                    let angle = Math.atan((Px - x) / (Py - y));
    
                    this.xSpeed = enemySpeed * Math.sin(angle);
                    this.ySpeed = enemySpeed * Math.cos(angle);
    
                    // Phase inversion due to domain of Math.atan (-π/2, π/2)
                    if (Py < y) {
                        angle = -angle;
                        this.xSpeed = -this.xSpeed;
                        this.ySpeed = -this.ySpeed;
                    }
    
                    this.props.coordinates[0] += this.xSpeed;
                    this.props.coordinates[1] += this.ySpeed;
                }              
            }, GameValues.refreshRate);
        }
    }


    render() {
        return <div className='ball enemy' style={
            {
                left: this.props.coordinates[0] - this.props.radius, 
                top: this.props.coordinates[1] - this.props.radius, 
                opacity: (enemyBallTimeout - this.timeUntilActive) / enemyBallTimeout}
        }></div>
    }
}