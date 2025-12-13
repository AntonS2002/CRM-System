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
export type filterType = 'all' | 'completed' | 'inWork';

export interface TasksListProps {
    loading: boolean;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    fetchTodos: (status: filterType) => void;
    filter: filterType;
}

export interface AddTaskProps {
    fetchTodos: (status: filterType) => void;
    filter: filterType;
}

export interface FilteredTaskProps {
    filter: filterType;
    setFilter: React.Dispatch<React.SetStateAction<filterType>>;
    count: TodoInfo;
}