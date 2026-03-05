import {refreshToken} from "./api.ts";
import {tokenManager} from "../util/auth.ts";

export const refreshRequest = async () => {
    const refsreshTokenValue = localStorage.getItem('refreshToken');

    const response = await refreshToken(refsreshTokenValue)

    tokenManager.setToken(response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    return response.accessToken
}