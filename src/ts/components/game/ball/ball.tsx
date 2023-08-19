import React, {CSSProperties, Component} from 'react';
import { BallProps } from '../../../types/game/ball/ball.tsx';


export class Ball extends Component<BallProps> {
    style: CSSProperties
    color?: string

    constructor(props: BallProps) {
        super(props);

        this.style = {
            height: 2 * props.radius,
            width: 2 * props.radius,
        };

        if (props.color !== undefined) {
            this.style.backgroundColor = props.color;       
            this.color = props.color;
        }
    }    

    render() {
        return <div className='ball' style={this.style}></div>
    }
}
