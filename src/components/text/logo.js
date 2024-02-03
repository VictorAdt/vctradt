import { TextGroup } from "./text"

const Logo = () => {
    return <TextGroup
        lineHeightModifier={6}
        content={['v c t', 'r - a', 'd t .']}
        marginTop={{ xs: 1.8, sm: 1.7, md: 1.5, lg: 1.5, xl: 1.5 }}
        fontSize={{ xs: 14, sm: 14, md: 14, lg: 16, xl: 16 }}
        colStart={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
        rowStart={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
    />;
}

export default Logo;