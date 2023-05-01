import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import { NoteType } from 'types';
import useStyles from './styles';
import { StyledBadge } from 'components/common/StyledBadge';

type PropsType = {
    isModalVisible: boolean;
    onCancel: () => void;
};

export const NoteFrom: React.FC<PropsType> = ({ isModalVisible, onCancel }) => {
    const styles = useStyles();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [noteType, setNoteType] = React.useState<NoteType | null | undefined>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setNoteType(event.target.value as NoteType);
    };

    return (
        <>
            <Dialog open={isModalVisible} onClose={onCancel}>
                <DialogTitle>
                    Створити нотатку
                    <IconButton
                        aria-label='close'
                        onClick={onCancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='title'
                        label='Заголовок нотатки'
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='content'
                        label='Опис нотатки'
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                    <Box component='div' className={styles.formItemWrapper}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label='Оберіть дату'
                                sx={{ width: '100%' }}
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box component='div' className={styles.formItemWrapper}>
                        <Select
                            id='note-type-select'
                            sx={{ width: '100%' }}
                            value={noteType!}
                            label='Тип нотатки'
                            onChange={handleChange}
                        >
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Відправити</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
