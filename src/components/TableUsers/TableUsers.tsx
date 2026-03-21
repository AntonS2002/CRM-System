import React, {useEffect, useState} from 'react';
import {Avatar, notification, Table, Flex, Button, Dropdown, type MenuProps, Modal} from 'antd';
import type {User} from "../../type";
import type {ColumnsType} from "antd/es/table";

import {DeleteOutlined, UserOutlined, SafetyCertificateOutlined, MoreOutlined, PoweroffOutlined } from '@ant-design/icons';
import {blockUser, deleteUser, getUsers, unblockUser} from "../../api/apiTableUsers.ts";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import useApp from "antd/es/app/useApp";




type TableUser = Pick<User, 'username' | 'email' | 'date' | 'isBlocked' | 'roles' | 'phoneNumber' | 'id'>


export const TableUsers: React.FC = () => {

    const dispatch = useAppDispatch();
    const userRoles = useAppSelector(state => state.auth.roles)

    const isAdmin = userRoles.includes('admin')
    const isModerator = userRoles.includes('moderator')

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [dataUsers, setDataUsers] = useState<TableUser[]>([]);

    const loadDataUsers = async () => {
        try {
            const response = await getUsers()

            const formattedData: TableUser[] = response.data.map(user => ({
                id: user.id,
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

    useEffect(() => {
        loadDataUsers()
    }, [])

    const updateUserStatus = async (id: number, action: 'block' | 'unblock' | 'delete') => {
        try {
            switch (action) {
                case 'block':
                    await blockUser(id)
                    notification.success({
                        title: 'Пользователь Заблокирован'
                    })
                        break

                case 'unblock':
                    await unblockUser(id)
                    notification.success({
                        title: 'Пользователь разблокирован'
                    })
                        break

                case 'delete':
                    await deleteUser(id)
                    notification.success({
                        title: 'Пользователь удален'
                    })
                        break
            }
            await loadDataUsers()

        } catch (error) {
            notification.error({
                title: 'Ошибка ...'
            })
        }
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: ColumnsType<TableUser> = [
        {
            key: 'userAvatar',
            render: () => (
                <Avatar shape="square" size="large" icon={<UserOutlined/>}/>
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
                if (Array.isArray(roles)) {
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
            key: 'operation',
            render: (_, profile) => {
                const items: MenuProps['items'] = [
                    {
                        key: 0,
                        label: `Пользователь ${profile.username}`,
                        disabled: true,
                    },
                    {
                        type: 'divider'
                    },
                    {
                        key: 1,
                        label: 'Перейти к профилю',
                        icon: <UserOutlined/>
                    },
                    {
                        key: 2,
                        label: 'Управление ролями',
                        icon: <SafetyCertificateOutlined/>
                    },
                    {
                        key: 3,
                        label: 'Заблокировать',
                        icon: <PoweroffOutlined />
                    },
                    {
                        type: 'divider'
                    },
                    {
                        key: 4,
                        danger: true,
                        label: 'Удалить пользователя',
                        icon: <DeleteOutlined />,
                        onClick: () => {
                            Modal.confirm({
                                title: 'Удалить пользователя?',
                                content: `Вы уверены что хотите удалить пользователя ${profile.username}`,
                                okText: 'Удалить',
                                cancelText: 'Отмена',
                                onOk: () => {updateUserStatus(profile.id, 'delete')}
                            })
                        }


                    }
                ]
                return (
                    <Dropdown menu={{items}}>
                        <Button icon={<MoreOutlined />} color={"default"}/>
                    </Dropdown>
                )
            },
        }
    ]
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
    )
}
