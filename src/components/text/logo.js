import { useGrid } from "../../hooks/use-grid";
import { Text } from "./text";

const Logo = () => {
    const { grid } = useGrid()
    if (grid) {
        const { colWidth } = grid
        const rowStart = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }

        const content = ['v c t', 'r - a', 'd t .']
        const z = grid.rowCoords[rowStart[grid.breakpoint]]
        const lineHeight = 6
        const style = 'italic'
        const marginTop = { xs: 1.8, sm: 1.7, md: 1.5, lg: 1.5, xl: 1.5 }
        const fontSize = { xs: 12, sm: 12, md: 12, lg: 12, xl: 14 }
        const colStart = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }
        return (
            <group position={[colWidth / 2 - fontSize[grid.breakpoint] / 10, 0, 0]}>
                {content.map((element, index) =>
                    <Text
                        key={index}
                        height={.5}
                        fontStyle={style}
                        grid={grid}
                        content={element}
                        fontSize={fontSize}
                        colStart={colStart}
                        positionZ={(z.start) + (fontSize[grid.breakpoint] / (19 - lineHeight)) * index + marginTop[grid.breakpoint]}
                    />)}
            </group>

        )
    }


}

export default Logo;