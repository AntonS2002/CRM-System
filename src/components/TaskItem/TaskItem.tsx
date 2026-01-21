import {useState} from "react";
import type {Todo} from "../../type";
import {deleteTodos, editTodos} from "../../api/api.ts";
import styles from './TaskItem.module.scss'
import {Button, Checkbox, Form, Input, Space} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";

export interface TodoItemProps {
    todo: Todo
    todos: Todo[]
    fetchTodos: () => void;
    setIsEditing: (isEditing: boolean) => void;
}

export const TaskItem = ({ todo, todos, fetchTodos, setIsEditing}: TodoItemProps) => {
    // Состояние для редактирования задач
    const [EditingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>('')


    // Отправка формы
    const handleSubmit = async (values: {title: string}) => {
        try {
            if(EditingId === null) return

            const updateTodo: Todo = {
                id: EditingId,
                title: values.title,
                created: '',
                isDone: false,
            }

            await editTodos(EditingId, updateTodo)
            setIsEditing(false)
            handleCancelEdit()
            await fetchTodos()

        } catch (error) {
            console.log('Ошибка отправки формы:', error)
            setIsEditing(false)
        }

    }

    // Обработка отмены редактирования
    const handleCancelEdit = () => {
            setEditingId(null)
            setEditText('')
            setIsEditing(false)
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
        setIsEditing(true)
    }


    // Для редактирования формы
    const [form] = Form.useForm()

    return (
        <div key={todo.id} className={styles.todo}>
            <div className={styles.item}>
                <Checkbox
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                />
                {EditingId === todo.id ? (
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        className={styles.editForm}
                        initialValues={{ title: editText }}
                    >
                        <Space>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Название не может быть пустым'
                                    },
                                    {
                                        pattern: /^\S(?:.*\S)?$/,
                                        message: 'Название не может быть пустым'
                                    },
                                    {
                                        min: 2,
                                        message: 'Минимум 2 символа'
                                    },
                                    {
                                        max: 64,
                                        message: 'Максимум 64 символа'
                                    }
                                ]}
                            >
                                <Input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className={styles.input}
                                    autoFocus
                                />
                            </Form.Item>
                        </Space>


                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<CheckOutlined />}
                                size="middle"
                            />
                            <Button
                                type="primary"
                                onClick={handleCancelEdit}
                                icon={<CloseOutlined/>}
                                size="middle"
                                danger={true}
                            />
                        </Space>
                    </Form>
                ) : (<div>{todo.title}</div>)}
            </div>
            <div className={styles.itemBtn}>
                {EditingId !== todo.id && (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleStartEdit(todo.id, todo.title)}
                            icon={<EditOutlined/>}
                            size="large"
                        />

                        <Button
                            type="primary"
                            onClick={() => handleDeleteTask(todo.id)}
                            icon={<DeleteOutlined/>}
                            danger={true}
                            size="large"
                        />
                    </Space>
                )}
            </div>
        </div>
    )
}