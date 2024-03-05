import { Html, Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { createRef, useRef } from "react";
import { useGrid } from "../../hooks/use-grid";
import { theme } from "../theme/theme";
import { isMobile } from 'react-device-detect';
import styled from "styled-components";

export const TextGroup = ({
    fontStyle,
    marginTop,
    content,
    fontSize,
    colStart,
    rowStart,
    lineHeightModifier,
    isVerticalyCentered,
    height,
    title
}) => {
    const { grid } = useGrid()
    const groupRef = useRef()
    if (grid) {
        const z = grid.rowCoords[rowStart[grid.breakpoint]]
        const lineHeight = lineHeightModifier || 0
        const style = fontStyle || 'italic'
        return (
            <group ref={groupRef}>
                {content.map((element, index) =>
                    <Text
                        titleIndex={title ? index : false}
                        key={index}
                        height={height}
                        fontStyle={style}
                        grid={grid}
                        content={element}
                        fontSize={fontSize}
                        colStart={colStart}
                        positionZ={(isVerticalyCentered ? z.middle : z.start) + (fontSize[grid.breakpoint] / (19 - lineHeight)) * index + marginTop[grid.breakpoint]}
                    />)}
            </group>
        )
    }
}

export const Text = ({
    fontStyle,
    content,
    fontSize,
    colStart,
    positionZ,
    height,
    rowStart,
    grid,
    titleIndex
}) => {
    const splitText = content.split('')
    const htlmTextRef = useRef(splitText.map(() => createRef()))
    const rigidBodyTextRef = useRef(splitText.map(() => createRef()))
    const dTextRef = useRef(splitText.map(() => createRef()))
    const groupRef = useRef()
    const charHeight = height || .5
    const Tag = styled(typeof titleIndex === 'number' ? `h${titleIndex + 1}` : 'div')``
    if (grid) {
        const x = grid.colsCoords[colStart[grid.breakpoint]]
        return (
            <>
                <group ref={groupRef} >
                    {splitText.map((element, index) => {
                        return (
                            <RigidBody
                                ref={rigidBodyTextRef.current[index]}
                                name={element}
                                key={index}
                                mass={0.01}
                                density={0.01}
                                position={[
                                    x.start + index * (fontSize[grid.breakpoint] / 26),
                                    0.1,
                                    positionZ + (fontSize[grid.breakpoint] / 26.6667)]}
                                rotation={[- Math.PI / 2, 0, 0]}
                                onCollisionEnter={({ manifold, target, other }) => {
                                    if (other.rigidBodyObject.name !== 'ground' && other.rigidBodyObject.name !== element) {
                                        htlmTextRef.current[index].current.style.opacity = 0
                                    }
                                }}
                            >
                                <Text3D
                                    ref={dTextRef.current[index]}
                                    font={`/TTInterphasesProMono_${fontStyle}.json`}
                                    size={fontSize[grid.breakpoint] / 26.6667}
                                    height={charHeight}
                                    curveSegments={6}
                                >
                                    {element}
                                    <meshBasicMaterial color={theme.colors.text} />
                                </Text3D>
                            </RigidBody>
                        )
                    })}
                </group>
                <Html
                    style={{
                        position: 'static',
                        width: '1000vw',
                        zIndex: 0,
                    }}
                    position={[grid.colsCoords[colStart[grid.breakpoint]].start, 0.5, positionZ]}
                >
                    <Tag style={{
                        color: theme.colors.text,
                        fontSize: `${fontSize[grid.breakpoint]}px`,
                        letterSpacing: `${fontSize[grid.breakpoint] / 5.9}px`,
                        lineHeight: isMobile ? .94 : 0.75,
                        fontWeight: 'lighter',
                        fontFamily: `TTmono-${fontStyle}`
                    }}>
                        {splitText.map((element, index) => {
                            return (
                                <span key={index} ref={htlmTextRef.current[index]} style={{ fontFamily: `TTmono-${fontStyle}` }}>
                                    {element}
                                </span>
                            )
                        })}
                    </Tag>
                </Html >
            </>
        )
    };
}
