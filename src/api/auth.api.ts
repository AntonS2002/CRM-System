import {refreshToken} from "./api.ts";
import {tokenManager} from "../util/auth.ts";

import { setCredentials} from "../store/slices/authSlice.ts";
import {store} from "../store";



export const refreshRequest = async () => {
    const refreshTokenValue = localStorage.getItem('refreshToken');

    const response = await refreshToken(refreshTokenValue)

    tokenManager.setToken(response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    store.dispatch(setCredentials({ accessToken: response.accessToken }))


    return response.accessToken
}