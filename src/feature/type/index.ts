export interface Todo {
    id: number;
    title: string;
    created: string; // ISO date string
    isDone: boolean;
}

export type filterType = 'all' | 'completed' | 'active';
