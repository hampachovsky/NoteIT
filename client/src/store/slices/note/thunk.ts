import { noteAPI } from 'api/noteAPI';
import { ActionType } from './types';
import { FiltersType, INote, NotePayloadType, RequestErrorType } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotes = createAsyncThunk(ActionType.FETCH_NOTES, async (_, thunkAPI) => {
    try {
        const response = await noteAPI.getAll();
        return response;
    } catch (error) {
        const err = error as RequestErrorType;
        return thunkAPI.rejectWithValue(err.response?.data.error);
    }
});

export const fetchNotesBy = createAsyncThunk(
    ActionType.FETCH_NOTES_BY,
    async (payload: FiltersType, thunkAPI) => {
        try {
            const response = await noteAPI.getBy(payload);
            return response;
        } catch (error) {
            const err = error as RequestErrorType;
            return thunkAPI.rejectWithValue(err.response?.data.error);
        }
    },
);

export const fetchCreateNote = createAsyncThunk(
    ActionType.FETCH_CREATE_NOTES,
    async (payload: NotePayloadType, thunkAPI) => {
        try {
            const response = await noteAPI.create(payload);
            return response;
        } catch (error) {
            const err = error as RequestErrorType;
            return thunkAPI.rejectWithValue(err.response?.data.error);
        }
    },
);

export const fetchUpdateNote = createAsyncThunk(
    ActionType.FETCH_UPDATE_NOTE,
    async (payload: INote, thunkAPI) => {
        try {
            const response = await noteAPI.update(payload);
            return response;
        } catch (error) {
            const err = error as RequestErrorType;
            return thunkAPI.rejectWithValue(err.response?.data.error);
        }
    },
);

export const fetchDeleteNote = createAsyncThunk(
    ActionType.FETCH_DELETE_NOTE,
    async (payload: string, thunkAPI) => {
        await noteAPI.delete(payload);
        return payload;
    },
);
