import type {Todo} from "../../type";
import {TaskItem} from "../TaskItem/TaskItem.tsx";
import type {Dispatch, SetStateAction} from "react";
import styles from './TaskList.module.scss'

export interface TasksListProps {
    loading: boolean;
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
    fetchTodos: () => void;
}

export const TasksList = ({loading, todos, setTodos, fetchTodos}: TasksListProps) => {


    return(
        <div>
            {loading ? (<div>Loading...</div>) :(<div className={styles.todosContainer}>
                {todos.length > 0 ? (todos.map(todo => (
                    <TaskItem
                        key={todo.id}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                        fetchTodos={fetchTodos}
                    />
                ))) : (<div>
                    <p>Список задач пуст</p>
                </div>)}
            </div>)}
        </div>
    )
}