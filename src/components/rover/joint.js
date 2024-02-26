import { useKeyboardControls } from '@react-three/drei'
import { useFixedJoint, useRevoluteJoint } from '@react-three/rapier'
import { useEffect } from 'react'
import { AXLE_TO_CHASSIS_JOINT_DAMPING, AXLE_TO_CHASSIS_JOINT_STIFFNESS, DRIVEN_WHEEL_DAMPING, DRIVEN_WHEEL_FORCE } from '../../constants/constants'

export const FixedJoint = ({ body, wheel, body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame }) => {
    useFixedJoint(body, wheel, [body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame])
    return null
}

export const AxleJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis, isDriven }) => {
    const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis])
    const forwardPressed = useKeyboardControls((state) => state.forward)
    const backwardPressed = useKeyboardControls((state) => state.back)

    useEffect(() => {
        let forward = .8 * DRIVEN_WHEEL_FORCE
        joint.current?.configureMotorVelocity(forward, DRIVEN_WHEEL_DAMPING)
        setTimeout(() => {
            joint.current?.configureMotorVelocity(0, 80)
        }, 1500)

    }, [])

    useEffect(() => {
        if (!isDriven) return
        let forward = 0
        if (forwardPressed) forward += 1.4
        if (backwardPressed) forward -= 1.4
        forward *= DRIVEN_WHEEL_FORCE
        if (forward !== 0) {
            wheel.current?.wakeUp()
        }
        joint.current?.configureMotorVelocity(forward, DRIVEN_WHEEL_DAMPING)
    }, [forwardPressed, backwardPressed])

    return null
}

export const SteeredJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis }) => {
    const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis])
    const left = useKeyboardControls((state) => state.left)
    const right = useKeyboardControls((state) => state.right)
    const targetPos = left ? 0.2 : right ? -0.2 : 0

    useEffect(() => {
        let targetPos = -0.2
        joint.current?.configureMotorPosition(targetPos, AXLE_TO_CHASSIS_JOINT_STIFFNESS, AXLE_TO_CHASSIS_JOINT_DAMPING)
    }, [])

    useEffect(() => {
        joint.current?.configureMotorPosition(targetPos, AXLE_TO_CHASSIS_JOINT_STIFFNESS, AXLE_TO_CHASSIS_JOINT_DAMPING)
    }, [left, right])

    return null
}