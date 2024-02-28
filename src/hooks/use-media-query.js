import { useEffect, useState } from "react";
import { theme } from "../components/theme/theme";
import { isInRange } from "../utils/misc";

export const useMediaQuery = () => {
    const [viewport, setViewport] = useState({})

    const handleResize = () => {
        const { innerWidth, innerHeight } = window
        const breakpoint = getBreakpoint(innerWidth)
        console.log(breakpoint);
        setViewport({ width: innerWidth, height: innerHeight, breakpoint })
    }
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return viewport;
}

const getBreakpoint = (width) => {
    const { breakpoints } = theme
    switch (true) {
        case isInRange(0, breakpoints.xs, width):
            return 'xs'
        case isInRange(breakpoints.xs, breakpoints.sm, width):
            return 'sm'
        case isInRange(breakpoints.sm, breakpoints.md, width):
            return 'md'
        case isInRange(breakpoints.md, breakpoints.lg, width):
            return 'lg'
        case isInRange(breakpoints.lg, Infinity, width):
            return 'xl'
        default:
            break
    }
}

