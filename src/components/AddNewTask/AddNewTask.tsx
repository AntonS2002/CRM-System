import {addTodo} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'
import {Button, Form, Input} from "antd";
import {useCallback} from "react";
import {validationRules} from "../Validation/ValidationRules.tsx";

export interface AddTaskProps {
    fetchTodos: () => void;
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
