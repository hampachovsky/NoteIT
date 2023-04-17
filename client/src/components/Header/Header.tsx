import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { RoutesPath } from 'constants/routes';

export const Header: React.FC = () => {
    const styles = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }} className={styles.header}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={RoutesPath.HOME} className={styles.linkStyle}>
                            NoteIt
                        </Link>
                    </Typography>
                    <Button color='inherit'>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
