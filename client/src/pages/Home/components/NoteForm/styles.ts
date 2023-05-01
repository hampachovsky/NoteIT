import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formItemWrapper: {
            marginTop: '25px',
        },
    }),
);

export default useStyles;
