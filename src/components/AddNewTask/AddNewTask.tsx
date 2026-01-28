import {addTodo} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'
import {Button, Form, Input} from "antd";
import {useCallback} from "react";
import type {Rule} from "antd/es/form";

export interface AddTaskProps {
    fetchTodos: () => void;
}

const rulesNumber = {
    min: 2,
    max: 64
}

export const AddNewTask = ({fetchTodos}: AddTaskProps) => {
    // Создаем экземпляр формы
    const [form] = Form.useForm();


    // Создание и добавление задачи
    const handleAddTask = useCallback(async (value: {title: string}) => {
        const title = value.title.trim()
        try {
            await addTodo({title: title, isDone: false})
            await fetchTodos()
            form.resetFields()
        } catch (error) {
            alert('Ошибка добавления задачи' + error)
        }
    }, [fetchTodos, form]);

    const validationRules = (): Rule[] => {
        return [
            {
                required: true,
                message: 'Введите название задачи!'
            },
            {
                whitespace: true,
                message: 'Введите название задачи!'
            },
            {
                min: rulesNumber.min,
                message: 'Минимум 2 символа'
            },
            {
                max: rulesNumber.max,
                message: 'Максимум 64 символа'
            },
        ]
    }

    return(
        <>
            <Form
                form={form}
                className={styles.form}
                onFinish={handleAddTask}
            >
                <Form.Item
                    name="title"
                    rules={validationRules()}
                >
                    <Input
                        type="text"
                        placeholder="Введите название задачи..."
                        className={styles.input}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>

            </Form>
        </>

    )
}
