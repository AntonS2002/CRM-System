import type {
    AuthData,
    FilterType,
    MetaResponse, Profile, ProfileRequest,
    Todo,
    TodoInfo,
    TodoRequest,
    UserRegistration
} from "../type";
import axios from "axios";
import {getAuthToken} from "../util/auth.ts";

const axiosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

// Обновляем токен при каждом запросе
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

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

export async function logout() {
    const repsonse = await axiosInstance.post('/user/logout');
    return repsonse.data
}

export async function refreshToken(refreshToken: string)  {
    const response = await axiosInstance.post('/auth/refresh', refreshToken);
    return response.data;
}

export async function getProfileUser(): Promise<Profile>  {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
}

export async function updateUserProfile(value: ProfileRequest)  {
    const response = await axiosInstance.put('/user/profile', value)
    return response.data;
}