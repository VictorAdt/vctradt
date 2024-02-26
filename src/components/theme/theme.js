export const theme = {
    colors: {
        background: '#141414',
        row: {
            base: '#201D1D',
            hover: '#141212',
        },
        col: {
            base: '#201D1D',
            hover: '#141212',
        },
        text: 'white',
        elements: 'white'
    },
    breakpoints: {
        xs: 350, // 0 - 350 = xs
        sm: 568, // 351 - 568 = sm
        md: 844, // 569 - 844 = md
        lg: 1280, // 745 - 1280 = lg
        xl: 1540, // 1541 - infinity = xl
    },
    grid: {
        col: {
            xs: 4,
            sm: 4,
            md: 12,
            lg: 12,
            xl: 12,
        },
        gutterSize: {
            xs: .5,
            sm: .5,
            md: .5,
            lg: 1,
            xl: 1.5,
        },
        row: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
            xl: 6,
        }
    }
}