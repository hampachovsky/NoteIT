import { Footer } from 'components/Footer';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocationStateType } from 'types';
import useStyles from './styles';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

type Props = {
    children: JSX.Element;
};

export const PublicLayout: React.FC<Props> = ({ children }) => {
    const styles = useStyles();
    const isAuth = false;
    const location = useLocation();
    const locationState = location.state as LocationStateType;
    let redirectPath: string =
        locationState === null ? '/' : locationState.from.pathname + locationState.from.search;
    if (locationState && locationState.from.pathname === location.pathname) {
        redirectPath = '/';
    }

    if (isAuth) return <Navigate to={redirectPath} state={{ from: location }} replace />;
    return (
        <Box className={styles.container}>
            <Container component='main' maxWidth='lg'>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};
