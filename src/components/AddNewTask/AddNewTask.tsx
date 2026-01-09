import {type ChangeEvent, type FormEvent, useState} from "react";
import {addTodos} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'
import {validateTextInput} from "../../validateTextInput.ts";
import {Button, Input} from "antd";


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

        const validation = validateTextInput(textInInput.trim())
        if (!validation.isValid) {
            setInputError(validation.errorMessage)
            return
        }

        try {
            await addTodos({title: textInInput, isDone: false})
            await fetchTodos()
            setTextInInput('')
        } catch (error) {
            console.error('Ошибка добавления задачи', error)
            alert('Ошибка добавления задачи')
        }
    }

// Обработка изменения в input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInInput(e.target.value)
    }

    return(

        <div>
            <form className={styles.form} onSubmit={handleSubmitAddTask}>
                <Input
                    type="text"
                    placeholder="Введите название задачи..."
                    onChange={handleChange}
                    value={textInInput}
                    className={styles.input}
                    name="title"
                />
                <Button htmlType="submit">Добавить</Button>
            </form>
            {inputError && (<div className={styles.error}>{inputError}</div>)}
        </div>

    )
}
