import type {FilterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1/todos',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

// получить список задач
export async function getTodo(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await axiosInstance.get('',{
        params: {
            filter: status
        }
    })
  //  if(response.status !== 200) {
  //  throw new Error(`Ошибка, статус: ${response.status}`);
//}
return response.data;
}

// добавить задачу
export async function addTodo(todo: Partial<TodoRequest>) {
        const response = await axiosInstance.post(``, todo, {})
        return response.data;
}

// сохранение задачи
export async function editTodo(id: number, updateTodo: Partial<Todo>): Promise<Todo> {
        const response = await axiosInstance.put(`/${id}`, updateTodo,{})
        return response.data;
}

// удаление задачи
export async function deleteTodo(id: number) {
        const response = await axiosInstance.delete(`/${id}`, {})
        return response.data;
}


