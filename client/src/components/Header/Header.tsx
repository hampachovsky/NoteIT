import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { RoutesPath } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'store/slices/user/userSlice';

export const Header: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector((state) => state.userReducer.user?.username);

    const handleSignOut = (): void => {
        navigate(RoutesPath.LOGIN, { replace: true });
        dispatch(logout());
    };

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
                    <Button color='inherit'>Archive</Button>
                    <Button onClick={() => handleSignOut()} color='inherit'>
                        Logout ({username})
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
