import {Button, Form, Input, notification, Space} from "antd";
import styles from "./SignupForm.module.scss";
import {Link} from "react-router-dom";
import {
    emailTextAuthRules,
    loginTextAuthRules,
    passwordTextAuthRules, phoneTextAuthRules,
    usernameTextAuthRules
} from "../Validation/FormAuthRules.ts";
import {RegisterNewUser} from "../../api/api.ts";


export const SignupForm = () => {

    const [form] = Form.useForm();

    const addNewUser = async (value: {
        login: string;
        username: string;
        password: string;
        confirmPassword: string;
        email: string;
        phoneNumber: string;}) => {

        try {
            const {confirmPassword, ...userData} = value

            const cleanedData = {
                login: userData.login.toLowerCase(),
                username: userData.username.trim(),
                password: userData.password.trim(),
                email: userData.email.trim().toLowerCase(),
                phoneNumber: userData.phoneNumber?.trim() || '',
            }

            console.log("Отправляемые данные на сервер:", cleanedData);
            const data = await RegisterNewUser(cleanedData)
            console.log("Ответ сервера:", data);

            notification.success({
                message: "Пользователь создан",
            })

            form.resetFields();

        } catch (error: any) {
            console.error("Ответ сервера (если есть):", error.response?.data);
            notification.error({
                title: "Ошибка создания пользователя",
            })

        }
    }

return (
    <>
    <Form onFinish={addNewUser} form={form} size="large" style={{width: '500px'}}>
        <Form.Item
            label="Имя пользователя:"
            layout="vertical"
            name="username"
            rules={usernameTextAuthRules}>
            <Input placeholder={'Введите имя пользователя'}/>
        </Form.Item>

        <Form.Item
            label="Логин"
            layout="vertical"
            name="login"
            rules={loginTextAuthRules}
        >
            <Input placeholder={'Введите логин'}/>
        </Form.Item>

        <Form.Item
            label="Пароль:"
            layout='vertical'
            name='password'
            rules={passwordTextAuthRules}
        >
            <Input.Password placeholder={'Введите пароль'}/>
        </Form.Item>

        <Form.Item
            label="Повторите пароль:"
            layout='vertical'
            name='confirmPassword'
            dependencies={['password']}
            rules={[
                {required: true, message: 'Повторите пароль'},
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if(!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                    }
                })
            ]}
        >
            <Input.Password placeholder={'Повторите пароль'}/>
        </Form.Item>

        <Form.Item
            label="Почтовый адрес:"
            layout='vertical'
            name='email'
            rules={emailTextAuthRules}
        >
            <Input placeholder={'Введите email'}/>
        </Form.Item>

        <Form.Item
            name="phoneNumber"
            label="Телефон:"
            rules={phoneTextAuthRules}
            layout={'vertical'}
        >
            <Space.Compact block>
                <Input/>
            </Space.Compact>
        </Form.Item>

        <Form.Item>
            <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                color="purple"
                variant="solid"
            >
                Зарегистрироваться
            </Button>
        </Form.Item>
    </Form>
        <div className={styles.container}>
              <span>Уже зарегистрированы ?</span>
            <span> <Link
                to={'/auth/login'}
                style={{
                    textDecoration: "none",
                    color: "blue",
                }}
            >Войти</Link></span>
        </div>
    </>
)

}