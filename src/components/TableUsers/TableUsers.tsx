import React, {useEffect, useState} from 'react';
import {Avatar, Button, Dropdown, Flex, type MenuProps, message, notification, Table} from 'antd';
import type {User} from "../../type";
import type {ColumnsType} from "antd/es/table";
import {getUsers} from "../../api/apiAuth.ts";

import styles from '../../components/TableUsers/TableUsers.module.scss'
import {DeleteOutlined, EditOutlined, StopOutlined, UserOutlined} from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';



type TableUser = Pick<User, 'username' | 'email' | 'date' | 'isBlocked' | 'roles' | 'phoneNumber'>



export const TableUsers: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [dataUsers, setDataUsers] = useState<TableUser[]>([]);

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    const showDeleteConfirm = () => {


    }

    const items: MenuProps['items'] = [
        {
            label: 'Редактировать',
            key: '1',
            icon: <EditOutlined />,
        },
        {
            label: 'Перейти к профилю',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: 'Заблокировать',
            key: '3',
            icon: <StopOutlined />,
            danger: true,
        },
        {
            label: 'Удалить пользователя',
            key: '4',
            icon: <DeleteOutlined />,
            danger: true,

        }
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const columns: ColumnsType<TableUser> = [
        {
            render: () => (
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
            )
        },
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
            render: (isBlocked: boolean) => isBlocked ? 'Заблокирован' : 'Разблокирован'
        },
        {
            title: 'Действия',
            key: 'action',
            render: ()=> (
                <div className={styles.container}>
                    <Dropdown menu={menuProps} placement="bottomRight">
                        <Button icon={<EllipsisOutlined />}/>
                    </Dropdown>
                </div>

            )
        }
    ];

    useEffect(() => {
        const LoadDataUsers = async () => {
            try {
                const response = await getUsers()

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
                pagination={{
                    pageSize: 20,
                }}
            />
        </Flex>
    );
};

