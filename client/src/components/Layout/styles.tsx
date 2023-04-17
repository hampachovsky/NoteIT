import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
            height: 'auto !important',
            minHeight: '100%',
        },
    });
});

export default useStyles;
