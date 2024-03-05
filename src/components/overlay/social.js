import { animated, useSpring, useSprings } from "@react-spring/web";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Html } from "@react-three/drei";
import { useGrid } from "../../hooks/use-grid";
import { isEven } from "../../utils/misc";
import { theme } from "../theme/theme";

const socials = [
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/victor-aud%C3%A9tat-8aa43315b/',
        icon: faLinkedinIn,
        description: `Linkedin profile link`
    },
    {
        name: 'Github',
        url: 'https://github.com/VictorAdt',
        icon: faGithub,
        description: `Github profile link`

    },
    {
        name: 'Mail',
        url: 'mailto:audetat.v@gmail.com',
        icon: faEnvelope,
        description: `Write me an email`
    },
]
const icongap = 6
const iconSize = '39px'
const containerpadding = 10
const iconSizeN = 39

export const Social = () => {

    const [isClicked, setIsClicked] = useState(false)
    const { grid } = useGrid()
    const springConfig = { mass: 5, tension: 6000, friction: 500 }

    const { height } = useSpring({
        height: isClicked ? (socials.length * iconSizeN) + (socials.length * icongap) + (containerpadding * 4) : iconSizeN,
        config: springConfig,
    })

    const { opacity, width, backgroundColor, border } = useSpring({
        width: isClicked ? 15 : 5,
        height: isClicked ? 15 : 5,
        backgroundColor: isClicked ? 'white' : theme.colors.color,
        border: isClicked ? `2px solid ${theme.colors.color}` : '0px solid #fff',
        opacity: isClicked ? 0 : 1,
        config: {
            tension: 4000, friction: 100
        }
    })

    const [springs, api] = useSprings(
        socials.length,
        () => ({
            y: 0,
            opacity: 0,
            config: springConfig,
        }),
    )

    const socialsButtonsPos = {
        xs: [0, 5],
        sm: [0, 5],
        md: [0, 5],
        lg: [0, 5],
        xl: [0, 5],
    }

    const handleClick = () => {
        setIsClicked(!isClicked)
        api.start(i => ({
            y: !isClicked ? (i + 1) * -iconSizeN - icongap * (i + 1) : 0,
            opacity: !isClicked ? 1 : 0,
            delay: i * 50
        }))
    }
    if (grid)
        return (
            <Html
                style={{
                    position: "relative",
                    left: `${-iconSizeN}px`,
                    bottom: `${-iconSizeN / 2}px`,
                }}
                position={[
                    grid.colsCoords[socialsButtonsPos[grid.breakpoint][0]].start,
                    2,
                    grid.rowCoords[socialsButtonsPos[grid.breakpoint][1]].end
                ]}
            >
                <FloatingButtonContainer
                    style={{ height }}
                >
                    <FloatingButton onClick={handleClick}>
                        {Array.from({ length: 3 }).map((_, i) => isEven(i) ? <Dot style={{ opacity }} /> : <Dot style={{ height: width, width, backgroundColor, border }} />)}
                    </FloatingButton>
                    <ItemsContaier active={isClicked} >
                        {springs.map((props, index) => {
                            return (
                                <FloatingButtonLink
                                    tabindex={isClicked ? 0 : -1}
                                    style={props}
                                    active={isClicked}
                                    key={index}
                                    href={socials[index].url}
                                    rel="noopener noreferrer"
                                    target={"_blank"}
                                    aria-label={socials[index].description}
                                >
                                    <StyledIcon icon={socials[index].icon} />
                                </FloatingButtonLink>
                            )
                        })}
                    </ItemsContaier>
                </FloatingButtonContainer >
            </Html>
        );
}

export const LetsWork = () => {
    return (
        <FloatingButtonContainer>
            <h2>Let's build something together</h2>
            <p>Send me an email</p>
        </FloatingButtonContainer>
    )
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
    color: '#333';
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

const Dot = styled(animated.div)`
    width: 5px;
    background-color: #333;
    height: 5px; 
    margin: 1px 1px;
    border-radius: 15px;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #333;
    transition: all .2s;
    &:hover{
        color: #a5a5a5;
    }
`
