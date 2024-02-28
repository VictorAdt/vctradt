import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const Camera = () => {
    const camera = useThree((state) => state.camera)
    useEffect(() => {
        camera.lookAt(0, 0, 0)
    }, [camera])
    return <OrthographicCamera makeDefault zoom={20} position={[0, 30, 0]} />;
}
