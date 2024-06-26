import { RigidBody } from '@react-three/rapier'
import React, { useRef } from 'react'
import { useGrid } from '../../../hooks/use-grid'
import { a } from '@react-spring/three'
import { theme } from '../../theme/theme'


export const World = () => {
    const planeRef = useRef()
    const { grid } = useGrid()

    if (grid) {
        return (
            <>
                <RigidBody
                    name='ground'
                    type="fixed"
                    friction={1}
                    scale={[150, 150, 150]}
                    colliders='cuboid'
                    position={[0, 0, 0]}
                    rotation={[- Math.PI / 2, 0, 0]}
                >
                    <mesh ref={planeRef} >
                        <planeGeometry />
                        <meshBasicMaterial opacity={0} transparent />
                    </mesh>
                </RigidBody>
                <mesh ref={planeRef} scale={[150, 150, 150]} rotation={[- Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                    <planeGeometry />
                    <meshStandardMaterial color={theme.colors.background} transparent />
                </mesh>
                <ambientLight intensity={2.5} />
                <pointLight
                    color={'yellow'}
                    intensity={11000}
                    position={[150, 100, 150]}
                />
                <pointLight
                    color={'blue'}
                    intensity={10000}
                    position={[-150, 100, 150]}
                />
                {grid.colsCoords.map((_, i) => <Col grid={grid} index={i} key={i} />)}
            </>
        )
    }
}



/* const Row = ({ grid, index }) => {
    const [hovered, setHovered] = useState(false)

    const { color } = useSpring({
        color: hovered ? theme.colors.row.hover : theme.colors.row.base,
    })

    return (
        <a.mesh position={[0, -.11, grid.rowCoords[index].middle]} rotation={[- Math.PI / 2, 0, 0]}
            onPointerOver={(e) => (setHovered(true))}
            onPointerOut={(e) => setHovered(false)}>
            <planeGeometry args={[200, grid.rowWidth]} />
            <a.meshStandardMaterial color={theme.colors.col.base} opacity={.4} transparent />
        </a.mesh>
    )
} */

const Col = ({ grid, index }) => {

    return (
        <a.mesh position={[grid.colsCoords[index].middle, -.12, 0]} rotation={[- Math.PI / 2, 0, 0]} >
            <planeGeometry args={[grid.colWidth, 200]} />
            <a.meshStandardMaterial color={theme.colors.col.base} opacity={.3} transparent />
        </a.mesh>
    )
}
