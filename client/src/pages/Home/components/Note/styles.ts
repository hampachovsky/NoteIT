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
        card: {
            minWidth: 360,
            maxWidth: 360,
            marginTop: 0,
            marginBottom: 10,
        },
    }),
);

export default useStyles;
