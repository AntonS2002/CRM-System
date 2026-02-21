import {Button, Form, Input, notification, Space} from "antd";
import {useEffect, useState} from "react";
import {getProfileUser, updateUserProfile} from "../../api/api.ts";
import type {Profile, ProfileRequest} from "../../type";
import {emailTextAuthRules, phoneTextAuthRules, usernameTextAuthRules} from "../Validation/FormAuthRules.ts";



export const ProfileForm = () => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        LoadProfileData()
    }, [])

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

    const startEditProfileData = () => {
        setIsEditing(true);
    }

    const cancelEditProfileData = async () => {
        setIsEditing(false);
        await LoadProfileData()
    }

    const saveEditProfileData = async () => {
        try {
            const values: ProfileRequest = await form.validateFields()
            await updateUserProfile({
                username: values.username,
                email: values.email,
                phoneNumber: values.phoneNumber,
            })

            notification.success({
                title: 'Данные пользователя успешно сохранены'
            })

            setIsEditing(false);
        } catch (error) {
            notification.error({
                title: `Ошибка сохранения данных пользователя: ${error}`
            })
        }
    }

    return (
       <div>
            <Form form={form} size={'large'} onFinish={saveEditProfileData}>
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={usernameTextAuthRules}
                >
                    <Input disabled={!isEditing}/>
                </Form.Item>
                <Form.Item
                    label="Почтовый адрес"
                    name="email"
                    rules={emailTextAuthRules}
                >
                    <Input disabled={!isEditing}/>
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    name="phoneNumber"
                    rules={phoneTextAuthRules}
                >
                    <Input disabled={!isEditing}/>
                </Form.Item>
                <Space align={'center'}>
                    {!isEditing ? (
                    <Form.Item>
                            <Button
                                type={'primary'}
                                onClick={startEditProfileData}
                            >Редактировать</Button>
                    </Form.Item>
                            ) : (
                        <Form.Item>
                            <Space size={'middle'}>
                                <Button
                                    type={'primary'}
                                    htmlType='submit'
                                >Сохранить данные</Button>
                                <Button
                                    type='primary'
                                    danger={true}
                                    onClick={cancelEditProfileData}
                                >Отмена</Button>
                            </Space>
                        </Form.Item>)}
                </Space>

            </Form>
        </div>
    )
}