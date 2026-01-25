import type {FilterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";
import axios from "axios";


const url = axios.create({
    baseURL: 'https://easydev.club/api/v1/todos',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

// получить список задач
export async function getTodos(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await url.get('',{
        params: {
            filter: status
        }
    })
    if(response.status !== 200) {
    throw new Error(`Ошибка, статус: ${response.status}`);
}
return response.data;
}

// добавить задачу
export async function addTodos(todo: Partial<TodoRequest>) {
    try {
        const response = await url.post(``, todo, {})
        return response.data;

    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            throw new Error(`Ошибка добавления задачи: ${error.response.status}`);
        }
        throw new Error('Ошибка добавления задачи: неизвестная ошибка')
    }
}

// сохранение задачи
export async function editTodos(id: number, updateTodo: Partial<Todo>): Promise<Todo> {
    try {
        const response = await url.put(`/${id}`, updateTodo,{})
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            throw new Error(`Ошибка редактирования:${error.response.status}`)
        }
        throw new Error('Ошибка редактирования: неизвестная ошибка')
    }
}

// удаление задачи
export async function deleteTodos(id: number) {
    try {
        const response = await url.delete(`/${id}`, {})
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Ошибка удаления задачи: ${error.response.status}`)
        }
        throw new Error('Ошибка удаления задачи: Неизвестная ошибка')
    }
}


