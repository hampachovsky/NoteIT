import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: { paddingBottom: '30px' },
        linkStyle: {
            textDecoration: 'inherit',
            color: 'inherit',
        },
    }),
);

export default useStyles;
