import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { RigidBody, usePrismaticJoint } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";


export const Lift = ({ body, ref }) => {
    const liftUpPressed = useKeyboardControls((state) => state.liftUp)
    const liftDownPressed = useKeyboardControls((state) => state.liftDown)
    const forkModel = useGLTF('/fork.glb')
    const liftRef = useRef(null)
    const meshRef = useRef(null)
    const min = -.25
    const max = 1.7
    const [targetPos, setTargetPos] = useState(min)
    const joint = usePrismaticJoint(body, liftRef, [
        [-.1, 0, 0], // BODY
        [0, 0, 0], // LIFT
        [0, 1, 0] // AXIS
    ])

    /*useEffect(() => {
    
        joint.current.setLimits(min, max)
        joint.current.configureMotorVelocity(.1, 1)
        if (liftUpPressed) {
            joint.current.configureMotorPosition(max, 1000, -1,);
        }
        if (liftDownPressed) {
            joint.current.configureMotorPosition(min, 1000, -1,);
        }
    }, [liftUpPressed, liftDownPressed, joint]) */

    useEffect(() => {
        joint.current.setLimits(min, max)
        joint.current.configureMotorVelocity(200, 1)
        if (liftUpPressed) {
            setTargetPos(max)
        }
        if (liftDownPressed) {
            setTargetPos(min)
        }
        // joint.current.setLimits(targetPos, targetPos);
        joint.current.configureMotorPosition(targetPos, 300, .1);
        // IF HEIGHT == TARGET POS : LOCK
    }, [liftUpPressed, liftDownPressed, joint, min, targetPos])

    return (
        <>
            <RigidBody ref={liftRef} colliders='hull' mass={.001} density={.001}>
                {<primitive ref={meshRef} object={forkModel.scene} rotation={[0, -Math.PI, 0]} scale={[.25, .25, .25]} position={[0, 0, 0]} />}
            </RigidBody>
        </>

    )
}

// <boxGeometry args={[.25, 0.01, 1]} />
// <meshStandardMaterial color="red" />

