import { animated, useSpring, useSprings, useTrail } from "@react-spring/web";
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const socials = [
    {
        name: 'Linkedin',
        url: '',
        icon: faLinkedinIn,
    },
    {
        name: 'Github',
        url: 'https://github.com/VictorAdt',
        icon: faGithub,
    },
    {
        name: 'Mail',
        url: '#',
        icon: faEnvelope,
    },
]
const icongap = 6
const iconSize = '40px'
const containerpadding = 10
const iconSizeN = 40

export const Social = () => {

    const [isClicked, setIsClicked] = useState(false)
    const springConfig = { mass: 4, tension: 3000, friction: 100 }
    const { height } = useSpring({
        height: isClicked ? (socials.length * iconSizeN) + (socials.length * icongap) + (containerpadding * 4) : iconSizeN,
        config: springConfig,
    })

    const [springs, api] = useSprings(
        socials.length,
        () => ({
            y: 0,
            config: springConfig,
        }),
    )

    const handleClick = () => {
        setIsClicked(!isClicked)
        api.start(i => ({
            y: !isClicked ? (i + 1) * -iconSizeN - icongap * (i + 1) : 0,
        }))
    }

    return (
        <FloatingButtonContainer
            style={{ height }}
        >
            <FloatingButton onClick={handleClick}>
                {Array.from({ length: 3 }).map(() => <Dot />)}
            </FloatingButton>
            <ItemsContaier active={isClicked}>
                {springs.map((props, index) => {
                    return (
                        <FloatingButtonLink
                            style={props}
                            active={isClicked}
                            key={index}
                            href={socials[index].url}
                            rel="noopener noreferrer"
                            target={"_blank"}
                        >
                            <FontAwesomeIcon icon={socials[index].icon} />
                        </FloatingButtonLink>
                    )
                })}
            </ItemsContaier>
        </FloatingButtonContainer >
    );
}

const ItemsContaier = styled('div')`    
    width: ${iconSize};
    height: ${props => props.active ? (socials.length * iconSizeN) + (socials.length * icongap) + (containerpadding * 4) : iconSizeN}px;
    position: relative;
    z-index: ${props => props.active ? 'initial' : 1};
`

const FloatingButton = styled(animated.button)`
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
    border: 0;
`

const FloatingButtonLink = styled(animated.a)`
    width: ${iconSize};
    font-size: 18px;
    height: ${iconSize};
    background-color: #fff;
    border-radius: 30px;
    z-index: ${props => props.active ? 200 : 99};
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
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
    z-index: 0;
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