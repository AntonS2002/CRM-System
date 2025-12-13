import type {filterType, MetaResponse, Todo, TodoInfo, TodoRequest} from "../type";

export const apiTodo = {

    // получить список задач
    async getTodos(status: filterType): Promise<MetaResponse<Todo, TodoInfo>> {
        const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        if(!response.ok) {
            throw new Error(`Ошибка, статус: ${response.status}`);
        }
        return response.json();
    },

    // добавить задачу
    async addTodos(todo: TodoRequest) {
        const response = await fetch(`https://easydev.club/api/v1/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        if(!response.ok){
            throw new Error(`Failed app todo: ${response.status}`)
        }
    },

    // сохранение задачи
    async saveTodos(id: number, todoUpdate: {title: string}): Promise<Todo> {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(todoUpdate)
        })

        if(!response.ok){
            throw new Error(`Ошибка редактирования:${response.status}`)
        }
        return response.json();
    },

    // удаление задачи
    async deleteTodos(id: number) {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
        if(!response.ok){
            throw new Error(`Ошибка: ${response.status}`)
        }
    },

    // изменение статуса задачи
    async toggleTodos(id: number, todo: TodoRequest) {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
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
}