import type {Todo} from "../../type";
import {TaskItem} from "../TaskItem/TaskItem.tsx";
import styles from './TaskList.module.scss'

export interface TasksListProps {
    loading: boolean;
    todos: Todo[];
    fetchTodos: () => void;
}

export const TasksList = ({loading, todos, fetchTodos}: TasksListProps) => {


    return(
        <div>
            {loading ? (<div>Loading...</div>) :(<ul className={styles.todosContainer}>
                {todos.length > 0 ? (todos.map(todo => (
                    <li>
                        <TaskItem
                            key={todo.id}
                            todo={todo}
                            todos={todos}
                            fetchTodos={fetchTodos}
                        />
                    </li>
                ))) : (<div>
                    <p>Список задач пуст</p>
                </div>)}
            </ul>)}
        </div>
    )
}