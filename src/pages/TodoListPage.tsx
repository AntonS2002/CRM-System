import {useCallback, useEffect, useRef, useState} from "react";
import type {Filter, Todo, TodoInfo} from "../type";
import {TasksList} from "../components/TasksList/TasksList.tsx";
import {FilterButtons} from "../components/TasksFilter/TasksFilter.tsx";
import {AddNewTask} from "../components/AddNewTask/AddNewTask.tsx";
import {getTodos} from "../api/apiTasks.ts";
import styles from './TodoListPage.module.scss'
import {notification} from "antd";



export const TodoListPage = () => {

    const [count, setCount] = useState<TodoInfo>({
        all: 0,
        completed: 0,
        inWork: 0,
    })

    const [todos, setTodos] = useState<Todo[]>([])

    const [filter, setFilter] = useState<Filter>('all')

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const isEditingRef = useRef(isEditing)

    // Обновляем ref при изменении состояния
    useEffect(() => {
        isEditingRef.current = isEditing
    }, [isEditing]);

    //Просмотр списка задач
    const fetchTodos = useCallback(async(): Promise<void> => {

        try {
            const dataTodos = await getTodos(filter)
                setTodos(dataTodos.data)
                if(dataTodos.info) {
                    setCount(dataTodos.info)
                }
        } catch (error) {
            console.log(`Ошибка загрузки задач: ${error}`)
            notification.error({
                message: 'Ошибка',
                description: 'Задачи не загружены'
            })
        }
    }, [filter])

    //Вывод задач после перезагрузки страницы и обновление каждые 5 секунд
    useEffect(() => {
        const safeFetch = () => {
            if(!isEditingRef.current){
                fetchTodos()
            }
        }
        safeFetch()
        const intervalId = setInterval(safeFetch, 5000)
        return () => {
            clearInterval(intervalId)
        }
    }, [filter, fetchTodos]);

    return (
        <div className={styles.todoListPage}>
            <div className={styles.appContainer}>
                <AddNewTask
                    fetchTodos={fetchTodos}
                />
                <FilterButtons
                    filter={filter}
                    setFilter={setFilter}
                    count={count}
                />

                <TasksList
                    todos={todos}
                    fetchTodos={fetchTodos}
                    setIsEditing={setIsEditing}
                />
        </div>
        </div>
    )
}
