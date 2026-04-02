import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Roles} from "../../type";



export interface AuthState {
    isAuth: boolean;
    roles: Roles[];
}

const initialState: AuthState = {
    isAuth: false,
    roles: []
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
        },

        setRoles: (state, action: PayloadAction<Roles[]>) => {
            state.roles = action.payload;
        }


    }
})

export const {setCredentials, logout, setRoles} = authSlice.actions;

export default authSlice.reducer;