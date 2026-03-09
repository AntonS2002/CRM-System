import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string | null;
    isAuth: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isAuth: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setCredentials: (
            state,
            action: PayloadAction<{accessToken: string}>) => {
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
        },

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        logout: (state) => {
            state.accessToken = null;
            state.isAuth = false;
        }
    }
})

export const {setCredentials, setAccessToken, logout} = authSlice.actions;

export default authSlice.reducer;