import {Button, Form, Input, notification} from "antd";
import {useEffect} from "react";
import {getProfileUser, LogoutProfile} from "../../api/api.ts";
import {tokenManager} from "../../util/auth.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../store/slices/authSlice.ts";
import type {RootState} from "../../store";

export const ProfileForm = () => {

    const dispatch = useDispatch();
    const {isAuth} = useSelector((state: RootState)=> state.auth);
    const navigate = useNavigate();
    const [form] = Form.useForm();


    useEffect(() => {
        const token = tokenManager.getToken();
        if(token) {
            tokenManager.setToken(token);
            dispatch(setAuth(true));
        }

        if(!isAuth) return;

        if (!tokenManager.getToken()) return;

        const loadProfile = async () => {
            try {
                const response = await getProfileUser();
                form.setFieldsValue({
                    username: response.username,
                    email: response.email,
                    phoneNumber: response.phoneNumber
                });
            } catch (err) {
                console.error(err);
            }
        };

        loadProfile();
    }, []);

    const Logout = async () => {
        await LogoutProfile();
        dispatch(setAuth(false));
        tokenManager.clearToken();
        localStorage.clear();
        navigate("/auth/login");
        notification.info({ title: "Вы вышли из системы" });
    };

    return (
       <div>
            <Form form={form} size={'large'} onFinish={Logout}>
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Почтовый адрес"
                    name="email"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    name="phoneNumber"
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item>
                    <Button danger={true} type={'primary'} htmlType="submit">Logout</Button>
                </Form.Item>
            </Form>
        </div>
    )
}