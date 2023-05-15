import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ErrorMessage } from 'components/common/ErrorMessage';
import { StyledBadge } from 'components/common/StyledBadge';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hooks';
import { INote, NotePayloadType, NoteType } from 'types';
import * as yup from 'yup';
import useStyles from './styles';
import { selectNotesIsLoading } from 'store/slices/note/selectors';

const validationSchema = yup
    .object()
    .shape({
        title: yup
            .string()
            .min(3, `Заголовок повинен бути більше 3 символів`)
            .max(128, `Заголовок повинен бути менше 128 символів`)
            .required(`Будь ласка, введіть заголовок`),
        content: yup
            .string()
            .min(4, 'Опис повинен містити більше 4 символів')
            .max(64, 'Опис повинен містити менше 64 символів')
            .required('Будь ласка, введіть опис'),
        noteType: yup.string().oneOf([NoteType.minor, NoteType.warning, NoteType.important]),
        noteDate: yup.date().required('Оберіть дату!').typeError('Введіть дату!'),
    })
    .required();

type PropsType = {
    isModalVisible: boolean;
    onCancel: () => void;
    onSubmit: (data: NotePayloadType) => void;
    isEditing?: boolean;
    note?: INote | null;
};

export const NoteFrom: React.FC<PropsType> = ({
    isModalVisible,
    onCancel,
    onSubmit,
    isEditing = false,
    note,
}) => {
    const styles = useStyles();
    const isLoading = useAppSelector(selectNotesIsLoading);
    const error = useAppSelector((state) => state.noteReducer.error);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    } = useForm<NotePayloadType>({
        defaultValues: {
            title: '',
            content: '',
            noteDate: dayjs().format('YYYY.MM.DD'),
            noteType: NoteType.minor,
        },
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        reset({
            title: note?.title,
            content: note?.content,
            noteType: note?.noteType,
            noteDate: dayjs(note?.noteDate) as unknown as string,
        });
    }, [note, reset]);

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);

    const onClickSubmit: SubmitHandler<NotePayloadType> = ({
        title,
        content,
        noteDate,
        noteType,
    }) => {
        const payload = { title, content, noteDate: dayjs(noteDate).format(), noteType };
        onSubmit(payload);
    };

    return (
        <>
            <Dialog open={isModalVisible} onClose={onCancel}>
                <DialogTitle>
                    {isEditing ? 'Редагувати нотатку' : 'Створити нотатку'}
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
                <form action='submit' onSubmit={handleSubmit(onClickSubmit)}>
                    <DialogContent>
                        {error && <ErrorMessage error={error} />}
                        <Box component='div' sx={{ marginTop: '2px' }}>
                            {errors.title?.message && <ErrorMessage error={errors.title.message} />}
                        </Box>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    id='title'
                                    label='Заголовок нотатки'
                                    type='text'
                                    fullWidth
                                    variant='standard'
                                    {...field}
                                />
                            )}
                        />
                        <Box component='div' sx={{ marginTop: 2 }}>
                            {errors.content?.message && (
                                <ErrorMessage error={errors.content.message} />
                            )}
                        </Box>

                        <Controller
                            name='content'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    id='content'
                                    label='Опис нотатки'
                                    type='text'
                                    fullWidth
                                    variant='standard'
                                    {...field}
                                />
                            )}
                        />
                        <Box component='div' className={styles.formItemWrapper}>
                            {errors.noteDate?.message && (
                                <ErrorMessage error={errors.noteDate.message} />
                            )}
                            <Controller
                                name='noteDate'
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label='Оберіть дату'
                                            sx={{ width: '100%' }}
                                            format={'YYYY.MM.DD'}
                                            {...field}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Box>
                        <Box component='div' className={styles.formItemWrapper}>
                            {errors.noteType?.message && (
                                <ErrorMessage error={errors.noteType.message} />
                            )}
                            <Controller
                                name='noteType'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        id='note-type-select'
                                        sx={{ width: '100%' }}
                                        label='Тип нотатки'
                                        {...field}
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
                                )}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton
                            disabled={!isDirty || !isValid || isSubmitting}
                            loading={isLoading}
                            type='submit'
                            fullWidth
                            variant='contained'
                            onClick={onCancel}
                        >
                            Відправити
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
