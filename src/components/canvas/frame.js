import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useLayoutEffect, useState } from "react";
import { Vector3 } from "three";

const Frame = ({ color }) => {
    const camera = useThree((state) => state.camera)
    const vec = new Vector3()
    const [xz, setXz] = useState({})
    const size = 1

    useEffect(() => {
        camera.updateProjectionMatrix()
        camera.updateMatrixWorld()
        setXz({
            x: vec.set(-1, -1, 0).unproject(camera).x,
            z: vec.set(-1, 1, 0).unproject(camera).z
        })
    }, [vec.set(-1, 1, 0).unproject(camera).z])

    if (xz.z && xz.x) {
        return (
            <>
                <RigidBody
                    position={[xz.x + size / 2, 0.2, 0]}
                    colliders="cuboid"
                    mass={0.1}
                >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshStandardMaterial color={'blue'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[-xz.x - size / 2, 0.2, 0]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshStandardMaterial color={'red'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[0, 0.2, xz.z + size / 2]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshStandardMaterial color={'purple'} />
                    </mesh>
                </RigidBody>
                <RigidBody
                    position={[0, 0.2, -xz.z - size / 2]}
                    colliders="cuboid"
                    mass={0.1} >
                    <mesh>
                        <boxGeometry args={[size, size, size]} />
                        <meshStandardMaterial color={'purple'} />
                    </mesh>
                </RigidBody>
            </>);
    }
}

export default Frame;