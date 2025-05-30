import { BallProps } from '../../../types/game/ball/ball.tsx';
import { Ball } from './ball.tsx';
import { getRandomNumber } from '../../../helpers/randomNumbers.tsx';

export class PointsBall extends Ball {
    color: string;

    sqrtSpeed: number = Math.sqrt(this.props.speed);
    
    xSpeed: number = getRandomNumber(-this.sqrtSpeed, this.sqrtSpeed, true);
    ySpeed: number = getRandomNumber(-this.sqrtSpeed, this.sqrtSpeed, true);

    timer?: NodeJS.Timer;

    constructor(props: BallProps) {
        super(props);

        // At random, select either blue or green, if color is not provided
        if (props.color === undefined || props.color === '') {
            this.color = Math.round(Math.random()) ? 'green' : 'blue';
        } else {
            this.color = props.color;
        }
    }

    componentDidMount(): void {
        if (this.props.isMoving) {
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
            }, this.props.refreshRate);
        }

    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    render() {
        return <div className='ball' style={
            {
                height: 2 * this.props.radius,
                width: 2 * this.props.radius,
                left: this.props.coordinates[0] - this.props.radius,
                top: this.props.coordinates[1] - this.props.radius,
                backgroundColor: this.color,
            }}></div>
    }
}
