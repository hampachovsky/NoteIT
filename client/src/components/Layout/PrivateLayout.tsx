import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from 'components/Header/Header';
import * as React from 'react';
import useStyles from './styles';

interface Props {
    children: React.ReactNode;
}

export const PrivateLayout: React.FC<Props> = ({ children }) => {
    const styles = useStyles();
    return (
        <>
            <Box className={styles.container}>
                <Header />
                <Container component='main' maxWidth='lg'>
                    {children}
                </Container>
            </Box>
        </>
    );
};
