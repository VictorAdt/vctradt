import { Html, useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import styled from "styled-components";
import { useGrid } from "../../hooks/use-grid";

const KeyBoard = ({
    grid,
    setInput,
    mobileControlForward,
    mobileControlBack,
    mobileControlLeft,
    mobileControlRight
}) => {
    const left = useKeyboardControls((state) => state.left)
    const right = useKeyboardControls((state) => state.right)
    const forward = useKeyboardControls((state) => state.forward)
    const back = useKeyboardControls((state) => state.back)

    useEffect(() => {

    }, [left, right, forward, back])

    return (
        <Html
            position={[grid.colsCoords[11].end, 2, grid.rowCoords[5].end]}
        >
            <StyledContainer >

                <ArrowLayout>
                    <KeyRow>
                        <Key
                            onClick={() => console.log('reads')}
                            active={forward || mobileControlForward}
                            onPointerDown={() => setInput.setMobileControlForward(true)}
                            onMouseDown={() => setInput.setMobileControlForward(true)}
                            onMouseUp={() => setInput.setMobileControlForward(false)}
                        >
                            ↑
                        </Key>
                    </KeyRow>
                    <KeyRow >
                        <Key active={left || mobileControlLeft}
                            onMouseDown={() => setInput.setMobileControlLeft(true)}
                            onMouseUp={() => setInput.setMobileControlLeft(false)}
                        >
                            ←
                        </Key>
                        <Key active={back || mobileControlBack}
                            onMouseDown={() => setInput.setMobileControlBack(true)}
                            onMouseUp={() => setInput.setMobileControlBack(false)}
                        >
                            ↓
                        </Key>
                        <Key active={right || mobileControlRight}
                            onMouseDown={() => setInput.setMobileControlRight(true)}
                            onMouseUp={() => setInput.setMobileControlRight(false)}
                        >
                            →
                        </Key>
                    </KeyRow>
                </ArrowLayout>
            </StyledContainer>
        </Html >
    );
}

export default KeyBoard;

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
    background-color: ${props => props.active ? 'blue' : '#1A1A15'};
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
        z-index: -20;
        position: absolute;
        height: 100%;
        border-radius: 15px;
        opacity: .1;
        display: block;
        background-color: #000;
    }
`