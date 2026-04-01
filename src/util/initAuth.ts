import {store} from "../store";
import {logout, setCredentials, setRoles} from "../store/slices/authSlice.ts";
import {notification} from "antd";
import {tokenManager} from "./auth.ts";
import {getProfileUser, refreshToken} from "../api/apiAuth.ts";


export const initAuth = async () => {
    try {
        const refreshTokenValue = localStorage.getItem('refreshToken')

        const data = await refreshToken(refreshTokenValue)

        tokenManager.setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken)

        store.dispatch(setCredentials())

        const user = await getProfileUser();

        store.dispatch(setRoles(user.roles));

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