import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Note } from './components/Note';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import useStyles from './styles';
import { NoteFrom } from './components/NoteForm';
import { useAppSelector } from 'store/hooks';
import { selectAllNotes } from 'store/slices/note/selectors';

export const Home: React.FC = () => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const styles = useStyles();
    const notes = useAppSelector(selectAllNotes);

    const onCancel = useCallback(() => {
        setModalVisibility(false);
    }, []);

    return (
        <Box component='div'>
            <Typography align='center' variant='h3'>
                Нотатки:
            </Typography>
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
                    onClick={() => setModalVisibility(true)}
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
                    <Note key={note._id} note={note} />
                ))}
            </Box>
            <NoteFrom isModalVisible={isModalVisible} onCancel={onCancel} />
        </Box>
    );
};
