import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setCredentials: (state) => {
        state.isAuth = true;
        },

        logout: (state) => {
            state.isAuth = false;
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;