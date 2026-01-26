import {addTodos} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'
import {Button, Form, Input} from "antd";
import {useCallback, useMemo} from "react";

export interface AddTaskProps {
    fetchTodos: () => void;
}
export const AddNewTask = ({fetchTodos}: AddTaskProps) => {
    // Создаем экземпляр формы
    const [form] = Form.useForm();

    const rulesNumber = {
        min: 2,
        max: 64

}
    // Обработка добавления задачи
    const handleSubmitAddTask = useCallback(async (value: {title: string}) => {
        const title = value.title.trim()
        try {
            await addTodos({title: title, isDone: false})
            await fetchTodos()
            form.resetFields()
        } catch (error) {
            alert('Ошибка добавления задачи' + error)
        }
    }, [fetchTodos, form]);

    const validationRules = useMemo(() => [
        {
            required: true,
            message: 'Введите название задачи!'
        },
        {
            pattern: /^\S(?:.*\S)?$/,
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
    ], [rulesNumber.min, rulesNumber.max])
    return(
        <>
            <Form
                form={form}
                className={styles.form}
                onFinish={handleSubmitAddTask}
            >
                <Form.Item
                    name="title"
                    rules={validationRules}
                >
                    <Input
                        type="text"
                        placeholder="Введите название задачи..."
                        className={styles.input}
                        name="title"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>

            </Form>
        </>

    )
}
