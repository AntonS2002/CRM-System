import {redirect} from "react-router-dom";


class createManagerToken {
    private token: string | null = null;

    public setToken (token: string)  {
        this.token = token;
    }

    public getToken () {
        return this.token;
    }

    public clearToken() {
        this.token = null;
    }
}

export const tokenManager = new createManagerToken();



// const REFRESH_TOKEN_KEY = 'refreshToken'
//
// let inMemoryAccessToken: string | null = null
//
// export const setAuthToken = (token: string) => {
//     inMemoryAccessToken = token
// }
//
// export const setRefreshToken = (token: string) => {
//     localStorage.setItem(REFRESH_TOKEN_KEY, token)
// }
//
// export const getAuthToken = () => {
//     return inMemoryAccessToken
// }
//
// export const getRefreshToken = () => {
//     return localStorage.getItem(REFRESH_TOKEN_KEY)
// }
//
// export const removeTokens = () => {
//     inMemoryAccessToken = null
//     localStorage.removeItem(REFRESH_TOKEN_KEY)
// }
//
// export const saveTokens = (accessToken: string, refreshToken: string) => {
//     setAuthToken(accessToken)
//     setRefreshToken(refreshToken)
// }

 export const Logout = () => {
    localStorage.clear();
    tokenManager.clearToken()
    return redirect('/auth/signup')
 }