import {Button, Form, Input, notification} from "antd";
import {useEffect} from "react";
import {getProfileUser, LogoutProfile,} from "../../api/api.ts";
import type {Profile} from "../../type";
import {getAuthToken, removeTokens} from "../../util/auth.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";




export const ProfileForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        const LoadProfileData = async () => {
            try {
                const token = getAuthToken()
                if(!token) {
                    await new Promise(resolve => setTimeout(resolve, 500))

                    const tokenAfterWait = getAuthToken()
                    if(!tokenAfterWait){
                        console.log("не удалось получить токен доступа")
                        notification.error({
                            title: 'Не удалось получить токен доступа'
                        })
                        return
                    }
                }

                console.log('📥 Загружаем профиль...');
                const data: Profile = await getProfileUser()
                console.log('✅ Профиль загружен:', data);
                form.setFieldsValue({
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                })
            } catch (error) {
                console.error('❌ Ошибка:', error);
                if(axios.isAxiosError(error) && error.response?.status === 401) {
                    notification.error({
                        title: 'Ошибка авторизации',
                        description: 'Пожалуйста войдите снова'
                    })
                }
            }
        }
        LoadProfileData()
    }, [form, navigate])

    const Logout = async () => {
            await LogoutProfile()
            removeTokens()
        navigate('/auth/login')
        notification.info({
            title: 'Вы вышли из системы',
        })
    }

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