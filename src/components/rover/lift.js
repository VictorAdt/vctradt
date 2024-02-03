import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useFixedJoint, usePrismaticJoint } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { DRIVEN_WHEEL_DAMPING } from "../../constants/constants";
import { Vector3 } from "three";

export const Lift = ({ body }) => {
    const liftUpPressed = useKeyboardControls((state) => state.liftUp)
    const liftDownPressed = useKeyboardControls((state) => state.liftDown)
    const platRef = useRef(null)
    const groupRef = useRef(null)
    const meshRef = useRef(null)
    const joint = usePrismaticJoint(body, platRef, [
        // Position of the joint in bodyA's local space
        [-3, -0.4, 0],
        // Position of the joint in bodyB's local space
        [0, -0.4, 0],
        // Axis of the joint, expressed in the local-space of
        // the rigid-bodies it is attached to. Cannot be [0,0,0].
        [0, 1, 0]
    ])

    useEffect(() => {
        let lift = 0
        if (liftUpPressed) lift -= 5
        if (liftDownPressed) lift += 5
        joint.current?.configureMotorVelocity(lift, 0);
        joint.current?.configureMotorModel(1)
        joint.current?.setLimits(-0.7, 3)
        joint.current?.configureMotor(0, lift, 0, 0);
        console.log(platRef.current);
    }, [liftUpPressed, liftDownPressed, joint])

    useFrame(() => {
        const scale = meshRef.current.parent.position.y
        meshRef.current.scale.x = 1 + (2.95 + scale) / 20
        meshRef.current.scale.z = 1 + (2.95 + scale) / 20
        meshRef.current.scale.y = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.x = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.z = 1 + (2.95 + scale) / 20
        meshRef.current.parent.scale.y = 1 + (2.95 + scale) / 20
    })


    return (
        <group ref={groupRef}>
            <RigidBody ref={platRef} mass={0.0}>
                <mesh castShadow receiveShadow ref={meshRef}>
                    <boxGeometry args={[2, 0.01, 1]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </RigidBody>
        </group>
    )
}
