import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './styles';
import { INote } from 'types';
import dayjs from 'dayjs';

type Props = {
    note: INote;
    onDeleteSubmit: (id: string) => void;
    onEdit: (note: INote) => void;
};

export const Note: React.FC<Props> = ({ note, onDeleteSubmit, onEdit }) => {
    const styles = useStyles();

    const onDelete = () => {
        onDeleteSubmit(note._id);
    };

    return (
        <Card className={styles.card}>
            <CardHeader
                className={
                    note.noteType === 'minor'
                        ? styles.minor
                        : note.noteType === 'warning'
                        ? styles.warning
                        : styles.important
                }
                action={
                    <IconButton aria-label='settings' onClick={() => onEdit(note)}>
                        <EditIcon className={styles.cardHeaderText} />
                    </IconButton>
                }
                title={
                    <Typography className={styles.cardHeaderText} variant='h4'>
                        {note.title}
                    </Typography>
                }
                subheader={
                    <Typography className={styles.cardHeaderText}>
                        {dayjs(note.noteDate).format('YYYY MMMM DD')}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant='h6' component='div'>
                    {note.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton aria-label='settings' onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
