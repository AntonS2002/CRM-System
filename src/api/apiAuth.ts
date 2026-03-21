import type {AuthData, Profile, Token, User, UserRegistration} from "../type";
import {tokenManager} from "../util/auth.ts";
import {store} from "../store";
import {logout} from "../store/slices/authSlice.ts";
import {axiosInstance} from "./apiInstance.ts";
import {initAuth} from "../util/initAuth.ts";


axiosInstance.interceptors.request.use((config) => {
    const token = tokenManager.getToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if(error.response?.status === 401 && originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await initAuth()
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return axiosInstance(originalRequest)
            } catch (error) {
                tokenManager.clearToken()
                store.dispatch(logout())
                return Promise.reject(error);
            }
        }
    }
)

export async function registerNewUser(user: UserRegistration){
    const response = await axiosInstance.post<Profile>('/auth/signup', user)
    return response.data;
}

export async function loginUser(user: AuthData) {
    const response =await axiosInstance.post<Token>('auth/signin', user, {})
    return response.data;
}

export async function logoutProfile() {
    const repsonse = await axiosInstance.post<string>('/user/logout', {});
    return repsonse.data
}

export async function refreshToken(refreshTokenValue: string | null)  {
    const response = await axiosInstance.post<Token>('/auth/refresh', {
        refreshToken: refreshTokenValue
    });
    return response.data;
}

export async function getProfileUser() {
    const response = await axiosInstance.get<User>('/user/profile');
    return response.data;
}

