import React from 'react';
import Alert from '@mui/material/Alert';

type PropsType = {
    error: string | undefined;
};

export const ErrorMessage: React.FC<PropsType> = ({ error }) => {
    return (
        <Alert variant='outlined' severity='error'>
            {error}
        </Alert>
    );
};
