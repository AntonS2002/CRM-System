import {type ChangeEvent, type FormEvent, useState} from "react";
import {addTodos} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'

export interface AddTaskProps {
    fetchTodos: () => void;
}

export const AddNewTask = ({fetchTodos}: AddTaskProps) => {
    //ошибка валидации
    const [inputError, setInputError] = useState<string>('')

    // Текст в поле ввода
    const [textInInput, setTextInInput] = useState<string>('')

    const handleSubmitAddTask = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setInputError('')
        if(!textInInput.trim()) {
            setInputError('Введите название задачи')
            return
        }

        if (textInInput.trim().length < 2) {
            setInputError('Минимум 2 символа')
            return
        }

        if(textInInput.trim().length > 64) {
            setInputError('Максимум 64 символа')
            return
        }

        try {
            await addTodos({title: textInInput, isDone: false})
            await fetchTodos()
            setTextInInput('')
        } catch (error) {
            console.error('Ошибка добавления задачи', error)
        }
    }

// Обработка изменения в input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInInput(e.target.value)
    }

    return(
        <div>
            <form className={styles.form} onSubmit={handleSubmitAddTask}>
                <input
                    type="text"
                    placeholder="Введите название задачи..."
                    onChange={handleChange}
                    value={textInInput}
                    className={styles.input}
                    name="title"
                />
                <button
                    className={styles.button}
                >Добавить
                </button>
            </form>
            {inputError && (<div className={styles.error}>{inputError}</div>)}
        </div>

    )
}
