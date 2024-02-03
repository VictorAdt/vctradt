import { RigidBody } from '@react-three/rapier'
import React, { useRef } from 'react'
import { useGrid } from '../../../hooks/use-grid'
import { Wall } from './wall'

export const World = () => {
    const planeRef = useRef()
    const { grid } = useGrid()
    if (grid) {
        return (
            <>
                <RigidBody name='ground' type="fixed" friction={5} scale={[150, 150, 150]} colliders='hull' position={[0, 0, 0]} rotation={[- Math.PI / 2, 0, 0]}>
                    <mesh castShadow receiveShadow ref={planeRef} >
                        <planeGeometry />
                        <meshStandardMaterial color={'yellow'} opacity={.5} transparent />
                    </mesh>
                </RigidBody>
                <ambientLight intensity={2.5} />
                <directionalLight
                    intensity={4}
                    decay={1.5}
                    position={[20, 30, 20]}
                    castShadow
                    shadow-camera-top={8}
                    shadow-camera-right={8}
                    shadow-camera-bottom={-8}
                    shadow-camera-left={-8}
                    shadow-mapSize-height={2048}
                    shadow-mapSize-width={2048}
                />
                {grid.colsCoords.map((e, i) => {
                    return (
                        <mesh position={[grid.colsCoords[i].middle, -.1, 0]} rotation={[- Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[grid.colWidth, 200]} />
                            <meshStandardMaterial color={'yellow'} opacity={.5} transparent />
                        </mesh>
                    )
                })}
                {grid.rowCoords.map((e, i) => {
                    return (
                        <mesh position={[0, -.2, grid.rowCoords[i].middle]} rotation={[- Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[200, grid.rowWidth]} />
                            <meshStandardMaterial color={'blue'} opacity={.5} transparent />
                        </mesh>
                    )
                })}
            </>
        )
    }
}

