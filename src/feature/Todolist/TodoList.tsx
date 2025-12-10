import {type ChangeEvent, useEffect, useState} from "react";
import type {filterType, Todo} from "../type";
import {apiTodo} from "../api/api.ts";

export const TodoList = () => {

    //ошибка валидации
    const [inputError, setInputError] = useState<string>('')

    // Фильтрация 'all' | 'completed' | 'active'
    const [filter, setFilter] = useState<filterType>('all')

    // Значение в текстовом поле
    const [valueInInput, setValueInInput] = useState<string>('')

    // Массив задач
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    // Состояние для редактирования задач
    const [isEditingId, setIsEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>('')

    // Обработка изменения в input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInInput(e.target.value)
    }

    //Просмотр списка задач
    const fetchTodos = async(status?: filterType) => {
        setLoading(true)
        try {
            const dataTodos = await apiTodo.getTodos(status)
            if(Array.isArray(dataTodos.data)){
                setTodos(dataTodos.data.reverse())
                console.log(`Список задач: ${dataTodos.data.length}`)
            }

        } catch (error) {
            console.log(`Ошибка загрузки задач: ${error}`)
            setTodos([])
        } finally {
            setLoading(false)
        }
    }

    //Вывод задач после перезагрузки страницы
    useEffect(() => {
        const loadTodos = async () =>{
            await fetchTodos()
        }
        loadTodos()
    }, [filter]);

    // Обработка добавления задачи
    const handleOnClickAdd = async () => {

        setInputError('')
        if(!valueInInput.trim()) {
            setInputError('Введите название задачи')
            return
        }

        if (valueInInput.trim().length <= 2) {
            setInputError('Минимум 2 символа')
            return
        }

        if(valueInInput.trim().length > 64) {
            setInputError('Максимум 64 символа')
            return
        }


        try {
            await apiTodo.addTodos(valueInInput)
            await fetchTodos()
            setValueInInput('')
        } catch (error) {
            console.error('Ошибка добавления задачи', error)
        }


    }

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

        try {
            //Ищем нужный туду
            await apiTodo.saveTodos(id, {title: editText.trim()})

            // Обновить локальное состояние
            setTodos(prev => prev.map(todo => todo.id === id ? {...todo, title: editText.trim()} : todo))

            // Сбросить состояние редактирования
            setIsEditingId(null)
            setEditText('')

        }catch (error){
            console.error(error)
        }
    }

    // Обработка начала редактирования названия задачи
    const handleStartEdit = (id: number, title: string) => {
        setEditText(title)
        setIsEditingId(id)
    }

    // Обработка отмены редактирования
    const handleCancelEdit = () => {
        setIsEditingId(null)
        setEditText('')
    }

    // Обработка удаления задачи
    const handleOnClickDelete = async (id: number) => {
        try {
            await apiTodo.deleteTodos(id)
            setTodos(prev => prev.filter(todo => todo.id !== id))

            await fetchTodos(filter)
        } catch (error) {
            console.error('Ошибка удаления задачи',error)
        }
    }

    // Обработка изменения статуса задачи
    const handleToggle = async (id: number) => {
        try {
            const todoUpdate = todos.find(todo => todo.id === id)
            if(!todoUpdate)return

            const data =  await apiTodo.toggleTodos(id, todoUpdate)

            // Изменение статуса локально
            setTodos(prev => prev.map(todo => todo.id === id ? {...todo, isDone: data.isDone} : todo))

        } catch (error) {
            console.error(error)
        }
    }

    // Получить отфильтрованный список задач
    const getFilteredTodos = (): Todo[] => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.isDone);
            case 'completed':
                return todos.filter(todo => todo.isDone);
            case 'all':
                return todos
            default:
                return todos
        }
    }
    const filteredTodos = getFilteredTodos()

    const countAll = todos.length
    const countActive = todos.filter(todo => !todo.isDone).length
    const countCompleted = todos.filter(todo => todo.isDone).length

    return (
        <div className={'app-container'}>
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

            <div className={'container'}>
                <button className={`btn-aac ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Все({countAll})</button>
                <button className={`btn-aac ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>В работе({countActive})</button>
                <button className={`btn-aac ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Сделано({countCompleted})</button>
            </div>

            {loading ? (<div>Loading...</div>) :(<div className={'todos-container'}>
                {filteredTodos.length > 0 ? (filteredTodos.map(todo => (
                    <div key={todo.id} className={'todo'}>
                        <div className={'item'}>
                            <input
                                type="checkbox"
                                checked={todo.isDone}
                                onChange={() => handleToggle(todo.id)}
                            />

                            {isEditingId === todo.id ? (
                                <div className={'item-btn'}>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className={'inp'}
                                        onKeyPress={(e) => {
                                            if(e.key === 'Enter'){
                                                handleSaveEdit(todo.id)
                                            }
                                        }}
                                    />
                                    <div className={'item-btn'}>
                                        <button className={'btn-y'} onClick={() => handleSaveEdit(todo.id)}>✓</button>
                                        <button className={'btn-n'} onClick={handleCancelEdit}>✕</button>
                                    </div>

                                </div>
                            ) : (<div onDoubleClick={() => handleStartEdit(todo.id, todo.title)}>{todo.title}</div>)}
                        </div>
                        <div className={'item-btn'}>
                            {isEditingId !== todo.id && (<button className={'btn-edit'} onClick={() => handleStartEdit(todo.id, todo.title)}>
                                    <img className={'btn-img'} src="https://img.icons8.com/?size=100&id=q1DgkfZsRrM4&format=png&color=FFFFFF" alt="icon"/>
                                </button>
                            )}
                            <button className={'btn-delete'} onClick={()=> handleOnClickDelete(todo.id)}>
                                <img className={'btn-img'} src="https://img.icons8.com/?size=100&id=67884&format=png&color=FFFFFF" alt="icon"/>
                            </button>

                        </div>

                    </div>
                ))) : (<div>
                    <p>Список задач пуст</p>
                </div>)}
            </div>)}
        </div>
    )
}
