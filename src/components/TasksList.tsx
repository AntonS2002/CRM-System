import {useState} from "react";
import {apiTodo} from "../api/api.ts";
import type {filterType, Todo} from "../type";

interface TasksListProps {
    loading: boolean;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    fetchTodos: (status: filterType) => void;
    filter: filterType;
}

export const TasksList = ({loading, todos, setTodos, fetchTodos, filter}: TasksListProps) => {

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
            await fetchTodos(filter)

        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            {loading ? (<div>Loading...</div>) :(<div className={'todos-container'}>
                {todos.length > 0 ? (todos.map(todo => (
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