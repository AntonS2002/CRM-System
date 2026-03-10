import React, {useEffect, useState} from 'react';
import {Flex, notification, Table} from 'antd';
import type {User} from "../../type";
import {getUsers} from "../../api/api.ts";
import type {ColumnsType} from "antd/es/table";

type TableUser = Pick<User, 'username' | 'email' | 'date'>

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
            key: 'date'
        },
    ];

    useEffect(() => {
        const LoadDataUsers = async () => {
            try {
                const response = await getUsers()

                    const formattedData: TableUser[] = response.data.map(user => ({
                        username: user.username,
                        email: user.email,
                        date: user.date,
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

