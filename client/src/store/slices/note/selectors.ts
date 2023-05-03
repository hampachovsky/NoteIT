import { RootState } from 'store/store';
import { LoadingStatus } from 'types';
import { noteAdapter } from './noteSlice';

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = noteAdapter.getSelectors<RootState>((state) => state.noteReducer);

export const selectNotesStatus = (state: RootState) => state.noteReducer.status;

export const selectNotesIsLoading = (state: RootState) =>
    state.noteReducer.status === LoadingStatus.LOADING;

export const selectNotesFilters = (state: RootState) => state.noteReducer.filters;
