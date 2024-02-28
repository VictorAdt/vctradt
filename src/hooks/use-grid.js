import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { theme } from "../components/theme/theme";
import { useMediaQuery } from "./use-media-query";

export const useGrid = () => {
    const { breakpoint } = useMediaQuery()
    const [grid, setGrid] = useState()
    const camera = useThree((state) => state.camera)
    const vec3 = new Vector3()

    const handleResize = () => {
        const gutterSize = theme.grid.gutterSize[breakpoint]
        const colNumber = theme.grid.col[breakpoint]
        const rowNumber = theme.grid.row[breakpoint]
        camera.updateProjectionMatrix()
        camera.updateMatrixWorld()
        const xStart = vec3.set(-1, 1, 0).unproject(camera).x
        const zStart = vec3.set(-1, 1, 0).unproject(camera).z
        const zSize = vec3.set(-1, 1, 0).unproject(camera).z * -2
        const xSize = vec3.set(-1, 1, 0).unproject(camera).x * -2
        const xSizeMinusGutters = xSize - (gutterSize * colNumber + gutterSize)
        const zSizeMinusGutters = zSize - (gutterSize * rowNumber + gutterSize)
        const colWidth = xSizeMinusGutters / colNumber
        const rowWidth = zSizeMinusGutters / rowNumber

        const colsCoords = Array.from({ length: colNumber }).map((_, i) => {
            const start = xStart + (i + 1) * gutterSize + (colWidth * i)
            const end = xStart + (i + 1) * gutterSize + (colWidth * i) + colWidth
            return ({
                start: start,
                end: end,
                middle: start + colWidth / 2
            })
        })
        const rowCoords = Array.from({ length: rowNumber }).map((_, i) => {
            const start = zStart + (i + 1) * gutterSize + (rowWidth * i)
            const end = zStart + (i + 1) * gutterSize + (rowWidth * i) + rowWidth
            return ({
                start: start,
                end: end,
                middle: start + rowWidth / 2
            })
        })
        if (colsCoords.length > 0 &&
            colWidth && gutterSize &&
            colNumber && breakpoint && rowCoords.length > 0 &&
            rowWidth && rowNumber) {
            setGrid({
                colWidth,
                colsCoords,
                gutterSize,
                colNumber,
                rowCoords,
                rowNumber,
                rowWidth,
                breakpoint,
                viewport: {
                    x: xSize,
                    z: zSize
                }
            })
        }
    }

    const z = vec3.set(-1, 1, 0).unproject(camera).z

    useEffect(() => {
        handleResize()
    }, [z])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { grid }
}