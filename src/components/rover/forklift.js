import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React, { createRef, useRef, useState } from 'react'
import { AxleJoint, FixedJoint, SteeredJoint } from './joint'
import { Lift, } from './lift'
import { isEven } from '../../utils/misc'
import { useGrid } from '../../hooks/use-grid'
import KeyBoard from '../overlay/keyboard'

export const Forklift = () => {
    const [mobileControlForward, setMobileControlForward] = useState(false)
    const [mobileControlBack, setMobileControlBack] = useState(false)
    const [mobileControlLeft, setMobileControlLeft] = useState(false)
    const [mobileControlRight, setMobileControlRight] = useState(false)
    const chassisRef = useRef(null)
    const chassisModel = useGLTF('/chassis.glb')
    const { grid } = useGrid()
    const wheels = [
        {
            axlePosition: [-.5, -0.15, 0.5],
            wheelPosition: [-.5, -0.4, 1],
            isSteered: false,
            side: 'left',
            isDriven: false,
        },
        {
            axlePosition: [-.5, -.15, -0.5],
            wheelPosition: [-.5, -0.4, -1],
            isSteered: false,
            side: 'right',
            isDriven: false,
        },
        {
            axlePosition: [.9, -.15, .5],
            wheelPosition: [.0, -0.4, -.0],
            isSteered: true,
            side: 'left',
            isDriven: true,
        },
        {
            axlePosition: [.9, -.15, -.5],
            wheelPosition: [.0, -0.4, .0],
            isSteered: true,
            side: 'right',
            isDriven: true,
        },
    ]

    const wheelRefs = useRef(wheels.map(() => createRef()))
    const axleRefs = useRef(wheels.map(() => createRef()))
    const liftRef = useRef()

    // [grid.colsCoords[grid.colsCoords.length - 1].end + grid.gutterSize * 2, 2, grid.rowCoords[grid.rowCoords.length - 2].middle]

    if (grid) {
        return (
            <>
                <group position={[
                    grid.colsCoords[grid.colsCoords.length - 1].end + grid.gutterSize * 2 + 1,
                    2,
                    grid.rowCoords[grid.rowCoords.length - 2].start]}
                    rotation={[0, -Math.PI / 4 + .6, 0]} >
                    {/* chassis */}
                    <RigidBody ref={chassisRef} colliders="hull" mass={0.001} name='rover-chasis' density={.001}>
                        {<primitive object={chassisModel.scene} position={[-.1, -.2, 0]} rotation={[0, -Math.PI, 0]} scale={[.25, .25, .25]} />}
                    </RigidBody>
                    {/* wheels */}
                    {<Lift body={chassisRef} ref={liftRef} />}
                    <FixedJoint
                        body={chassisRef}
                        wheel={liftRef}
                        body1Anchor={[1, 0, 0]}
                        body2Anchor={[-1, 0, 0]}
                        body1LocalFrame={[0, 0, 0]}
                        body2LocalFrame={[0, 0, 0]}
                    />
                    {wheels.map((wheel, i) => (
                        <React.Fragment key={i}>
                            {/* axle */}
                            <RigidBody
                                ref={axleRefs.current[i]}
                                position={wheel.axlePosition}
                                colliders="cuboid"
                                name='rover-chasis'
                                mass={.1}
                                density={4}
                                collisionGroups={0b0000_0000_0000_0001}
                                solverGroups={0b0000_0000_0000_0001}
                            >
                                <mesh
                                    castShadow
                                    receiveShadow
                                    position={[0, 0, isEven(i) ? -.15 : .15]}>
                                    <boxGeometry args={[0.1, 0.1, 0.2]} />
                                    <meshBasicMaterial color="orange" />
                                </mesh>
                            </RigidBody>
                            {/* wheel */}
                            <RigidBody ref={wheelRefs.current[i]} position={wheel.wheelPosition} colliders={false} name='rover-chasis' scale={[1, 1, 1]} density={.1} mass={0.1}>
                                <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow position={[0, 0, isEven(i) ? -.35 : .35]} >
                                    <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
                                    <meshBasicMaterial color="#140f0f" />
                                </mesh>
                                <CylinderCollider friction={4} args={[0.125, 0.25]} rotation={[-Math.PI / 2, 0, 0]} />
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
                                    mobileControlLeft={mobileControlLeft}
                                    mobileControlRight={mobileControlRight}
                                    body={chassisRef}
                                    wheel={axleRefs.current[i]}
                                    bodyAnchor={wheel.axlePosition}
                                    wheelAnchor={[0, 0, 0]}
                                    rotationAxis={wheel.steeringAxis === 'normal' ? [0, 1, 0] : [0, -1, 0]}
                                />
                            )}

                            {/* wheel to axle joint */}
                            <AxleJoint
                                mobileControlForward={mobileControlForward}
                                mobileControlBack={mobileControlBack}
                                body={axleRefs.current[i]}
                                wheel={wheelRefs.current[i]}
                                bodyAnchor={[0, 0, wheel.side === 'left' ? 0.35 : -0.35]}
                                wheelAnchor={[0, 0, 0]}
                                rotationAxis={[0, 0, 1]}
                                isDriven={wheel.isDriven}
                                breakpoint={grid.breakpoint}
                            />

                        </React.Fragment>
                    ))}
                </group >
                <KeyBoard grid={grid} setInput={{
                    setMobileControlForward,
                    setMobileControlBack,
                    setMobileControlLeft,
                    setMobileControlRight
                }}
                    mobileControlForward={mobileControlForward}
                    mobileControlBack={mobileControlBack}
                    mobileControlLeft={mobileControlLeft}
                    mobileControlRight={mobileControlRight} />
            </>)
    }

}