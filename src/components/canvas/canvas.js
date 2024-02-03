import { Canvas as R3FCanvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Spinner } from './spinner'


export const Canvas = ({ children, rest }) => {
    return (
        <Suspense fallback={<Spinner />}>
            <R3FCanvas id="canvas" {...rest}>
                {children}
            </R3FCanvas>
        </Suspense>
    );
}


