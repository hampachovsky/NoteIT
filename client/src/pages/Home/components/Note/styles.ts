import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        minor: {
            backgroundColor: theme.palette.blue,
        },
        warning: {
            backgroundColor: theme.palette.yellow,
        },
        important: {
            backgroundColor: theme.palette.tomatoRed,
        },
        cardHeaderText: {
            color: theme.palette.black,
        },
    }),
);

export default useStyles;
