import type {FilterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";
import axios from "axios";

const url = 'https://easydev.club/api/v1/todos';

// получить список задач
export async function getTodos(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await axios.get(`${url}?filter=${status}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if(!response.status) {
    throw new Error(`Ошибка, статус: ${response.status}`);
}
return response.data;
}

// добавить задачу
export async function addTodos(todo: Partial<TodoRequest>) {
    try {
        const response = await axios.post(`${url}`, todo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
        const response = await axios.put(`${url}/${id}`, updateTodo,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
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
        const response = await axios.delete(`${url}/${id}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Ошибка удаления задачи: ${error.response.status}`)
        }
        throw new Error('Ошибка удаления задачи: Неизвестная ошибка')
    }
}


