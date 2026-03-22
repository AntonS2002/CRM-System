import {Button, notification, Table} from "antd";
import {useEffect, useState} from "react";
import type {User} from "../type";
import {getUser} from "../api/apiTableUsers.ts";
import {useNavigate, useParams} from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

type TableUser = Pick<User, 'username' | 'email' | 'phoneNumber' | 'id'>

export const UserPage = () => {

    const navigate = useNavigate();

    const {id} = useParams<{id: string}>()

    const [dataUser, setDataUser] = useState<TableUser | null>(null)

    const columns = [
        {
            title: 'Имя пользователя',
            dataIndex: 'username',
            key: 'username',

        },
        {
            title: 'Email пользователя',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
        <>

            <Table
                columns={columns}
                dataSource={[dataUser]}
                pagination={false}
                rowKey="id"
            />

            <Button icon={<ArrowLeftOutlined/>} onClick={() => navigate('/app/users/')}>Вернуться</Button>

        </>
    )
}