import {Button, Form, Input, Space} from "antd";
import styles from "./SignupForm.module.scss";
import {Link} from "react-router-dom";
import {
    emailTextAuthRules,
    loginTextAuthRules,
    passwordTextAuthRules, phoneTextAuthRules,
    usernameTextAuthRules
} from "../Validation/FormAuthRules.ts";


export const SignupForm = () => {

    const [form] = Form.useForm();

return (
    <>
    <Form form={form} size="large" style={{width: '500px'}}>
        <Form.Item
            label="Имя пользователя:"
            layout="vertical"
            name="username"
            rules={usernameTextAuthRules}>
            <Input/>
        </Form.Item>

        <Form.Item
            label="Логин"
            layout="vertical"
            name="login"
            rules={loginTextAuthRules}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Пароль:"
            layout='vertical'
            name='password'
            rules={passwordTextAuthRules}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item
            label="Повторите пароль:"
            layout='vertical'
            name='confirmPassword'
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item
            label="Почтовый адрес:"
            layout='vertical'
            name='email'
            rules={emailTextAuthRules}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="phone"
            label="Телефон:"
            rules={phoneTextAuthRules}
            layout={'vertical'}
        >
            <Space.Compact block>
                <Input
                    style={{ width: '100%' }}
                    addonBefore={'+7'}
                />
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
                to={'/auth'}
                style={{
                    textDecoration: "none",
                    color: "blue",
                }}
            >Войти</Link></span>
        </div>
    </>
)

}