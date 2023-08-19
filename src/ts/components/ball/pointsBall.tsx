import React from 'react';
import { BallProps } from '../../types/ball/ball.tsx';
import { Ball } from './ball.tsx';

export class PointsBall extends Ball {
    constructor(props: BallProps) {
        super(props);

        // At random, select either blue or green, if color is not provided
        if (props.color === undefined) {
            this.style.backgroundColor = Math.round(Math.random()) ? 'green' : 'blue';
        }
    }

    // TODO: Add (random?) movement to ball

    render() {
        return <div className='ball' style={this.style}></div>
    }
}
