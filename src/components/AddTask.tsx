import {type ChangeEvent, useState} from "react";
import {apiTodo} from "../api/api.ts";
import type {filterType} from "../type";

interface AddTaskProps {
    fetchTodos: (status: filterType) => void;
    filter: filterType;
}

export const AddTask = ({fetchTodos, filter}: AddTaskProps) => {
    //ошибка валидации
    const [inputError, setInputError] = useState<string>('')

// Значение в текстовом поле
    const [valueInInput, setValueInInput] = useState<string>('')

    const handleOnClickAdd = async () => {
        setInputError('')
        if(!valueInInput.trim()) {
            setInputError('Введите название задачи')
            return
        }

        if (valueInInput.trim().length < 2) {
            setInputError('Минимум 2 символа')
            return
        }

        if(valueInInput.trim().length > 64) {
            setInputError('Максимум 64 символа')
            return
        }


        try {
            await apiTodo.addTodos(valueInInput)
            await fetchTodos(filter)
            setValueInInput('')
        } catch (error) {
            console.error('Ошибка добавления задачи', error)
        }


    }

// Обработка изменения в input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInInput(e.target.value)
    }

    return(
        <div>
            <div className={'container'}>
                <input
                    type="text"
                    placeholder="Введите название задачи..."
                    onChange={handleChange}
                    value={valueInInput}
                    className={'inp'}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            handleOnClickAdd()
                        }}
                    }
                />
                <button
                    onClick={handleOnClickAdd}
                    className={'btn'}
                >Добавить
                </button>
            </div>
            {inputError && (<div className={'span-err'}>{inputError}</div>)}
        </div>

    )
}
