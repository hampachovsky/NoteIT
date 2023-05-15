import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import useStyles from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInPayload } from 'types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from 'components/common/ErrorMessage';
import { RoutesPath } from 'constants/routes';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchSignIn } from 'store/slices/user/thunk';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useClearUserError } from 'hooks/useClearUserError';
import { selectUserIsLoading } from 'store/slices/user/selectors';

const validationSchema = yup
    .object()
    .shape({
        username: yup.string().required(`Будь ласка, введіть ім'я користувача`),
        password: yup.string().required('Будь ласка, введіть пароль'),
        rememberMe: yup.boolean(),
    })
    .required();

const SignIn: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const { handleClear } = useClearUserError();
    const isLoading = useAppSelector(selectUserIsLoading);
    const error = useAppSelector((state) => state.userReducer.error);

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
    });

    const onSubmit: SubmitHandler<SignInPayload> = async (data) => {
        await dispatch(fetchSignIn(data));
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
                        Вхід
                    </Typography>
                    <Box component='div' sx={{ mt: 1 }}>
                        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
                            {error && <ErrorMessage error={error} />}
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
                                        label="Ім'я користувача"
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
                                        label='Пароль'
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
                                        label="Запам'ятати мене"
                                        {...field}
                                    />
                                )}
                            />

                            <LoadingButton
                                disabled={!isDirty || !isValid || isSubmitting}
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoading}
                            >
                                Увійти
                            </LoadingButton>
                        </form>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Link
                                onClick={handleClear}
                                className={styles.linkStyle}
                                to={RoutesPath.REGISTER}
                            >
                                Немає аккаунту? Створіть
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;
