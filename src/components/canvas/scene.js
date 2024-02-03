import { usePageVisible } from "../../hooks/use-page-visible"
import { Physics } from "@react-three/rapier"
import { Html, KeyboardControls, OrbitControls } from "@react-three/drei"
import { Rover } from "../rover/rover"
import { World } from "./world/world"
import { CONTROLS_MAP, LEVA_KEY, RAPIER_UPDATE_PRIORITY } from "../../constants/constants"
import { Canvas } from "./canvas"
import { Camera } from "./camera"
import { Text, TextGroup } from "../text/text"
import Frame from "./frame"
import { theme } from "../theme/theme"
import Logo from "../text/logo"
import { BrickAndBalls, Wall } from "./world/wall"

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
                        thickness={.4}
                    />
                    <Wall
                        isVerticalyCenter
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }}
                        rowStart={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                        thickness={.4}
                        colEnd={{ xs: 3, sm: 3, md: 5, lg: 4, xl: 4 }}
                    />
                    <Wall
                        colStart={{ xs: 0, sm: 0, md: 4, lg: 6, xl: 6 }}
                        rowStart={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
                        thickness={1}
                        colEnd={{ xs: 3, sm: 3, md: 5, lg: 9, xl: 9 }}
                    />
                    <TextGroup
                        content={['HEY', 'HELLO']}
                        lineHeightModifier={-1}
                        marginTop={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                        fontSize={{ xs: 40, sm: 60, md: 80, lg: 100, xl: 100 }}
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }}
                        rowStart={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                    />
                    <TextGroup
                        lineHeightModifier={4}
                        fontStyle='normal'
                        content={[`I'm a developer and`, 'a graphic designer.', 'Based in Lausanne - ', 'Switzerland']}
                        marginTop={{ xs: 0, sm: 0, md: 0, lg: -3, xl: -3 }}
                        fontSize={{ xs: 20, sm: 20, md: 20, lg: 20, xl: 20 }}
                        colStart={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }}
                        rowStart={{ xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }}
                    />

                    <BrickAndBalls />
                </Physics>
            </Canvas>
        </>
    )
}