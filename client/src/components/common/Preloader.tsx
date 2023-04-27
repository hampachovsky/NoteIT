import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Preloader: React.FC = () => {
    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
        >
            <CircularProgress />
        </Box>
    );
};
