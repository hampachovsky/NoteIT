import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';

const rootReducer = combineReducers({
    userReducer,
});

const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
