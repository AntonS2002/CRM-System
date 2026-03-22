import React, {useEffect, useState} from 'react';
import {Avatar, notification, Table, Flex, Button, Dropdown, type MenuProps, Modal, Drawer, Select} from 'antd';
import {Roles, type User} from "../../type";
import type {ColumnsType} from "antd/es/table";
import {DeleteOutlined, UserOutlined, SafetyCertificateOutlined, MoreOutlined} from '@ant-design/icons';
import {blockUser, deleteUser, getUsers, unblockUser, updateRolesUser} from "../../api/apiTableUsers.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import styles from '../../components/TableUsers/TableUsers.module.scss'
import {useNavigate} from "react-router-dom";

type TableUser = Pick<User, 'username' | 'email' | 'date' | 'isBlocked' | 'roles' | 'phoneNumber' | 'id'>


export const TableUsers: React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth)
    const userRoles = auth.roles

    const isAdmin = userRoles.includes(Roles.ADMIN)
    const isModerator = userRoles.includes(Roles.MODERATOR)


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [dataUsers, setDataUsers] = useState<TableUser[]>([]);

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

    const [isBlocked, setIsBlocked] = useState<boolean>();

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
                roles: user.roles
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
                    setIsBlocked(true)
                        break

                case 'unblock':
                    await unblockUser(id)
                    notification.success({
                        title: 'Пользователь разблокирован'
                    })
                    setIsBlocked(false)
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

    const handleOpenDrawer = (user: TableUser) => {
        setSelectedUserId(user.id)
        setDrawerOpen(true)
        setSelectedRoles(user.roles)
    }

    const handleCloseDrawer = () => {
        setSelectedUserId(null)
        setDrawerOpen(false)
        setSelectedRoles([])
    }

    const handleSaveRoles = async () => {

        if(!selectedUserId){
            notification.error({
                title: 'Пользователь не выбран'
            })
            return
        }

        try {
            await updateRolesUser(selectedUserId, selectedRoles)
            notification.success({
                title: 'Роли обновлены',
                description: 'Роли пользователя успешно обновлены'
            })
            await loadDataUsers()
            handleCloseDrawer()

        } catch (error) {
            notification.error({
                title: 'Ошибка обновления ролей'
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
            render: (roles: Roles[]) => {
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
                        icon: <UserOutlined/>,
                        onClick: () => {navigate(`/app/users/${profile.id}`)}
                    },
                    {
                        key: 2,
                        label: 'Управление ролями',
                        icon: <SafetyCertificateOutlined/>,
                        onClick: () => {handleOpenDrawer(profile)}
                    },
                    {
                        key: 3,
                        label: profile.isBlocked ? 'Разблокировать' : 'Заблокировать',
                        icon: <UserOutlined/>,
                        onClick: () => {updateUserStatus(profile.id, isBlocked ? 'unblock' : 'block')}

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

    const roleOption = [
        {label: 'ADMIN', value: Roles.ADMIN},
        {label: 'MODERATOR', value: Roles.MODERATOR},
        {label: 'USER', value: Roles.USER},
    ]

    return (
        <>
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

            <Drawer
                title='Управленеи ролями пользователя'
                placement="right"
                size='large'
                onClose={handleCloseDrawer}
                open={drawerOpen}
                footer={
                    <div className={styles.button}>
                        <Button type="primary" onClick={handleSaveRoles}>
                            Сохранить
                        </Button>
                        <Button onClick={handleCloseDrawer}>Cancel</Button>
                    </div>
                }
            >

                <Select
                    mode="multiple"
                    value={selectedRoles}
                    size={'large'}
                    onChange={(value) => setSelectedRoles(value)}
                    options={roleOption}
                    placeholder='Выберите поля'
                    allowClear
                    style={{width:'400px'}}
                />
            </Drawer>
        </>



    )
}
