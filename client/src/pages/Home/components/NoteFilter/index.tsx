import React, { useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { StyledBadge } from 'components/common/StyledBadge';
import { NoteType } from 'types';
import useStyles from './style';

export const NoteFilter = () => {
    const styles = useStyles();
    const [searchString, setSearchString] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleDateChange = (e: SelectChangeEvent) => {
        setFilterDate(e.target.value);
    };

    const handleFilterType = (e: SelectChangeEvent) => {
        setFilterType(e.target.value);
    };

    return (
        <Box component='div' className={styles.filterWrapper}>
            <TextField sx={{ width: '30%' }} onChange={handleSearchSubmit} value={searchString} />
            <Select sx={{ width: '10%' }} onChange={handleDateChange} value={filterDate}>
                <MenuItem value=''>
                    <em>Всі</em>
                </MenuItem>
                <MenuItem value={10}>Новіші</MenuItem>
                <MenuItem value={20}>Старіші</MenuItem>
            </Select>
            <Select
                sx={{ width: '20%' }}
                value={filterType}
                onChange={handleFilterType}
                label='Тип нотатки'
            >
                <MenuItem value=''>
                    <em>Всі</em>
                </MenuItem>
                <MenuItem value={NoteType.minor}>
                    <StyledBadge badgeContent='' color='primary'>
                        Звичайна
                    </StyledBadge>
                </MenuItem>
                <MenuItem value={NoteType.warning}>
                    <StyledBadge badgeContent='' color='warning'>
                        Важлива
                    </StyledBadge>
                </MenuItem>
                <MenuItem value={NoteType.important}>
                    <StyledBadge badgeContent='' color='error'>
                        Срочна
                    </StyledBadge>
                </MenuItem>
            </Select>
        </Box>
    );
};
