import type {Todo} from "../../type";
import {TaskItem} from "../TaskItem/TaskItem.tsx";
import styles from './TaskList.module.scss'

export interface TasksListProps {
    todos: Todo[];
    fetchTodos: () => void;
    setIsEditing: (isEditing: boolean) => void;
}

export const TasksList = ({ todos, fetchTodos, setIsEditing}: TasksListProps) => {

    return(
        <>
            <ul className={styles.todosContainer}>
                {todos.length > 0 ? (todos.map(todo => (
                    <li key={todo.id}>
                        <TaskItem
                            setIsEditing={setIsEditing}
                            todo={todo}
                            fetchTodos={fetchTodos}
                        />
                    </li>
                ))) : (<p>Список задач пуст</p>)}
            </ul>
        </>
    )
}