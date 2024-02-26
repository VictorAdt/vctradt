import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useLayoutEffect, useState } from "react";
import { Vector3 } from "three";

const Frame = ({ color }) => {
    const camera = useThree((state) => state.camera)
    const vec = new Vector3()
    const [coordinates, setCoordinates] = useState({})
    const size = 1

    useEffect(() => {
        camera.updateProjectionMatrix()
        camera.updateMatrixWorld()
        setCoordinates({
            x: vec.set(-1, -1, 0).unproject(camera).x,
            z: vec.set(-1, 1, 0).unproject(camera).z
        })
    }, [vec.set(-1, 1, 0).unproject(camera).z])

    if (coordinates.z && coordinates.x) {
        return (
            <>
                <RigidBody
                    position={[coordinates.x + size / 2, 0.2, 0]}
                    colliders="cuboid"
                    mass={0.1}
                >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshBasicMaterial color={'blue'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[-coordinates.x - size / 2, 0.2, 0]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshBasicMaterial color={'red'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[0, 0.2, coordinates.z + size / 2]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshBasicMaterial color={'purple'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[0, 0.2, -coordinates.z - size / 2]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshBasicMaterial color={'purple'} />
                    </mesh>
                </RigidBody>
            </>);
    }
}

export default Frame;