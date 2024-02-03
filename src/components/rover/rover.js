import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import React, { createRef, useRef } from 'react'
import { Vector3 } from 'three'
import { AFTER_RAPIER_UPDATE, LEVA_KEY } from '../../constants/constants'
import { AxleJoint, FixedJoint, SteeredJoint } from './joint'
import { Lift, Lifttest } from './lift'



export const Rover = () => {

    /*
       const camera = useThree((state) => state.camera)
       const currentCameraPosition = useRef(new Vector3(15, 15, 0))
       const currentCameraLookAt = useRef(new Vector3()) */

    const chassisRef = useRef(null)

    const wheels = [
        {
            axlePosition: [-1.2, -0.6, 0.7],
            wheelPosition: [-1.2, -1, 1],
            isSteered: true,
            side: 'left',
            isDriven: false,
            steeringAxis: 'normal'
        },
        {
            axlePosition: [-1.2, -0.6, -0.7],
            wheelPosition: [-1.2, -1, -1],
            isSteered: true,
            side: 'right',
            isDriven: false,
            steeringAxis: 'normal'
        },

        {
            axlePosition: [0, -0.6, -0.7],
            wheelPosition: [0, -1, -1],
            isSteered: false,
            side: 'right',
            isDriven: true,
            steeringAxis: 'normal'
        },
        {
            axlePosition: [0, -0.6, 0.7],
            wheelPosition: [-1, -1, 1],
            isSteered: false,
            side: 'left',
            isDriven: true,
            steeringAxis: 'normal'
        },

        {
            axlePosition: [1.2, -0.6, 0.7],
            wheelPosition: [1.2, -1, 1],
            isSteered: true,
            side: 'left',
        },
        {
            axlePosition: [1.2, -0.6, -0.7],
            wheelPosition: [1.2, -1, -1],
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

    return (
        <>
            <group position={[5, 2, 5]} >
                {/* chassis */}
                <RigidBody ref={chassisRef} colliders="cuboid" mass={0.7} name='rover-chasis'>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[3.5, 0.5, 1.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </RigidBody>
                <Lift body={chassisRef} />
                {/* wheels */}
                {wheels.map((wheel, i) => (
                    <React.Fragment key={i}>
                        {/* axle */}
                        <RigidBody ref={axleRefs.current[i]} position={wheel.axlePosition} colliders="cuboid" name='rover-chasis'>
                            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                                <boxGeometry args={[0.3, 0.3, 0.3]} />
                                <meshStandardMaterial color="#999" />
                            </mesh>
                        </RigidBody>
                        {/* wheel */}
                        <RigidBody ref={wheelRefs.current[i]} position={wheel.wheelPosition} colliders={false} name='rover-chasis'>
                            <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
                                <cylinderGeometry args={[0.25, 0.25, 0.24, 32]} />
                                <meshStandardMaterial color="#666" />
                            </mesh>
                            <mesh rotation-x={-Math.PI / 2}>
                                <cylinderGeometry args={[0.251, 0.251, 0.241, 16]} />
                                <meshStandardMaterial color="#000" wireframe />
                            </mesh>
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
        </>
    )
}