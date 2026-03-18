import type {
    FilterType,
    MetaResponse,
    Todo,
    TodoInfo,
    TodoRequest,
} from "../type";
import {axiosInstance} from "./apiInstance.ts";

export async function getTodo(status: FilterType) {
    const response = await axiosInstance.get<MetaResponse<Todo, TodoInfo>>('/todos',{
        params: {
            filter: status
        }
    })

return response.data;
}

export async function addTodo(todo: TodoRequest) {
        const response = await axiosInstance.post<Todo>(`/todos`, todo)
        return response.data;
}

export async function editTodo(id: number, updateTodo: Partial<Todo>) {
        const response = await axiosInstance.put<Todo>(`/todos/${id}`, updateTodo,{})
        return response.data;
}

export async function deleteTodo(id: number) {
        const response = await axiosInstance.delete<string>(`/todos/${id}`, {})
        return response.data;
}




