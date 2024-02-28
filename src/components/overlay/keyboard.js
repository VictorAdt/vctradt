import { Html, useKeyboardControls } from "@react-three/drei";
import styled from "styled-components";

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

    const keyboardPos = {
        xs: [3, 5],
        sm: [3, 5],
        md: [11, 5],
        lg: [11, 5],
        xl: [11, 5],
    }

    console.log(grid);
    return (
        <Html
            position={[grid.colsCoords[keyboardPos[grid.breakpoint][0]].end, 2, grid.rowCoords[keyboardPos[grid.breakpoint][1]].end]}
        >
            <StyledContainer >

                <ArrowLayout>
                    <KeyRow>
                        <Key
                            onClick={() => console.log('reads')}
                            active={forward || mobileControlForward}
                            onPointerDown={() => setInput.setMobileControlForward(true)}
                            onPointerUp={() => setInput.setMobileControlForward(false)}
                            onMouseDown={() => setInput.setMobileControlForward(true)}
                            onMouseUp={() => setInput.setMobileControlForward(false)}
                        >
                            <span style={{
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}>↑</span>
                        </Key>
                    </KeyRow>
                    <KeyRow >
                        <Key active={left || mobileControlLeft}
                            onPointerDown={() => setInput.setMobileControlLeft(true)}
                            onPointerUp={() => setInput.setMobileControlLeft(false)}
                            onMouseDown={() => setInput.setMobileControlLeft(true)}
                            onMouseUp={() => setInput.setMobileControlLeft(false)}
                        >
                            <span style={{
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}>←</span>
                        </Key>
                        <Key active={back || mobileControlBack}
                            onPointerDown={() => setInput.setMobileControlBack(true)}
                            onPointerUp={() => setInput.setMobileControlBack(false)}
                            onMouseDown={() => setInput.setMobileControlBack(true)}
                            onMouseUp={() => setInput.setMobileControlBack(false)}
                        >
                            <span style={{
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}>↓</span>
                        </Key>
                        <Key active={right || mobileControlRight}
                            onPointerDown={() => setInput.setMobileControlRight(true)}
                            onPointerUp={() => setInput.setMobileControlRight(false)}
                            onMouseDown={() => setInput.setMobileControlRight(true)}
                            onMouseUp={() => setInput.setMobileControlRight(false)}
                        >
                            <span style={{
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }}>→</span>
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

const Key = styled('button')`
    user-select: none;
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