import React, {CSSProperties, Component} from 'react';
import { BallProps } from '../../types/ball/ball.tsx';


export class Ball extends Component<BallProps> {
    style: CSSProperties

    constructor(props: BallProps) {
        super(props);

        this.style = {
            height: 2 * props.radius,
            width: 2 * props.radius,
        };

        if (this.props.color !== undefined) {
            this.style.backgroundColor = props.color;       
        }
    }    

    render() {
        return <div className='ball' style={this.style}></div>
    }
}
