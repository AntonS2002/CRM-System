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

export type filterType = 'all' | 'completed' | 'inWork';
