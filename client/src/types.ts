import { AxiosError } from 'axios';

export type LocationStateType = {
    from: { pathname: string; search: string };
};

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERORR = 'ERROR',
}

export enum NoteType {
    minor = 'minor',
    warning = 'warning',
    important = 'important',
}

export interface State {
    status: LoadingStatus;
    error: string | null;
}

export interface SignInPayload {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface SignUpPayload {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface INote {
    _id: string;
    title: string;
    content: string;
    noteType: NoteType;
    noteDate: string;
}

export interface IUser {
    _id: string;
    username: string;
}

export interface UserState extends State {
    user: IUser | null;
    isAuth: boolean;
}

export interface SignInPayload {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface SignUpPayload {
    username: string;
    password: string;
    confirmPassword: string;
}

export type NotePayloadType = Omit<INote, '_id'>;

export type RequestErrorType = AxiosError<{ error: string }>;
