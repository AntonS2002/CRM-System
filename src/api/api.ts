import type {FilterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";

const url = import.meta.env.VITE_API_URL;

// получить список задач
export async function getTodos(status: FilterType): Promise<MetaResponse<Todo, TodoInfo>> {
    const response = await fetch(`${url}?filter=${status}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if(!response.ok) {
    throw new Error(`Ошибка, статус: ${response.status}`);
}
return response.json();
}

// добавить задачу
export async function addTodos(todo: TodoRequest) {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    if(!response.ok){
        throw new Error(`Failed app todo: ${response.status}`)
    }
}

// сохранение задачи
export async function saveTodos(id: number, updateTodo: Todo): Promise<Todo> {
    const response = await fetch(`${url}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(updateTodo)
    })

    if(!response.ok){
    throw new Error(`Ошибка редактирования:${response.status}`)
}
return response.json();
}

// удаление задачи
export async function deleteTodos(id: number) {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error(`Ошибка: ${response.status}`)
    }
}

// изменение статуса задачи
export async function toggleTodos(id: number, todo: TodoRequest) {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    })

    if(!response.ok){
        console.log(`Ошибка изменения статуса задачи: ${response.status}`)
    }
    return response.json();
}
