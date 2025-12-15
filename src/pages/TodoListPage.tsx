import {useEffect, useState} from "react";
import type {FilterType, Todo, TodoInfo} from "../type";
import {TasksList} from "../components/TasksList.tsx";
import {FilteredTasks} from "../components/TasksFilter/TasksFilter.tsx";
import {AddNewTask} from "../components/AddNewTask/AddNewTask.tsx";
import {getTodos} from "../api/api.ts";

export const TodoListPage = () => {

    const [count, setCount] = useState<TodoInfo>({
        all: 0,
        completed: 0,
        inWork: 0,
    })

    const [todos, setTodos] = useState<Todo[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [filter, setFilter] = useState<FilterType>('all')

    //Просмотр списка задач
    const fetchTodos = async(status: FilterType): Promise<void> => {
        setLoading(true)
        try {
            const dataTodos = await getTodos(status)

                setTodos(dataTodos.data)
                console.log(`Список задач: ${dataTodos.data.length}`)

                if(dataTodos.info) {
                    setCount(dataTodos.info)
                }

        } catch (error) {
            console.log(`Ошибка загрузки задач: ${error}`)
            alert('Ошибка загрузки')
        } finally {
            setLoading(false)
        }
    }

    //Вывод задач после перезагрузки страницы
    useEffect(() => {
            fetchTodos(filter)
    }, [filter]);


    return (
        <div className={'app-container'}>
            <AddNewTask
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
