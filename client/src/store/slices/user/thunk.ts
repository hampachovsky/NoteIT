import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './types';
import { RequestErrorType, SignInPayload, SignUpPayload } from 'types';
import { authAPI } from 'api/authAPI';
import { fetchNotes } from '../note/thunk';

export const fetchSignIn = createAsyncThunk(
    ActionType.FETCH_SIGN_IN,
    async (payload: SignInPayload, thunkAPI) => {
        try {
            const response = await authAPI.login(payload);
            window.localStorage.setItem('token', response.token);
            return response.user;
        } catch (error) {
            const err = error as RequestErrorType;
            return thunkAPI.rejectWithValue(err.response?.data.error);
        }
    },
);

export const fetchSignUp = createAsyncThunk(
    ActionType.FETCH_SIGN_UP,
    async (payload: SignUpPayload, thunkAPI) => {
        try {
            const response = await authAPI.register(payload);
            return response;
        } catch (error) {
            const err = error as RequestErrorType;
            return thunkAPI.rejectWithValue(err.response?.data.error);
        }
    },
);

export const fetchUserData = createAsyncThunk(ActionType.FETCH_USER_DATA, async (_, thunkAPI) => {
    const response = await authAPI.authMe();
    thunkAPI.dispatch(fetchNotes());
    return response;
});
