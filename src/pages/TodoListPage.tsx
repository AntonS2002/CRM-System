import {useEffect, useState} from "react";
import type {FilterType, Todo, TodoInfo} from "../type";
import {TasksList} from "../components/TasksList/TasksList.tsx";
import {FilteredTasks} from "../components/TasksFilter/TasksFilter.tsx";
import {AddNewTask} from "../components/AddNewTask/AddNewTask.tsx";
import {getTodos} from "../api/api.ts";
import styles from './TodoListPage.module.scss'



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
    const fetchTodos = async(): Promise<void> => {
        setLoading(true)
        try {
            const dataTodos = await getTodos(filter)

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

    //Вывод задач после перезагрузки страницы и обновление каждые 5 секунд
    useEffect(() => {
        fetchTodos()
        const intervalId = setInterval(fetchTodos, 5000)
        return () => {
            clearInterval(intervalId)
        }
    }, [filter]);

    return (
        <div className={styles.todoListPage}>
            <div className={styles.appContainer}>
                <AddNewTask
                    fetchTodos={fetchTodos}
                />
                <FilteredTasks
                    filter={filter}
                    setFilter={setFilter}
                    count={count}
                />

                {loading ? (<p>Loading...</p>) :(<TasksList
                    todos={todos}
                    fetchTodos={fetchTodos}
                />)}
        </div>

        </div>
    )
}
