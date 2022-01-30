import React from 'react';
import { useSpring, animated } from 'react-spring'

export default function Slidedown(Component) {


    const propsSpring = useSpring({
        to: {
            marginTop: '0'
        }, from: {
            marginTop: '-100px'

        },config: {
            // chỉnh time trong vòng hiện xuống trong vòng 5s
            duration:500
        }
    })


    return (
        <div>
            <animated.div style={propsSpring}>
                <Component />
            </animated.div>
        </div>
    )
}
