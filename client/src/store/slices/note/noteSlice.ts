import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote, LoadingStatus, NoteState, NoteType } from 'types';
import {
    fetchCreateNote,
    fetchDeleteNote,
    fetchNotes,
    fetchNotesBy,
    fetchUpdateNote,
} from './thunk';

export const noteAdapter = createEntityAdapter<INote>({
    selectId: (event) => event._id,
});

const initialState = noteAdapter.getInitialState<NoteState>({
    status: LoadingStatus.IDLE,
    error: null,
    filters: {
        queryString: '',
        date: '',
        type: '',
    },
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        resetNotesState: (state) => {
            noteAdapter.removeAll(state);
            state.filters = { queryString: '', date: '', type: '' };
            state.error = null;
            state.status = LoadingStatus.IDLE;
        },
        changeNoteFilterType: (state, action: PayloadAction<NoteType>) => {
            state.filters.type = action.payload;
        },
        changeNoteFilterDate: (state, action: PayloadAction<string>) => {
            state.filters.date = action.payload;
        },
        changeNoteFilterQueryString: (state, action: PayloadAction<string>) => {
            state.filters.queryString = action.payload;
        },

        clearNotesFilters: (state) => {
            state.filters.date = '';
            state.filters.queryString = '';
            state.filters.type = '';
        },
        setNotes: (state, action: PayloadAction<INote[]>) => {
            noteAdapter.setAll(state, action.payload);
        },
        setSuccessStatus: (state) => {
            state.error = null;
            state.status = LoadingStatus.SUCCESS;
        },
        setLoadingStatus: (state) => {
            state.error = null;
            state.status = LoadingStatus.LOADING;
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
        builder.addCase(fetchNotes.fulfilled, (state, payload) => {
            noteAdapter.setAll(state, payload);
            noteSlice.caseReducers.setSuccessStatus(state);
        });
        builder.addCase(fetchNotes.pending, (state) => {
            noteSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchNotes.rejected, (state, { payload }) => {
            noteSlice.caseReducers.setErrorStatus(state, payload);
        });

        builder.addCase(fetchNotesBy.fulfilled, (state, payload) => {
            noteAdapter.setAll(state, payload);
            noteSlice.caseReducers.setSuccessStatus(state);
        });
        builder.addCase(fetchNotesBy.pending, (state) => {
            noteSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchNotesBy.rejected, (state, { payload }) => {
            noteSlice.caseReducers.setErrorStatus(state, payload);
        });

        builder.addCase(fetchCreateNote.fulfilled, (state, { payload }) => {
            noteAdapter.addOne(state, payload);
            noteSlice.caseReducers.setSuccessStatus(state);
        });
        builder.addCase(fetchCreateNote.pending, (state) => {
            noteSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchCreateNote.rejected, (state, { payload }) => {
            noteSlice.caseReducers.setErrorStatus(state, payload);
        });

        builder.addCase(fetchUpdateNote.fulfilled, (state, { payload }) => {
            noteAdapter.setOne(state, payload);
            noteSlice.caseReducers.setSuccessStatus(state);
        });
        builder.addCase(fetchUpdateNote.pending, (state) => {
            noteSlice.caseReducers.setLoadingStatus(state);
        });
        builder.addCase(fetchUpdateNote.rejected, (state, { payload }) => {
            noteSlice.caseReducers.setErrorStatus(state, payload);
        });

        builder.addCase(fetchDeleteNote.fulfilled, (state, { payload }) => {
            noteAdapter.removeOne(state, payload);
            noteSlice.caseReducers.setSuccessStatus(state);
        });
        builder.addCase(fetchDeleteNote.pending, (state) => {
            noteSlice.caseReducers.setLoadingStatus(state);
        });
    },
});

export default noteSlice.reducer;

export const {
    changeNoteFilterType,
    changeNoteFilterDate,
    changeNoteFilterQueryString,
    resetNotesState,
} = noteSlice.actions;
