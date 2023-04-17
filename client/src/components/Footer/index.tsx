import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = (props: any) => {
    return (
        <Typography
            sx={{ marginTop: '50px' }}
            variant='body2'
            color='text.secondary'
            align='center'
            {...props}
        >
            {'Copyright © '}
            <Link color='inherit' to='https://github.com/hampachovsky'>
                Oleksandr Novak
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};
