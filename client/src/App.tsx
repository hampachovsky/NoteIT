import { CssBaseline, ThemeProvider } from '@mui/material';
import { PrivateLayout } from 'components/Layout/PrivateLayout';
import { PublicLayout } from 'components/Layout/PublicLayout';
import { Home } from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { theme } from './utils/themeCreator';
import { RoutesPath } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchUserData } from 'store/slices/user/thunk';
import { useEffect } from 'react';
import { selectUserIsLoading } from 'store/slices/user/selectors';
import { Preloader } from 'components/common/Preloader';

function App() {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.userReducer.isAuth);
    const isLoading = useAppSelector(selectUserIsLoading);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                {isLoading ? (
                    <Preloader />
                ) : (
                    <BrowserRouter>
                        {isAuth ? (
                            <PrivateLayout>
                                <Routes>
                                    <Route path={RoutesPath.HOME} element={<Home />}></Route>
                                    <Route path='*' element={<Navigate to='/' />} />
                                </Routes>
                            </PrivateLayout>
                        ) : (
                            <PublicLayout>
                                <Routes>
                                    <Route path={RoutesPath.LOGIN} element={<SignIn />}></Route>
                                    <Route path={RoutesPath.REGISTER} element={<SignUp />}></Route>
                                    <Route path='*' element={<Navigate to={RoutesPath.LOGIN} />} />
                                </Routes>
                            </PublicLayout>
                        )}
                    </BrowserRouter>
                )}
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
