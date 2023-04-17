import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RoutesPath } from 'constants/routes';
import useStyles from 'pages/SignIn/styles';
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignUpPayload } from 'types';
import { ErrorMessage } from 'components/common/ErrorMessage';

const validationSchema = yup
    .object()
    .shape({
        username: yup
            .string()
            .min(3, 'Username must be greater than 3 characters')
            .max(128, 'Username must be less than 128 characters')
            .required('Please enter a username'),
        password: yup
            .string()
            .min(4, 'Password must be greater than 4 characters')
            .max(64, 'Password must be less than 64 characters')
            .required('Please enter a password'),
        confirmPassword: yup
            .string()
            .required('Please confirm a password')
            .oneOf([yup.ref('password'), null as any], 'Passwords must match'),
    })
    .required();

export default function SignUp() {
    const styles = useStyles();
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<SignUpPayload>({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<SignUpPayload> = async (data) => {
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
                        Sign up
                    </Typography>
                    <Box component='div' sx={{ mt: 3 }}>
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
                            {errors.confirmPassword?.message && (
                                <ErrorMessage error={errors.confirmPassword.message} />
                            )}
                            <Controller
                                name='confirmPassword'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        label='Confirm Password'
                                        type='confirmPassword'
                                        id='confirmPassword'
                                        autoComplete='current-password'
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Link className={styles.linkStyle} to={RoutesPath.LOGIN}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
