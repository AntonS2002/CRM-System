import {useState} from "react";
import type {Todo} from "../../type";
import {deleteTodos, editTodos} from "../../api/api.ts";
import styles from './TaskItem.module.scss'
import {IconButton} from "../../ui/IconButton.tsx";
import {DeleteIcon} from "../../icons/deleteTodo.tsx";
import {EditIcon} from "../../icons/editTodo.tsx";



export interface TodoItemProps {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    fetchTodos: () => void;
}

export const TaskItem = ({ todo, todos, setTodos, fetchTodos}: TodoItemProps) => {

    // Состояние для редактирования задач
    const [isEditingId, setIsEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>('')

    // Обработка сохранения изменений задачи
    const handleSaveEdit = async (id: number) => {

        // Проверка на пустой текст
        if(!editText.trim()){
            setIsEditingId(null)
            return
        }

        if (editText.trim().length <= 2) {
            setIsEditingId(null)
            return
        }
        if(editText.trim().length > 64) {
            setIsEditingId(null)
            return
        }
        if(editText === todo.title){
            handleCancelEdit()
        }

        try {

            const updateTodo: Todo = {
                id: id,
                title: editText.trim(),
                created:'',
                isDone: false
            }

            //Ищем нужный туду
            await editTodos(id, updateTodo)


            // Обновить локальное состояние
            setTodos(prev => prev.map(todo => todo.id === id ? {...todo, title: editText.trim()} : todo))

            // Сбросить состояние редактирования
            handleCancelEdit()
            await fetchTodos()
        }catch (error){
            console.error(error)
        }
    }

    // Обработка отмены редактирования
    const handleCancelEdit = () => {
        setIsEditingId(null)
        setEditText('')
    }

    // Обработка удаления задачи
    const handleDeleteTask = async (id: number) => {

        try {
            await deleteTodos(id)
            setTodos(prev => prev.filter(todo => todo.id !== id))
            await fetchTodos()
        } catch (error) {
            console.error('Ошибка удаления задачи',error)
            alert('Ошибка удаления задачи')
        }
    }

    // Обработка изменения статуса задачи
    const handleToggle = async (id: number) => {
        try {
            const updateTodo = todos.find(todo => todo.id === id)
            if(!updateTodo)return

            // Создаем todoRequest с измененным статусом
            const todoRequest = {
                isDone: !updateTodo.isDone
            }
            // передаем данные и id
            const data =  await editTodos(id, todoRequest)

            // Изменение статуса локально
            setTodos(prev => prev.map(todo => todo.id === id ? {...todo, isDone: data.isDone} : todo))
            await fetchTodos()

        } catch (error) {
            console.error(error)
        }
    }

    // Обработка начала редактирования названия задачи
    const handleStartEdit = (id: number, title: string) => {
        setEditText(title)
        setIsEditingId(id)
    }

    return (
        <div key={todo.id} className={styles.todo}>
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                />
                {isEditingId === todo.id ? (
                    <div className={styles.itemBtn}>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className={styles.input}
                        />
                        <div className={styles.itemBtn}>
                            <button className={styles.btny} onClick={() => handleSaveEdit(todo.id)}>✓</button>
                            <button className={styles.btnn} onClick={handleCancelEdit}>✕</button>
                        </div>

                    </div>
                ) : (<div onDoubleClick={() => handleStartEdit(todo.id, todo.title)}>{todo.title}</div>)}
            </div>
            <div className={styles.itemBtn}>
                {isEditingId !== todo.id && (
                        <IconButton
                            onClick={() => handleStartEdit(todo.id, todo.title)}
                            variant={'primary'}
                        >
                            <EditIcon/>
                        </IconButton>
                )}
                <IconButton
                    onClick={() => handleDeleteTask(todo.id)}
                    variant={'secondary'}
                >
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
}