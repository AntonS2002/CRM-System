import {Button, Form, Input, notification, Space, Table} from "antd";
import {useEffect, useState} from "react";
import type {User} from "../type";
import {getUser, updateProfileUser} from "../api/apiTableUsers.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowLeftOutlined, EditOutlined} from "@ant-design/icons";
import styles from "../../src/pages/UserPage.module.scss"
import {emailTextAuthRules, phoneTextAuthRules, usernameTextAuthRules} from "../components/Validation/FormAuthRules.ts";

type TableUser = Pick<User, 'username' | 'email' | 'phoneNumber'>

export const UserPage = () => {

    const navigate = useNavigate();

    const {id} = useParams<{id: string}>()

    const [dataUser, setDataUser] = useState<TableUser | null>(null)

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [form] = Form.useForm()

    const handleStartEdit = () => {
        //заполняем форму текущими данными
        if(dataUser) {
            form.setFieldsValue({
                username: dataUser.username,
                email: dataUser.email,
                phoneNumber: dataUser.phoneNumber,
            })
        }
        setIsEditing(true)
    }

    const handleSave = async () => {

        try {

            // получаем значения из формы
            const values = await form.validateFields()

            if(!id) {
                notification.error({
                    title: "ID пользователя отсутствует",
                })
                return
            }

            const updateData = {
                username: values.username,
                email: values.email,
                phoneNumber: values.phoneNumber
            }

            await updateProfileUser(Number(id), updateData)

            setDataUser(updateData)


            notification.success({
                title: "Данные обновлены",
            })

            setIsEditing(false)

        } catch (error) {
            notification.error({
                title: 'Данные пользователя не сохранены',
            })
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.resetFields()
    }

    const dataSource = dataUser ? [
        {
            key: 1,
            field: "Имя пользователя:",
            value: dataUser.username,
            dataIndex: 'username',
            rules: usernameTextAuthRules
        },
        {
            key: 2,
            field: "Email:",
            value: dataUser.email,
            dataIndex: 'email',
            rules: emailTextAuthRules
        },
        {
            key: 3,
            field: "Телефон:",
            value: dataUser.phoneNumber,
            dataIndex: 'phoneNumber',
            rules: phoneTextAuthRules
        }
    ] : []

    const columns = [
        {
            title: 'Данные пользователя',
            dataIndex: 'field',
            key: 'field',

        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            render: (text: string, record) => {
                if(isEditing) {
                    return (
                        <Form.Item
                            name={record.dataIndex}
                            rules={record.rules}
                            style={{margin: 0}}
                        >
                        <Input/>
                        </Form.Item>
                    )
                }
                return text
            }
        }
    ]

    const loadDataUser = async () => {

        if(!id){
            notification.error({
                title: 'ID пользователя отсутствует'
            })
            return
        }

        try {

            const response = await getUser(Number(id))

            const forrmatedData = {
                id: response.id,
                username: response.username,
                email: response.email,
                phoneNumber: response.phoneNumber
            }
            setDataUser(forrmatedData)

        } catch (error) {
            notification.error({
                title: 'Ошибка загрузки пользователя',
            })
        }
    }

    useEffect(() => {
       loadDataUser()
    }, [id])

    return(
        <div className={styles.container}>

            <Form form={form}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                />
            </Form>

            <Space>
                <Button icon={<ArrowLeftOutlined/>} variant={'outlined'} color={'purple'} onClick={() => navigate('/app/users/')}>Вернуться</Button>
                {!isEditing ? (
                    <Button icon={<EditOutlined />} variant={'outlined'} color={'pink'} onClick={handleStartEdit}>Редактировать</Button>

                ) : (
                    <>
                        <Button variant={'solid'} color={'green'} onClick={handleSave}>Сохранить</Button>
                        <Button variant={'solid'} color={'danger'} onClick={handleCancel}>Отмена</Button>
                    </>

                )}

            </Space>


        </div>
    )
}