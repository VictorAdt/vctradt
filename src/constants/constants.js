export const RAPIER_UPDATE_PRIORITY = -50
export const AFTER_RAPIER_UPDATE = RAPIER_UPDATE_PRIORITY - 1
export const AXLE_TO_CHASSIS_JOINT_STIFFNESS = 200000
export const AXLE_TO_CHASSIS_JOINT_DAMPING = 50
export const DRIVEN_WHEEL_FORCE = 800
export const DRIVEN_WHEEL_DAMPING = 5

export const CONTROLS = {
    forward: 'forward',
    back: 'back',
    left: 'left',
    right: 'right',
    brake: 'brake',
    liftUp: 'liftUp',
    liftDown: 'liftDown'
}

export const CONTROLS_MAP = [
    { name: CONTROLS.forward, keys: ['ArrowUp', 'w', 'W'] },
    { name: CONTROLS.back, keys: ['ArrowDown', 's', 'S'] },
    { name: CONTROLS.left, keys: ['ArrowLeft', 'a', 'A'] },
    { name: CONTROLS.right, keys: ['ArrowRight', 'd', 'D'] },
    { name: CONTROLS.brake, keys: ['Space'] },
    { name: CONTROLS.liftUp, keys: ['e', 'E'] },
    { name: CONTROLS.liftDown, keys: ['q', 'Q'] },
]

export const collisionGroups = {
    ground_forklift: '',
    fakeGround: '',
    props: '',
}

export const meta = {
    title: 'Victor Audétat',
    description: `Hello ! I'm a developer and a graphic designer. Based in Lausanne - Switzerland`,
}