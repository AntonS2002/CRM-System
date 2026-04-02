export interface TodoRequest {
    title?: string;
    isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
    id: number;
    title: string;
    created: string; // ISO date string
    isDone: boolean;
}

export interface TodoInfo {
    all: number
    completed: number
    inWork: number
}



export type FilterType = 'all' | 'completed' | 'inWork';

export interface UserRegistration {
    login: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface AuthData {
    login: string;
    password: string;
}

export interface RefreshToken {
    refreshToken: string;
}

export interface Token {
    accessToken: string
    refreshToken: string
}

export interface ProfileRequest {
    username: string;
    email: string;
    phoneNumber: string;
}

export interface Profile {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    roles: Roles[];
    phoneNumber: string;
}


// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isBlocked?: boolean;
    limit?: number;  // сколько на странице
    page?: number;  // страницу
}

// Интерфейс пользователя
export interface User {
    id: number;
    username: string;
    email: string;
    date: string; // ISO date string
    isBlocked: boolean;
    roles: Roles[];
    phoneNumber: string;
}


// Интерфейс для обновления данных пользователя
export interface UserRequest{
    username?: string;
    email?: string;
    phoneNumber?: string;
}

// Интерфейс метаинформации

export interface MetaResponse<T> {
    data: T[]
    meta: {
        totalAmount: number;
        sortBy: string | null;
        sortOrder: 'asc' | 'desc';
    }
}

export const Roles = {
        ADMIN: "ADMIN",
        MODERATOR: "MODERATOR",
        USER: "USER"
} as const;

export type Roles = 'ADMIN' | 'MODERATOR' | 'USER';




