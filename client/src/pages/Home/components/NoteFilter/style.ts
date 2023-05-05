import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterWrapper: {
            marginTop: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchButton: {
            marginLeft: '10px',
            fontSize: '17px',
            width: '70px',
            height: '48px',
        },
    }),
);

export default useStyles;
