import './App.css'
import {useState} from "react";

function App() {
  // Значение в текстовом поле
  const [valueInInput, setValueInInput] = useState<string>('')
  // Массив задач
  const [todos, setTodos] = useState<string[]>([])

//Обработка изменения в input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInInput(e.target.value)
  }

// Обработка нажатия кнопки "Добавить"
  const handleOnClick = () => {
    setTodos([...todos, valueInInput])
    setValueInInput('')
  }

  return (
    <div className={'app-container'}>
      <div className={'container'}>
        <input
            type="text"
            placeholder="Введите название задачи..."
            onChange={handleChange}
            className={'inp'}
        />
        <button
            onClick={handleOnClick}
            className={'btn'}
        >Добавить
        </button>
      </div>
      <div className={'todos-container'}>
        {todos.map(todo => (
            <div
                key={todo}
                className={'todo'}
            >
              {todo}
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
