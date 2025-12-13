import type {filterType, Todo} from "../type";

export const apiTodo = {

    // получить список задач
    async getTodos(status: filterType) {
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
    async addTodos(title: string) {
        const response = await fetch(`https://easydev.club/api/v1/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                isDone: false
            })
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
    async toggleTodos(id: number, todoUpdate: Partial<Todo>) {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...todoUpdate,
                isDone: !todoUpdate.isDone
            })
        })

        if(!response.ok){
            console.log(`Ошибка изменения статуса задачи: ${response.status}`)
        }
        return response.json();
    }
}