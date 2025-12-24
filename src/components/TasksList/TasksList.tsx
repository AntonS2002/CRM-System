import type {Todo} from "../../type";
import {TaskItem} from "../TaskItem/TaskItem.tsx";
import styles from './TaskList.module.scss'

export interface TasksListProps {

    todos: Todo[];
    fetchTodos: () => void;
}

export const TasksList = ({ todos, fetchTodos}: TasksListProps) => {

    return(
        <div>
            <ul className={styles.todosContainer}>
                {todos.length > 0 ? (todos.map(todo => (
                    <li key={todo.id}>
                        <TaskItem
                            todo={todo}
                            todos={todos}
                            fetchTodos={fetchTodos}
                        />
                    </li>
                ))) : (<div>
                    <p>Список задач пуст</p>
                </div>)}
            </ul>)
        </div>
    )
}