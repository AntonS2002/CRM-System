import {Button, Form, Input} from "antd";
import styles from "./LoginForm.module.scss"
import {Link} from "react-router-dom";
import {
    loginTextAuthRules,
    passwordTextAuthRules,

} from "../Validation/FormAuthRules.ts";


export const LoginForm = () => {

    const [form] = Form.useForm();

    return (
        <>
            <Form form={form} size="large" style={{width: '500px'}}>
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

                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        color="purple"
                        variant="solid"
                    >
                        Войти
                    </Button>
                </Form.Item>



            </Form>
            <div className={styles.container}>
                <span>Еще не зарегистрированы ?</span>
                <span> <Link
                    to={'/auth/signup'}
                    style={{
                        textDecoration: "none",
                        color: "blue",
                    }}
                >Зарегистрироваться</Link></span>
            </div>
        </>
    )

}