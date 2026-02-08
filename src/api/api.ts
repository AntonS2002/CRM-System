import type {FilterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1/todos',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


export async function getTodo(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await axiosInstance.get('',{
        params: {
            filter: status
        }
    })

return response.data;
}


export async function addTodo(todo: TodoRequest) {
        const response = await axiosInstance.post(``, todo)
        return response.data;
}


export async function editTodo(id: number, updateTodo: Partial<Todo>): Promise<Todo> {
        const response = await axiosInstance.put(`/${id}`, updateTodo,{})
        return response.data;
}


export async function deleteTodo(id: number) {
        const response = await axiosInstance.delete(`/${id}`, {})
        return response.data;
}


