import { CssBaseline, ThemeProvider } from '@mui/material';
import { PrivateLayout } from 'components/Layout/PrivateLayout';
import { PublicLayout } from 'components/Layout/PublicLayout';
import { RoutesPath } from 'constants/routes';
import { Home } from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { theme } from './utils/themeCreator';

function App() {
    const isAuth = true;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
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
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
