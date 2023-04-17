import React from 'react';
import { theme } from './utils/themeCreator';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PrivateLayout } from 'components/Layout/PrivateLayout';
import { PublicLayout } from 'components/Layout/PublicLayout';
import SignIn from 'pages/SignIn';
import { RoutesPath } from 'constants/routes';
import SignUp from 'pages/SignUp';

function App() {
    const isAuth = false;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    {isAuth ? (
                        <PrivateLayout>
                            <Routes>
                                <Route path={RoutesPath.HOME} element={<div>Home</div>}></Route>
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
