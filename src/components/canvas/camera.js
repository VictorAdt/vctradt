import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Vector3 } from "three";

export const Camera = () => {
    const camera = useThree((state) => state.camera)
    useEffect(() => {
        camera.lookAt(0, 0, 0)
    }, [camera])
    return <OrthographicCamera makeDefault zoom={20} position={[0, 30, 0]} />;
}
