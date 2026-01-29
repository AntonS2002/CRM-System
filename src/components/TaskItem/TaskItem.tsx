import {useState} from "react";
import type {Todo} from "../../type";
import {deleteTodo, editTodo} from "../../api/api.ts";
import styles from './TaskItem.module.scss'
import {Button, Checkbox, Form, Input, Space} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";

export interface TodoItemProps {
    todo: Todo
    fetchTodos: () => void;
    setIsEditing: (isEditing: boolean) => void;
}

export const TaskItem = ({ todo, fetchTodos, setIsEditing}: TodoItemProps) => {
    // Состояние для редактирования задач
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>('')

    const isEditingThisTask = editingId === todo.id
    const showCheckbox = !isEditingThisTask

    // Обработка отправки редактирования задачи
    const handleEditTask = async (values: {title: string}) => {
        try {
            if(editingId === null) return

            const updateTodo = {
                ...todo,
                title: values.title
            }


            await editTodo(editingId, updateTodo)
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
            await deleteTodo(id)
            await fetchTodos()
        } catch (error) {
            alert('Ошибка удаления задачи' + error)
        }
    }

    // Обработка изменения статуса задачи
    const handleToggleEditTask = async (id: number) => {
        try {

            // Создаем todoRequest с измененным статусом
            const todoRequest = {
                isDone: !todo.isDone
            }

            await editTodo(id, todoRequest)
            await fetchTodos()

        } catch (error) {
            alert('Ошибка переключения' + error)
        }
    }

    // Обработка начала редактирования названия задачи
    const handleStartEdit = () => {
        setEditText(todo.title)
        setEditingId(todo.id)
        setIsEditing(true)

    }


    // Для редактирования формы
    const [form] = Form.useForm()

    return (
        <div key={todo.id} className={styles.todo}>
            <div className={styles.item}>
                {showCheckbox && <Checkbox
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggleEditTask(todo.id)}
                />}
                {editingId === todo.id ? (
                    <Form
                        form={form}
                        onFinish={handleEditTask}
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
                {editingId !== todo.id && (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleStartEdit()}
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