import { BallProps } from '../../types/ball/ball.tsx';
import { Ball } from './ball.tsx';
import { getRandomNumber } from '../../helpers/randomNumbers.tsx';
import { GameValues } from '../../values/gameValues.tsx';

export class PointsBall extends Ball {
    color: string;
    xSpeed: number;
    ySpeed: number;

    timer?: NodeJS.Timer;

    constructor(props: BallProps) {
        super(props);

        // At random, select either blue or green, if color is not provided
        if (props.color === undefined) {
            this.color = Math.round(Math.random()) ? 'green' : 'blue';
        } else {
            this.color = props.color;
        }

        // Set initial speed to non-zero 0 value
        this.xSpeed = 0;
        this.ySpeed = 0;

        while (this.xSpeed === 0) {
            this.xSpeed = getRandomNumber(-5, 5, true);
        }

        while (this.ySpeed === 0) {
            this.ySpeed = getRandomNumber(-5, 5, true);
        }
    }

    componentDidMount(): void {
        if (GameValues.pointBallsMoving) {
            this.timer = setInterval(() => {
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
            }, GameValues.refreshRate)
        }

    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    render() {
        return <div className='ball' style={{left: this.props.coordinates[0] - this.props.radius, top: this.props.coordinates[1] - this.props.radius, backgroundColor: this.color}}></div>
    }
}
