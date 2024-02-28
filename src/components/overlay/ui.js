import { useEffect, useState } from "react";
import styled from "styled-components";

export const Button = () => {
    return (<StyledButton></StyledButton>);
}

export const Container = () => {
    return (<StyledContainer></StyledContainer>);
}

export const FloatingButton = () => {
    return (<StyledFloatingButton></StyledFloatingButton>);
}

export const Controls = () => {
    const [keyPressed, setKeyPressed] = useState()

    const handleKey = (event) => {
        console.log(event);
        setKeyPressed(event.key)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    return (
        <StyledContainer >
            <ArrowLayout>
                <KeyRow>
                    <Key>
                        ↑
                    </Key>
                </KeyRow>
                <KeyRow>
                    <Key>
                        ←
                    </Key>
                    <Key>
                        ↓
                    </Key>
                    <Key>
                        →
                    </Key>
                </KeyRow>
            </ArrowLayout>
        </StyledContainer >
    )
}

const ArrowLayout = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const KeyRow = styled('div')`
    display: flex;
`

const Key = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e3e3e3;
    border: 1px solid #333;
    background-color: #1A1A15;
    border-radius: 10px;
    font-weight: bolder;
    position: relative;
    height: 50px;
    width: 50px;
    margin: 1px;
    font-size: 20px;
    &:after{
        height: 50px;
        width: 50px;
        position: absolute;
        border-radius: 10px;
        z-index: -1;
        content: '';
        top: 3px;
        right:3px;
        background-color: #0B0B0B;
        opacity: .8;
    }
`

const StyledContainer = styled('div')`
    position: absolute;
    bottom: 40px;
    right: 40px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    backdrop-filter: blur(5px);
    border: 1px solid #333;
    &:after{
        content: '';
        width: 100%;
        position: absolute;
        height: 100%;
        border-radius: 15px;
        opacity: .1;
        display: block;
        background-color: #000;
    }
`

const StyledFloatingButton = styled('div')`
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 20px;
    height: 20px;
    border-radius: 50px;
    width: 20px;
    background-color: #000;
    opacity: .7;
    backdrop-filter: blur(5px);
`

const StyledButton = styled('div')`
    position: absolute;
    bottom: 20px;
    left: 50%;
    padding: 20px;
    height: 20px;
    border-radius: 50px;
    width: 100px;
    background-color: #000;
    opacity: .4;
    backdrop-filter: blur(5px);
`