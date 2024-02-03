import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useGrid } from "../../../hooks/use-grid";
import { isEven, randBetween } from "../../../utils/misc";



export const Brick = ({ position, color, dimensions }) => {
    const meshRef = useRef(null)
    /*
    useFrame(() => {
        const scale = meshRef.current.parent.position.y
        meshRef.current.scale.x = 1 + (2.95 + scale) / 20
        meshRef.current.scale.z = 1 + (2.95 + scale) / 20
        meshRef.current.scale.y = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.x = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.z = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.y = 1 + (2.95 + scale) / 20
    })*/
    return (
        <RigidBody position={position} colliders="cuboid"
            mass={0.01}
            density={0.01} >
            <mesh ref={meshRef} >
                <boxGeometry args={dimensions} />
                <meshStandardMaterial color={color ? color : 'orange'} />
            </mesh>
        </RigidBody>
    )
}

export const BrickAndBalls = () => {
    const { grid } = useGrid()
    const width = 2
    const height = 1
    const depth = 1

    const spheresPositions = {
        xs: [],
        sm: [],
        md: [],
        lg: [],
        xl: [[6, 1], [8, 4], [2, 5], [11, 2], [11, 5]],
    }
    const bricksPositions = {
        xs: [],
        sm: [],
        md: [],
        lg: [],
        xl: [[2, 1], [8, 1], [0, 2], [6, 3], [9, 3], [6, 5], [7, 5]],
    }
    if (grid) {
        return (<>
            {bricksPositions[grid.breakpoint].map((e, i) => {
                const x = grid.colsCoords[e[0]].start + width / 2
                const z = grid.rowCoords[e[1]].start + height / 2
                return (
                    <Brick
                        position={[x, 0.1, z]}
                        dimensions={[
                            width,
                            height,
                            depth
                        ]}
                    />
                )

            })}
            {spheresPositions[grid.breakpoint].map((e, i) => {
                const x = grid.colsCoords[e[0]].start + width / 2
                const z = grid.rowCoords[e[1]].start + height / 2
                return (
                    <Ball
                        position={[x - .3, 0.1, z + .15]}
                    />
                )
            })}
        </>)
    }
}

const Ball = ({ position }) => {
    const meshRef = useRef(null)
    const width = .7
    return (
        <RigidBody position={position} colliders="ball"
            mass={0.01}
            density={0.01}
        >
            <mesh ref={meshRef}>
                <sphereGeometry args={[width]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>
    )
}

export const Wall = ({ colStart, colEnd, thickness, rowStart, isVerticalyCenter }) => {
    const { grid } = useGrid()
    if (grid) {
        const bigBrickN = colEnd[grid.breakpoint] - colStart[grid.breakpoint]
        const smallBrickN = bigBrickN - 1
        const bigBrickWidth = grid.colWidth
        const smallBrickWidth = grid.gutterSize
        const x = grid.colsCoords[colStart[grid.breakpoint]]
        const z = grid.rowCoords[rowStart[grid.breakpoint]]
        return (
            <group position={[x.start, 0.1, isVerticalyCenter ? z.middle : z.start + thickness / 2]}>
                {Array.from({ length: 1 }).map((_, indexH) => {
                    return Array.from({ length: bigBrickN + smallBrickN }).map((_, indexL) => {
                        const width = isEven(indexL) ? bigBrickWidth : smallBrickWidth
                        const start = isEven(indexL) ?
                            (indexL / 2) * (bigBrickWidth + smallBrickWidth) + bigBrickWidth / 2 :
                            Math.floor(indexL / 2) * (bigBrickWidth + smallBrickWidth) + bigBrickWidth + smallBrickWidth / 2;
                        return (
                            <Brick
                                dimensions={[
                                    width,
                                    1,
                                    thickness
                                ]}
                                position={[
                                    start,
                                    0.1,
                                    0,
                                ]} />
                        )
                    })
                })}
            </group>

        );
    }

}
