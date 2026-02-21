
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export const setAuthToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const setRefreshToken = (token: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export const getAuthToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const saveTokens = (accessToken: string, refreshToken: string) => {
    setAuthToken(accessToken)
    setRefreshToken(refreshToken)
}