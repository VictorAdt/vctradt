import { animated, useSpring, useSprings, useTrail } from "@react-spring/web";
import { useState } from "react";
import styled from "styled-components";


const iconSize = '40px'
const containerpadding = 10
const iconSizeN = 40
const iconSpacing = 2

export const Social = () => {

    const socials = [
        {
            name: 'Linkedin',
            url: '',
            icon: '',
        },
        {
            name: 'Github',
            url: '',
            icon: '',
        },
    ]

    const [isClicked, setIsClicked] = useState(false)

    const { height } = useSpring({
        height: isClicked ? `${((socials.length * iconSizeN) + (socials.length) * iconSpacing) + containerpadding * 2}px` : `${iconSizeN}px`,
        config: { mass: 4, tension: 3000, friction: 100 },
    })

    const [trail, api] = useTrail(
        2,
        () => ({
            y: isClicked ? `${((socials.length * iconSizeN) + (socials.length) * iconSpacing) + containerpadding * 2}px` : 0,
            config: { mass: 4, tension: 3000, friction: 100 },
        }),
        []
    )

    const [buttonSprings] = useSprings(socials.length, i => ({
        y: isClicked ? 20 : 0,
        config: { mass: 1, tension: 100, friction: 100 },
    }))

    return (
        <FloatingButtonContainer
            style={{ height }}
            onClick={() => setIsClicked(!isClicked)}
        >
            <FloatingButton>
                {Array.from({ length: 3 }).map(() => <Dot />)}
            </FloatingButton>
            <ItemsContaier>
                {buttonSprings.map((props, index) => (
                    <FloatingButton style={props} key={index} />
                ))}
            </ItemsContaier>
        </FloatingButtonContainer>
    );
}

const ItemsContaier = styled('div')`    
    width: ${iconSize};
    height: ${iconSize};
    position: relative;
    z-index: 0;
`


const FloatingButton = styled(animated.div)`
    width: ${iconSize};
    height: ${iconSize};
    background-color: #fff;
    border-radius: 30px;
    z-index: 99;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const FloatingButtonContainer = styled(animated.div)`
    border-radius: 50px;
    backdrop-filter: blur(5px);
    position: absolute;
    bottom: 40px;
    left: 40px;
    border: 1px solid #333;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    &:after{
        content: '';
        width: 100%;
        position: absolute;
        height: 100%;
        border-radius: 50px;
        opacity: .1;
        display: block;
        background-color: #000;
}`

const Dot = styled('div')`
    width: 5px;
    background-color: #333;
    height: 5px; 
    margin: 1px 1px;
    border-radius: 15px;
`