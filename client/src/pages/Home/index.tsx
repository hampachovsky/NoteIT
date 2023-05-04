import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAllNotes } from 'store/slices/note/selectors';
import { fetchCreateNote, fetchDeleteNote, fetchUpdateNote } from 'store/slices/note/thunk';
import { INote, NotePayloadType } from 'types';
import { Note } from './components/Note';
import { NoteFrom } from './components/NoteForm';
import useStyles from './styles';
import { NoteFilter } from './components/NoteFilter';

export const Home: React.FC = () => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const [isEditable, setEditable] = useState(false);
    const dispatch = useAppDispatch();
    const styles = useStyles();
    const notes = useAppSelector(selectAllNotes);

    const onAddTaskClick = () => {
        setModalVisibility(true);
        setEditable(false);
        setSelectedNote(null);
    };

    const onCancel = useCallback(() => {
        setModalVisibility(false);
    }, []);

    const onEditClick = useCallback((note: INote) => {
        setSelectedNote(note);
        setEditable(true);
        setModalVisibility(true);
    }, []);

    const onEditSubmit = useCallback(
        (data: NotePayloadType) => {
            const payload = { ...selectedNote!, ...data };
            dispatch(fetchUpdateNote(payload));

            setEditable(false);
            setModalVisibility(false);
        },
        [selectedNote, dispatch],
    );

    const onDeleteSubmit = useCallback(
        (noteId: string) => {
            dispatch(fetchDeleteNote(noteId));
        },
        [dispatch],
    );

    const onAddNoteSubmit = useCallback(
        (data: NotePayloadType) => {
            dispatch(fetchCreateNote(data));
        },
        [dispatch],
    );

    return (
        <Box component='div'>
            <Typography align='center' variant='h3'>
                Нотатки:
            </Typography>
            <Box>
                <NoteFilter />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                }}
            >
                <Button
                    className={styles.addButton}
                    variant='contained'
                    endIcon={<AddIcon />}
                    onClick={() => onAddTaskClick()}
                >
                    Додати нотатку
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    marginTop: 10,
                }}
            >
                {notes.map((note) => (
                    <Note
                        key={note._id}
                        note={note}
                        onDeleteSubmit={onDeleteSubmit}
                        onEdit={onEditClick}
                    />
                ))}
            </Box>

            {isEditable && selectedNote ? (
                <NoteFrom
                    isEditing={isEditable}
                    isModalVisible={isModalVisible}
                    onSubmit={onEditSubmit}
                    onCancel={onCancel}
                    note={selectedNote}
                />
            ) : (
                <NoteFrom
                    isModalVisible={isModalVisible}
                    onSubmit={onAddNoteSubmit}
                    onCancel={onCancel}
                />
            )}
        </Box>
    );
};
