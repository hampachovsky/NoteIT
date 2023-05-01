import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import useStyles from './styles';

export const Note: React.FC = () => {
    let type = 'minor';
    /* let type = 'warning'; */
    /*  let type = 'important'; */
    const styles = useStyles();
    return (
        <Card sx={{ minWidth: 280, maxWidth: 360, marginTop: 0, marginBottom: 10 }}>
            <CardHeader
                className={
                    type === 'minor'
                        ? styles.minor
                        : type === 'warning'
                        ? styles.warning
                        : styles.important
                }
                action={
                    <IconButton aria-label='settings'>
                        <EditIcon className={styles.cardHeaderText} />
                    </IconButton>
                }
                title={
                    <Typography className={styles.cardHeaderText} variant='h4'>
                        WAKE UP
                    </Typography>
                }
                subheader={
                    <Typography className={styles.cardHeaderText}>September 14, 2016</Typography>
                }
            />
            <CardContent>
                <Typography variant='h6' component='div'>
                    benevolent Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolores
                    ab soluta non dolorem commodi tempore voluptas accusamus rem, totam velit ipsa
                    assumenda culpa suscipit dolor aut esse fugiat. Facilis.
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton aria-label='settings'>
                    <ArchiveIcon />
                </IconButton>
                <IconButton aria-label='settings'>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
