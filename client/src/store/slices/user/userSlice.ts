import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSignIn, fetchSignUp, fetchUserData } from './thunk';
import { IUser, LoadingStatus, UserState } from 'types';

const initialState: UserState = {
    user: null,
    status: LoadingStatus.IDLE,
    error: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = LoadingStatus.IDLE;
            state.user = null;
            state.error = null;
            state.isAuth = false;
            window.localStorage.removeItem('token');
        },
        setUserStatus: (state, action: PayloadAction<LoadingStatus>) => {
            state.status = action.payload;
        },
        clearUserError: (state) => {
            state.error = null;
        },
        setSuccess: (state) => {
            state.status = LoadingStatus.SUCCESS;
            state.error = null;
        },
        setSuccessAuth: (state, { payload }: PayloadAction<IUser>) => {
            state.user = payload;
            state.isAuth = true;
            state.error = null;
            state.status = LoadingStatus.SUCCESS;
        },
        setLoadingStatus: (state) => {
            state.status = LoadingStatus.LOADING;
            state.error = null;
        },
        setErrorStatus: (state, error: unknown) => {
            state.status = LoadingStatus.ERORR;
            if (typeof error === 'string') {
                state.error = error;
            } else {
                state.error = 'unknown error';
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSignIn.fulfilled, (state, payload) => {
            userSlice.caseReducers.setSuccessAuth(state, payload);
        });
        builder.addCase(fetchSignIn.pending, (state) => {
            userSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchSignIn.rejected, (state, { payload }) => {
            userSlice.caseReducers.setErrorStatus(state, payload);
        });

        builder.addCase(fetchUserData.fulfilled, (state, payload) => {
            userSlice.caseReducers.setSuccessAuth(state, payload);
        });
        builder.addCase(fetchUserData.pending, (state) => {
            userSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchUserData.rejected, (state) => {
            state.status = LoadingStatus.IDLE;
        });

        builder.addCase(fetchSignUp.fulfilled, (state) => {
            userSlice.caseReducers.setSuccess(state);
        });
        builder.addCase(fetchSignUp.pending, (state) => {
            userSlice.caseReducers.setLoadingStatus(state);
        });

        builder.addCase(fetchSignUp.rejected, (state, { payload }) => {
            userSlice.caseReducers.setErrorStatus(state, payload);
        });
    },
});

export default userSlice.reducer;

export const { clearUserError, logout, setUserStatus } = userSlice.actions;
