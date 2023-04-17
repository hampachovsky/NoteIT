import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RoutesPath } from 'constants/routes';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import useStyles from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInPayload } from 'types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from 'components/common/ErrorMessage';

const validationSchema = yup
    .object()
    .shape({
        username: yup.string().required('Please enter a username'),
        password: yup.string().required('Please enter a password'),
        rememberMe: yup.boolean(),
    })
    .required();

export default function SignIn() {
    const styles = useStyles();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<SignInPayload>({
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<SignInPayload> = async (data) => {
        console.log(data);
    };

    return (
        <>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='div' sx={{ mt: 1 }}>
                        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
                            {errors.username?.message && (
                                <ErrorMessage error={errors.username.message} />
                            )}
                            <Controller
                                name='username'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='username'
                                        label='Username'
                                        autoComplete='username'
                                        autoFocus
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password?.message && (
                                <ErrorMessage error={errors.password.message} />
                            )}
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        label='Password'
                                        type='password'
                                        id='password'
                                        autoComplete='current-password'
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name='rememberMe'
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox value='remember' color='primary' />}
                                        checked={field.value}
                                        label='Remember me'
                                        {...field}
                                    />
                                )}
                            />

                            <Button
                                disabled={!isDirty || !isValid || isSubmitting}
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Link className={styles.linkStyle} to={RoutesPath.REGISTER}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
