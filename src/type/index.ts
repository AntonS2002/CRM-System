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

export interface MetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}
export type FilterType = 'all' | 'completed' | 'inWork';

export interface UserRegistration {
    login: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface Profile {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    roles: Role[];
    phoneNumber: string;
}

type Role = ADMIN | USER | MODERATOR




