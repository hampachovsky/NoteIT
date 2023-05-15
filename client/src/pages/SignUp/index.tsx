import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useStyles from 'pages/SignIn/styles';
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingStatus, SignUpPayload } from 'types';
import { ErrorMessage } from 'components/common/ErrorMessage';
import { RoutesPath } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUserIsLoading, selectUserStatusSuccess } from 'store/slices/user/selectors';
import { fetchSignUp } from 'store/slices/user/thunk';
import { setUserStatus } from 'store/slices/user/userSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { useClearUserError } from 'hooks/useClearUserError';

const validationSchema = yup
    .object()
    .shape({
        username: yup
            .string()
            .min(3, `Ім'я користувача повинно містити більше 3 символів`)
            .max(128, `Ім'я користувача повинно містити менше 128 символів`)
            .required(`Будь ласка, введіть ім'я користувача`),
        password: yup
            .string()
            .min(4, 'Пароль повинен містити більше 4 символів')
            .max(64, 'Пароль повинен містити менше 64 символів')
            .required('Будь ласка, введіть пароль'),
        confirmPassword: yup
            .string()
            .required('Будь ласка, підтвердіть пароль')
            .oneOf([yup.ref('password'), null as any], 'Паролі повинні співпадати'),
    })
    .required();

const SignUp: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(selectUserIsLoading);
    const isSuccess = useAppSelector(selectUserStatusSuccess);
    const error = useAppSelector((state) => state.userReducer.error);
    const { handleClear } = useClearUserError();

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
        await dispatch(fetchSignUp(data));
    };

    React.useEffect(() => {
        if (isSuccess) {
            navigate(RoutesPath.LOGIN, { replace: true });
            dispatch(setUserStatus(LoadingStatus.IDLE));
        }
    }, [dispatch, isSuccess, navigate]);

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
                        Реєстрація
                    </Typography>
                    <Box component='div' sx={{ mt: 3 }}>
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
                                        label='Підтвердіть пароль'
                                        type='confirmPassword'
                                        id='confirmPassword'
                                        autoComplete='current-password'
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
                                Створити
                            </LoadingButton>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Link
                                        onClick={handleClear}
                                        className={styles.linkStyle}
                                        to={RoutesPath.LOGIN}
                                    >
                                        Уже є аккаунт? Увійдіть.
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignUp;
