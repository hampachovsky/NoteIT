import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Note } from './components/Note';

export const Home = () => {
    return (
        <>
            <Typography align='center' variant='h3'>
                Notes:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    marginTop: 10,
                }}
            >
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
            </Box>
        </>
    );
};
