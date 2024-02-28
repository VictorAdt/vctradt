import { Canvas as R3FCanvas } from '@react-three/fiber'
import { Suspense } from 'react'

export const Canvas = ({ children, rest }) => {
    return (
        <Suspense fallback={null}>
            <R3FCanvas id="canvas" {...rest} style={{ zIndex: 0 }}>
                {children}
            </R3FCanvas>
        </Suspense>
    );
}


