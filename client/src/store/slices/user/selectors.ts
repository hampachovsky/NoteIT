import { RootState } from 'store/store';
import { LoadingStatus } from 'types';

export const selectUserStatus = (state: RootState) => state.userReducer.status;
export const selectUserIsLoading = (state: RootState) =>
    state.userReducer.status === LoadingStatus.LOADING;
export const selectUserStatusSuccess = (state: RootState) =>
    state.userReducer.status === LoadingStatus.SUCCESS;
