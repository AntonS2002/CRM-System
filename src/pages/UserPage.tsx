import {Button, Form, Input, notification, Space} from "antd";
import {useEffect, useState} from "react";
import type {User} from "../type";
import {getUser, updateProfileUser} from "../api/apiTableUsers.ts";
import {useNavigate, useParams} from "react-router-dom";



export const UserPage = () => {

    type UserType = Pick<User, 'username' | 'email' | 'phoneNumber'>

    const navigate = useNavigate();

    const {id} = useParams();

    const [form] = Form.useForm();

    const [dataUser, setDataUser] = useState<UserType>({
        username: "",
        email: "",
        phoneNumber: "",
    })

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const loadDataUser = async () => {
        try {
            const response = await getUser(Number(id))
            setDataUser(response)
            form.setFieldsValue({
                username: response.username,
                email: response.email,
                phoneNumber: response.phoneNumber,
            })


        } catch (error){
            notification.error({
                title: "Error",
                description: "Данные пользователя не загружены",
            })
        }
    }

    useEffect(() => {
        loadDataUser();
    },[id])

    const handleStartEdit = () => {
        if(dataUser){
            form.setFieldsValue({
                username: dataUser.username,
                email: dataUser.email,
                phoneNumber: dataUser.phoneNumber
            })
        }
        setIsEdit(true);
    }

    const handleCancelEdit = () => {
        form.setFieldsValue({
            username: dataUser.username,
            email: dataUser.email,
            phoneNumber: dataUser.phoneNumber,
        })
        setIsEdit(false);
    }

    const handleSaveEdit = async () => {
        try {
            const values =  await form.validateFields();

            const changedData: Partial<UserType> = {}

            if(values.username !== dataUser.username){
                changedData.username = values.username
            }
            if(values.email !== dataUser.email){
                changedData.email = values.email
            }
            if(values.phoneNumber !== dataUser.phoneNumber){
                changedData.phoneNumber = values.phoneNumber
            }
            if(Object.keys(changedData).length === 0){

                notification.info({
                    title: "Нет изменений",
                })
                setIsEdit(false);
                return
            }

           await updateProfileUser(Number(id), changedData)

            setDataUser(prev => ({
                ...prev,
                ...changedData}))

            notification.success({
                title: "Успех",
                description: "Данные пользователя обновлены",
            });

            setIsEdit(false);

        } catch (error) {
            notification.error({
                title: "Error",
                description: "Данные не обновлены",
            })
        }
    }

    return (
        <div>
            <Form form={form} onFinish={handleSaveEdit}>
                <Form.Item name='username'>
                    <Input disabled={!isEdit}/>
                </Form.Item>

                <Form.Item name='email'>
                    <Input disabled={!isEdit}/>
                </Form.Item>

                <Form.Item name='phoneNumber'>
                    <Input disabled={!isEdit}/>
                </Form.Item>
                <Space>
                        <Button onClick={() => navigate('/app/users')}>Вернуться</Button>
                    {isEdit ? (
                        <div style={{display:'flex' , gap: '0.5rem'}}>
                            <Button type={'primary'} htmlType={'submit'}>Сохранить</Button>
                            <Button danger={true} onClick={handleCancelEdit}>Отмена</Button>
                        </div>

                    ) : (<Button onClick={handleStartEdit}>Редактировать</Button>)}
                </Space>
            </Form>
        </div>
    )
}