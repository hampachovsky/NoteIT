import { createTheme, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        yellow: string;
        tomatoRed: string;
        white: string;
        blue: string;
        black: string;
    }
    interface PaletteOptions {
        yellow: string;
        tomatoRed: string;
        white: string;
        blue: string;
        black: string;
    }
}

const colors = {
    blue: '#90caf9',
    black: '#1A1A1A',
    darkBlue: '#22223B',
    grey: '#282828',
    white: '#FFFFFF',
    lightGrey: '#373737',
    buttonLightGrey: '#3E3E3E',
    red: '#ff5e5b',
    yellow: '#FEE24D',
};

export const themeOptions: ThemeOptions = {
    palette: {
        blue: colors.blue,
        yellow: colors.yellow,
        tomatoRed: colors.red,
        white: colors.white,
        black: colors.darkBlue,
        mode: 'dark',
    },
};

export const theme = createTheme(themeOptions);
