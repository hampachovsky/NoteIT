import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            fontSize: '18px',
        },
    }),
);

export default useStyles;
