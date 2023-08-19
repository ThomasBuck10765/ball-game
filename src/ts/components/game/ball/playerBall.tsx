// import { BallProps } from '../../types/ball/ball.tsx';
import { Ball } from './ball.tsx';

export class PlayerBall extends Ball {

    render() {
        return <div id='player-ball' className='ball player' style={
            {
                height: 2 * this.props.radius,
                width: 2 * this.props.radius,
                left: this.props.coordinates[0] - this.props.radius,
                top: this.props.coordinates[1] - this.props.radius,
            }}></div>
    }
}
