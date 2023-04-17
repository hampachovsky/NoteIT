export type LocationStateType = {
    from: { pathname: string; search: string };
};

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
