import {Button, Form, Input, notification} from "antd";
import styles from "./LoginForm.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {
    loginTextAuthRules,
    passwordTextAuthRules,
} from "../Validation/FormAuthRules.ts";
import {tokenManager} from "../../util/auth.ts";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../store/slices/authSlice.ts";
import {loginUser} from "../../api/apiAuth.ts";


export const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const authUser = async (value: { login: string, password: string, }) => {
        try {
            const response = await loginUser(value);

            localStorage.setItem('refreshToken', response.refreshToken);
            tokenManager.setToken(response.accessToken);

            dispatch(setCredentials())
            navigate('/app/todos', {replace: true});

            notification.success({
                title: "Успешная авторизация",
            })

        } catch (error) {
            notification.error({
                title: "Ошибка входа в систему",
            })

        }

    }

    const [form] = Form.useForm();

    return (
        <>
            <Form onFinish={authUser} form={form} size="large" style={{width: '500px'}}>
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

                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        color="purple"
                        variant="solid"
                    >Войти
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