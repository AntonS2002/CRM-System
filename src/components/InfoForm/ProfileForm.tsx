import {Button, Form, Input, notification} from "antd";
import {useEffect} from "react";
import {getProfileUser, LogoutProfile} from "../../api/api.ts";
import type {Profile} from "../../type";
import {removeTokens} from "../../util/auth.ts";
import {useNavigate} from "react-router-dom";



export const ProfileForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        const LoadProfileData = async () => {
            try {

                const data: Profile = await getProfileUser()
                form.setFieldsValue({
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                })
            } catch (error) {
                notification.error({
                    title: `Ошибка загрузки данных пользователя: ${error}`,
                })
            }
        }

        LoadProfileData()
    }, [])

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