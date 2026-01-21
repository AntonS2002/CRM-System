import {addTodos} from "../../api/api.ts";
import styles from './AddNewTask.module.scss'
import {Button, Form, Input} from "antd";

export interface AddTaskProps {
    fetchTodos: () => void;
}

export const AddNewTask = ({fetchTodos}: AddTaskProps) => {
    // Создаем экземпляр формы
    const [form] = Form.useForm();

    // Обработка добавления задачи
    const handleSubmitAddTask = async (value: {title: string}) => {
        const title = value.title.trim()
        try {
            await addTodos({title: title, isDone: false})
            await fetchTodos()
            form.resetFields()
        } catch (error) {
            console.error('Ошибка добавления задачи', error)
            alert('Ошибка добавления задачи')
        }
    }

    return(
        <>
            <Form
                form={form}
                className={styles.form}
                onFinish={handleSubmitAddTask}
            >
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Введите название задачи!'
                        },
                        {
                            pattern: /^\S(?:.*\S)?$/,
                            message: 'Введите название задачи!'
                        },
                        {
                            min: 2,
                            message: 'Минимум 2 символа'
                        },
                        {
                            max: 64,
                            message: 'Максимум 64 символа'
                        },
                    ]}
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
