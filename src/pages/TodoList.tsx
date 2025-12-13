import {useEffect, useState} from "react";
import type {filterType, Todo, TodoInfo} from "../type";
import {apiTodo} from "../api/api.ts";
import {TasksList} from "../components/TasksList.tsx";
import {FilteredTasks} from "../components/FilteredTask.tsx";
import {AddTask} from "../components/AddTask.tsx";

export const TodoList = () => {

    const [count, setCount] = useState<TodoInfo>({
        all: 0,
        completed: 0,
        inWork: 0,
    })

    const [todos, setTodos] = useState<Todo[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [filter, setFilter] = useState<filterType>('all')

    //Просмотр списка задач
    const fetchTodos = async(status: filterType): Promise<void> => {
        setLoading(true)
        try {
            const dataTodos = await apiTodo.getTodos(status)
            if(Array.isArray(dataTodos.data)){
                setTodos(dataTodos.data.reverse())
                console.log(`Список задач: ${dataTodos.data.length}`)
            }
            if(dataTodos && dataTodos.info){
                setCount(dataTodos.info)
            }

        } catch (error) {
            console.log(`Ошибка загрузки задач: ${error}`)
            setTodos([])
        } finally {
            setLoading(false)
        }
    }


    //Вывод задач после перезагрузки страницы
    useEffect(() => {
        const loadTodos = async () =>{
            await fetchTodos(filter)
        }
        loadTodos()
    }, [filter]);


    return (
        <div className={'app-container'}>
            <AddTask
                fetchTodos={fetchTodos}
                filter={filter}
            />
            <FilteredTasks
                filter={filter}
                setFilter={setFilter}
                count={count}
            />
            <TasksList
                loading={loading}
                todos={todos}
                setTodos={setTodos}
                fetchTodos={fetchTodos}
                filter={filter}
            />
        </div>
    )
}
