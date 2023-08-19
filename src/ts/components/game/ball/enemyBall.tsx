import { Component } from 'react';
import { EnemyBallProps } from '../../../types/game/ball/ball.tsx';
import { getRandomNumber } from '../../../helpers/randomNumbers.tsx';

export class EnemyBall extends Component<EnemyBallProps> {
    xSpeed: number = 0;
    ySpeed: number = 0;
    sqrtSpeed: number = Math.sqrt(this.props.speed);

    timeUntilActive: number;

    isMovingRandomly: boolean;

    timer?: NodeJS.Timer;

    constructor(props: EnemyBallProps) {
        super(props);

        this.timeUntilActive = this.props.enemyBallTimeout;
        this.isMovingRandomly = false;
    }

    componentDidMount(): void {
        if (this.props.isMoving) {
            const enemySpeed = this.props.speed;

            this.timer = setInterval(() => {
                this.timeUntilActive -= this.props.refreshRate / 1000;
                // If still in timeout, don't move
                if (this.timeUntilActive > 0) {
                    // Refresh rate is in milliseconds but time until active is seconds
                    return;
                }
                else if (this.timeUntilActive > - 20) {
    
                    let angle = Math.atan((this.props.playerCoordinates[0] - this.props.coordinates[0]) / (this.props.playerCoordinates[1] - this.props.coordinates[1]));
    
                    this.xSpeed = enemySpeed * Math.sin(angle);
                    this.ySpeed = enemySpeed * Math.cos(angle);
    
                    // Phase inversion due to domain of Math.atan (-π/2, π/2)
                    if (this.props.playerCoordinates[1] < this.props.coordinates[1]) {
                        this.xSpeed = -this.xSpeed;
                        this.ySpeed = -this.ySpeed;
                    }
    
                    this.props.coordinates[0] += this.xSpeed;
                    this.props.coordinates[1] += this.ySpeed;
                }
                // Since the enemy balls can be clumped together, start moving randomly after being active for about 20 seconds
                else {
                    if (!this.isMovingRandomly) {
                        this.xSpeed = getRandomNumber(-this.sqrtSpeed, this.sqrtSpeed, true);
                        this.ySpeed = getRandomNumber(-this.sqrtSpeed, this.sqrtSpeed, true);
                        this.isMovingRandomly = true;
                    }

                    this.moveRandomly();
                }             
            }, this.props.refreshRate);
        }
        else {
            this.timer = setInterval(() => {
                if (this.timeUntilActive > 0) {
                    this.timeUntilActive -= this.props.refreshRate / 1000;
                    return;
                }
                else {
                    return clearInterval(this.timer);
                }
            }, this.props.refreshRate);
        }
    }

    componentWillUnmount(): void {
        return clearInterval(this.timer);
    }

    moveRandomly() {
        let radius = this.props.radius;

        let maxLeft = window.innerWidth - (2 * radius);
        let maxTop = window.innerHeight - (2 * radius);

        let x = this.props.coordinates[0];
        let y = this.props.coordinates[1];

        // Horizontal speed
        if (this.xSpeed > 0) {
            if (x + this.xSpeed <= maxLeft + radius) {
                this.props.coordinates[0] += this.xSpeed;
            } else {
                this.props.coordinates[0] = maxLeft + radius;
                // Bounce back
                this.xSpeed = -this.xSpeed;
            }
        }
        // Negative horizontal speed
        else {
            if (x + this.xSpeed >= radius) {
                this.props.coordinates[0] += this.xSpeed;
            } else {
                this.props.coordinates[0] = radius;
                // Bounce back
                this.xSpeed = -this.xSpeed;
            }
        }

        // Vertical speed
        if (this.ySpeed > 0) {
            if (y - this.ySpeed >= radius) {
                this.props.coordinates[1] -= this.ySpeed;
            } else {
                this.props.coordinates[1] = radius;
                // Bounce back
                this.ySpeed = -this.ySpeed;
            }
        }
        // Negative vertical speed
        else {
            if (y - this.ySpeed <= maxTop + radius) {
                this.props.coordinates[1] -= this.ySpeed;
            } else {
                this.props.coordinates[1] = maxTop + radius;
                // Bounce back
                this.ySpeed = -this.ySpeed;
            }
        }
    } 

    render() {
        return <div className='ball enemy' style={
            {
                height: 2 * this.props.radius,
                width: 2 * this.props.radius,
                left: this.props.coordinates[0] - this.props.radius, 
                top: this.props.coordinates[1] - this.props.radius, 
                opacity: (this.props.enemyBallTimeout - this.timeUntilActive) / this.props.enemyBallTimeout}
        }></div>
    }
}
