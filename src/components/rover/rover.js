import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React, { createRef, useRef } from 'react'
import { Vector3 } from 'three'
import { AFTER_RAPIER_UPDATE } from '../../constants/constants'
import { AxleJoint, FixedJoint, SteeredJoint } from './joint'
import { Lift, Lifttest } from './lift'
import { isEven } from '../../utils/misc'
import { useGrid } from '../../hooks/use-grid'



export const Rover = () => {

    const chassisRef = useRef(null)
    const chassisModel = useGLTF('/chassis.glb')
    const { grid } = useGrid()
    console.log(grid);
    const wheels = [
        {
            axlePosition: [-.7, -0.6, 0.5],
            wheelPosition: [-.7, -0.4, 1],
            isSteered: false,
            side: 'left',
            isDriven: false,
        },
        {
            axlePosition: [-.7, -0.6, -0.5],
            wheelPosition: [-.7, -0.4, -1],
            isSteered: false,
            side: 'right',
            isDriven: false,
        },
        {
            axlePosition: [.5, -0.6, 0.5],
            wheelPosition: [.5, -0.4, 1],
            isSteered: true,
            side: 'left',
            isDriven: true,
        },
        {
            axlePosition: [.5, -0.6, -0.5],
            wheelPosition: [.5, -0.4, -1],
            isSteered: true,
            side: 'right',
            isDriven: true,
        },
    ]

    const wheelRefs = useRef(wheels.map(() => createRef()))
    const axleRefs = useRef(wheels.map(() => createRef()))
    useFrame((_, delta) => {
        const t = 1.0 - Math.pow(0.01, delta)

    }, AFTER_RAPIER_UPDATE)

    // [grid.colsCoords[grid.colsCoords.length - 1].end + grid.gutterSize * 2, 2, grid.rowCoords[grid.rowCoords.length - 2].middle]

    if (grid) {
        return (
            <>
                <group position={[grid.colsCoords[grid.colsCoords.length - 1].end + grid.gutterSize * 2, 2.1, grid.rowCoords[grid.rowCoords.length - 2].middle]} rotation={[0, -Math.PI / 4 + .6, 0]}>
                    {/* chassis */}
                    <RigidBody ref={chassisRef} colliders="hull" mass={0.7} name='rover-chasis' density={.1} args={[3.5, 0.5, 1.5]}  >
                        <primitive object={chassisModel.scene} position={[-.1, -.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
                    </RigidBody>
                    {<Lift body={chassisRef} />}
                    {/* wheels */}
                    {wheels.map((wheel, i) => (
                        <React.Fragment key={i}>
                            {/* axle */}
                            <RigidBody ref={axleRefs.current[i]} position={wheel.axlePosition} colliders="cuboid" name='rover-chasis' mass={.1} density={4}>
                                <mesh castShadow receiveShadow position={[0, 0, isEven(i) ? -.3 : .3]}>
                                    <boxGeometry args={[0.3, 0.04, 0.3]} />
                                    <meshBasicMaterial color="#c43535" />
                                </mesh>
                            </RigidBody>
                            {/* wheel */}
                            <RigidBody ref={wheelRefs.current[i]} position={wheel.wheelPosition} colliders={false} name='rover-chasis' scale={[1, 1, 1]}>
                                <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow position={[0, 0, isEven(i) ? -.3 : .3]}>
                                    <cylinderGeometry args={[0.25, 0.25, 0.24, 32]} />
                                    <meshBasicMaterial color="#666" />
                                </mesh>
                                wa
                                <CylinderCollider mass={0.1} friction={5} args={[0.125, 0.25]} rotation={[-Math.PI / 2, 0, 0]} />
                            </RigidBody>
                            {/* axle to chassis joint */}
                            {!wheel.isSteered ? (
                                <FixedJoint
                                    body={chassisRef}
                                    wheel={axleRefs.current[i]}
                                    body1Anchor={wheel.axlePosition}
                                    body1LocalFrame={[0, 0, 0, 1]}
                                    body2Anchor={[0, 0, 0]}
                                    body2LocalFrame={[0, 0, 0, 1]}
                                />
                            ) : (
                                <SteeredJoint
                                    body={chassisRef}
                                    wheel={axleRefs.current[i]}
                                    bodyAnchor={wheel.axlePosition}
                                    wheelAnchor={[0, 0, 0]}
                                    rotationAxis={wheel.steeringAxis === 'normal' ? [0, 1, 0] : [0, -1, 0]}
                                />
                            )}

                            {/* wheel to axle joint */}
                            <AxleJoint
                                body={axleRefs.current[i]}
                                wheel={wheelRefs.current[i]}
                                bodyAnchor={[0, 0, wheel.side === 'left' ? 0.35 : -0.35]}
                                wheelAnchor={[0, 0, 0]}
                                rotationAxis={[0, 0, 1]}
                                isDriven={wheel.isDriven}
                            />
                        </React.Fragment>
                    ))}
                </group>
            </>)
    }

}