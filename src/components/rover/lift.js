import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useFixedJoint, usePrismaticJoint } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { DRIVEN_WHEEL_DAMPING } from "../../constants/constants";
import { Vector3 } from "three";

export const Lift = ({ body }) => {
    const liftUpPressed = useKeyboardControls((state) => state.liftUp)
    const liftDownPressed = useKeyboardControls((state) => state.liftDown)
    const platRef = useRef(null)
    const groupRef = useRef(null)
    const meshRef = useRef(null)
    const liftModel = useGLTF('/lift.glb')

    const [enable, setEnable] = useState(true)

    const joint = usePrismaticJoint(body, platRef, [
        [-1.3, 0, 0],
        [0, .2, 0],
        [0, 1, 0]
    ])

    useEffect(() => {
        const min = -.5
        const max = 2
        let lift = min
        if (liftUpPressed) lift -= 5
        if (liftDownPressed) lift += 5
        joint.current?.configureMotorModel(1)
        joint.current?.setLimits(min, max)
        joint.current?.configureMotor(0, lift, 0, 0);
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
        <group ref={groupRef} >
            <RigidBody ref={platRef} colliders='hull' mass={1} density={0.01} position={[0, 0, 0]}>
                <mesh castShadow receiveShadow ref={meshRef}>
                    <boxGeometry args={[.25, 0.01, 1]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>
        </group>
    )
}
