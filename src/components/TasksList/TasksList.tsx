import type {Todo} from "../../type";
import {TaskItem} from "../TaskItem/TaskItem.tsx";

export interface TasksListProps {
    todos: Todo[];
    fetchTodos: () => void;
    setIsEditing: (isEditing: boolean) => void;
}

export const TasksList = ({ todos, fetchTodos, setIsEditing}: TasksListProps) => {

    return(
        <>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{listStyle: 'none'}}>
                        <TaskItem
                            setIsEditing={setIsEditing}
                            todo={todo}
                            fetchTodos={fetchTodos}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}