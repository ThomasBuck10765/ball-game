// import { BallProps } from '../../types/ball/ball.tsx';
import { Ball } from './ball.tsx';

export class EnemyBall extends Ball {
    // constructor(props: BallProps) {
    //     super(props);
    // }

    render() {
        return <div className='ball enemy' style={{left: this.props.coordinates[0] - this.props.radius, top: this.props.coordinates[1] - this.props.radius}}></div>
    }
}
