import { usePageVisible } from "../../hooks/use-page-visible"
import { Physics } from "@react-three/rapier"
import { Html, KeyboardControls, OrbitControls } from "@react-three/drei"
import { Rover } from "../rover/rover"
import { World } from "./world/world"
import { CONTROLS_MAP, RAPIER_UPDATE_PRIORITY } from "../../constants/constants"
import { Canvas } from "./canvas"
import { Camera } from "./camera"
import { TextGroup } from "../text/text"
import Logo from "../text/logo"
import { BrickAndBalls, Wall } from "./world/wall"
import { EffectComposer, Noise, Pixelation, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'


export const Scene = () => {
    const visible = usePageVisible()

    return (
        <>
            <Canvas>
                <Camera />
                <Physics
                    updatePriority={RAPIER_UPDATE_PRIORITY}
                    paused={!visible}
                    maxStabilizationIterations={50}
                    maxVelocityFrictionIterations={50}
                    maxVelocityIterations={100}
                >
                    <KeyboardControls map={CONTROLS_MAP}>
                        <Rover />
                    </KeyboardControls>
                    <World />
                    <Logo />
                    <Wall
                        isVerticalyCenter={true}
                        colStart={{ xs: 1, sm: 1, md: 2, lg: 1, xl: 1 }}
                        colEnd={{ xs: 3, sm: 3, md: 12, lg: 12, xl: 12 }}
                        rowStart={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                        thickness={.1}
                    />
                    <Wall
                        colStart={{ xs: 0, sm: 0, md: 4, lg: 6, xl: 6 }}
                        rowStart={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
                        thickness={1}
                        colEnd={{ xs: 3, sm: 3, md: 5, lg: 9, xl: 9 }}
                    />
                    <TextGroup
                        content={['HEY', 'HELLO']}
                        height={.8}
                        lineHeightModifier={-1}
                        marginTop={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                        fontSize={{ xs: 40, sm: 60, md: 80, lg: 100, xl: 100 }}
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 1, xl: 2 }}
                        rowStart={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                    />
                    <Wall
                        isVerticalyCenter
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 1, xl: 2 }}
                        rowStart={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                        thickness={.4}
                        marginTop={{ xs: 7.5, sm: 7.5, md: 7.5, lg: 7.5, xl: 7.5 }}
                        colEnd={{ xs: 3, sm: 3, md: 5, lg: 5, xl: 4 }}
                    />
                    <TextGroup
                        lineHeightModifier={6}
                        fontStyle='normal'
                        content={[`I'm a developer and`, 'a graphic designer.', 'Based in Lausanne - ', 'Switzerland']}
                        marginTop={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                        fontSize={{ xs: 20, sm: 20, md: 20, lg: 20, xl: 20 }}
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 1, xl: 2 }}
                        rowStart={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                    />
                    <BrickAndBalls />
                </Physics>
                <EffectComposer>
                    <Noise blendFunction={BlendFunction.OVERLAY} />
                    <Scanline blendFunction={BlendFunction.OVERLAY} density={12} opacity={.1} />
                </EffectComposer>
            </Canvas>
        </>
    )
}