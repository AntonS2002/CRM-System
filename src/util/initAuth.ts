import {refreshToken} from "../api/api.ts";
import {store} from "../store";
import {logout, setCredentials} from "../store/slices/authSlice.ts";
import {notification} from "antd";
import {tokenManager} from "./auth.ts";


export const initAuth = async () => {
    try {
        const refreshTokenValue = localStorage.getItem('refreshToken')

        const data = await refreshToken(refreshTokenValue)

        tokenManager.setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken)

        store.dispatch(setCredentials({accessToken: data.accessToken}))

        return null
    } catch (error) {
        store.dispatch(logout())
        tokenManager.clearToken()
        localStorage.clear()
        notification.error({
            title: `Не удалось обновить токен`,
        })
        return null
    }


}