import React, {useEffect, useState} from 'react';
import {Flex, notification, Table} from 'antd';
import type {MetaResponse, Profile, Todo, User} from "../../type";
import type {ColumnsType} from "antd/es/table";
import {getProfileUser} from "../../api/apiAuth.ts";

type TableUser = Pick<User, 'username' | 'email' | 'date' | 'isBlocked' | 'roles' | 'phoneNumber'>

export const TableUsers: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [dataUsers, setDataUsers] = useState<TableUser[]>([]);

    const columns: ColumnsType<TableUser> = [
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
            title: 'Дата регистрации',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => date ? new Date(date).toLocaleString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }) : '-'
        },
        {
            title: 'Роли',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[]) => {
                if(Array.isArray(roles)){
                    return roles.join(', ')
                }
                return roles || '-'
            }
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Статус блокировки',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
        }
    ];

    useEffect(() => {
        const LoadDataUsers = async () => {
            try {
                const response: MetaResponse<Profile, Todo> = await getProfileUser()

                    const formattedData: TableUser[] = response.data.map(user => ({
                        username: user.username,
                        email: user.email,
                        date: user.date,
                        isBlocked: user.isBlocked,
                        phoneNumber: user.phoneNumber,
                        roles: user.roles,
                    }))

                    setDataUsers(formattedData)

            } catch (error) {
                notification.error({
                    title: 'Ошибка загрузки данных пользователей'
                })
            }
        }

LoadDataUsers()

    },[])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Flex gap="medium" vertical>
            <Table
                rowKey={'username'}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataUsers}
            />
        </Flex>
    );
};

