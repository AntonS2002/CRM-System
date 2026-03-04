import type {
    AuthData,
    FilterType,
    MetaResponse, Profile,
    Todo,
    TodoInfo,
    TodoRequest, Token,
    UserRegistration
} from "../type";
import axios from "axios";
import {tokenManager} from "../util/auth.ts";

const axiosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})


axiosInstance.interceptors.request.use((config) => {
    const token = tokenManager.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Обрабатываем 401 ошибку
axiosInstance.interceptors.response.use(
    res => res,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) return Promise.reject(error);
        if (originalRequest.url.includes("/auth/refresh")) return Promise.reject(error);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshTokenValue = localStorage.getItem("refreshToken");
            if (!refreshTokenValue) {
                tokenManager.clearToken();
                window.location.href = "/auth/login";
                return Promise.reject(new Error("No refresh token"));
            }

            try {
                const response = await axios.post(
                    "https://easydev.club/api/v1/auth/refresh",
                    { refreshToken: refreshTokenValue }
                );
                tokenManager.setToken(response.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                tokenManager.clearToken();
                localStorage.removeItem("refreshToken");
                window.location.href = "/auth/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export async function getTodo(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await axiosInstance.get('/todos',{
        params: {
            filter: status
        }
    })

return response.data;
}

export async function addTodo(todo: TodoRequest) {
        const response = await axiosInstance.post(`/todos`, todo)
        return response.data;
}

export async function editTodo(id: number, updateTodo: Partial<Todo>): Promise<Todo> {
        const response = await axiosInstance.put(`/todos/${id}`, updateTodo,{})
        return response.data;
}

export async function deleteTodo(id: number) {
        const response = await axiosInstance.delete(`/todos/${id}`, {})
        return response.data;
}

export async function RegisterNewUser(user: UserRegistration){
    const response = await axiosInstance.post('/auth/signup', user)
    return response.data;
}

export async function LoginNewUser(user: AuthData){
    const response =await axiosInstance.post('auth/signin', user, {})
    return response.data;
}

export async function LogoutProfile() {
    const repsonse = await axiosInstance.post('/user/logout', {});
    return repsonse.data
}

export async function refreshToken(refreshTokenValue: string | null): Promise<Token>  {
    const response = await axiosInstance.post('/auth/refresh', {
        refreshToken: refreshTokenValue
    });
    return response.data;
}

export async function getProfileUser(): Promise<Profile>  {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
}


