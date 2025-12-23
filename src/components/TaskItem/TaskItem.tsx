import {type FormEvent, useState} from "react";
import type {Todo} from "../../type";
import {deleteTodos, editTodos} from "../../api/api.ts";
import styles from './TaskItem.module.scss'
import {IconButton} from "../../ui/IconButton.tsx";
import {DeleteIcon} from "../../icons/deleteTodo.tsx";
import {EditIcon} from "../../icons/editTodo.tsx";
import {Validation} from "../../validation.ts";


export interface TodoItemProps {
    todo: Todo
    todos: Todo[]

    fetchTodos: () => void;
}

export const TaskItem = ({ todo, todos, fetchTodos}: TodoItemProps) => {
    // Состояние для редактирования задач
    const [EditingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>('')

    // Отправка формы
    const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();

        const validation = Validation(editText)
        if(!validation.isValid){
            setEditingId(null)
            return
        }

        try {

            const updateTodo: Todo = {
                id: id,
                title: editText,
                created: '',
                isDone: false,
            }

            await editTodos(id, updateTodo)
            handleCancelEdit()
            await fetchTodos()

        } catch (e) {
            console.log('Ошибка отправки формы:', e)
        }


    }

    // Обработка отмены редактирования
    const handleCancelEdit = () => {
            setEditingId(null)
            setEditText('')
    }

    // Обработка удаления задачи
    const handleDeleteTask = async (id: number) => {

        try {
            await deleteTodos(id)
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

            await editTodos(id, todoRequest)
            await fetchTodos()

        } catch (error) {
            console.error(error)
            alert('Ошибка переключения')
        }
    }

    // Обработка начала редактирования названия задачи
    const handleStartEdit = (id: number, title: string) => {
        setEditText(title)
        setEditingId(id)
    }

    return (
        <div key={todo.id} className={styles.todo}>
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                />
                {EditingId === todo.id ? (
                    <form onSubmit={(e) => handleSubmit(e, todo.id)}>
                    <div className={styles.itemBtn}>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className={styles.input}
                        />
                        <div className={styles.itemBtn}>
                            <IconButton
                                type='submit'
                                variant={'primary'}
                            >
                                ✓
                            </IconButton>
                            <IconButton
                                onClick={handleCancelEdit}
                                variant={'secondary'}
                            >
                                ✕
                            </IconButton>
                        </div>
                    </div>
                    </form>
                ) : (<div>{todo.title}</div>)}
            </div>
            <div className={styles.itemBtn}>
                {EditingId !== todo.id && (
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