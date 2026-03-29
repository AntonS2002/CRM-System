import React, {useEffect, useState} from 'react';
import {
    Avatar,
    notification,
    Table,
    Flex,
    Button,
    Dropdown,
    type MenuProps,
    Modal,
    Drawer,
    Select,
    Input,
    Typography, type TableProps, Segmented,
} from 'antd';
import {type Profile, Roles, type User} from "../../type";
import type {ColumnsType} from "antd/es/table";
import {DeleteOutlined, UserOutlined, SafetyCertificateOutlined, MoreOutlined} from '@ant-design/icons';
import {blockUser, deleteUser, getUsers, unblockUser, updateRolesUser} from "../../api/apiTableUsers.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import styles from '../../components/TableUsers/TableUsers.module.scss'
import {useNavigate} from "react-router-dom";

type TableUser = Pick<User, 'username' | 'email' | 'date' | 'isBlocked' | 'roles' | 'phoneNumber' | 'id' >

interface TableParams {
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    isBlocked: boolean | undefined,
    search: string | undefined,
}

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])

    return debouncedValue;
}

export const TableUsers: React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth)
    const userRoles = auth.roles

    const isAdmin = userRoles.includes(Roles.ADMIN)
    const isModerator = userRoles.includes(Roles.MODERATOR)

    const [isBlocked, setIsBlocked] = useState<boolean>(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [dataUsers, setDataUsers] = useState<Profile[]>([]);

    const [tableParams, setTableParams] = useState<TableParams>({
        sortBy: 'id',
        sortOrder: 'asc',
        isBlocked: undefined,
        search: undefined,

    })
    const [filter, setFilter] = useState<string>('all')
    const [searchValue, setSearchValue] = useState<string>('')
    const debouncedSearch = useDebounce(searchValue, 1000)

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

    const loadDataUsers = async () => {

        const {sortBy, sortOrder, isBlocked, search} = tableParams
        try {
            const response = await getUsers({sortBy, sortOrder, isBlocked, search});
            setDataUsers(response.data)
        } catch (error) {
            notification.error({
                title: 'Ошибка загрузки данных пользователей'
            })
        }
    }

    useEffect(() => {
        setTableParams(prev => ({
            ...prev,
            search: debouncedSearch || undefined,
        }))
    }, [debouncedSearch]);

    useEffect(() => {
           loadDataUsers()
    }, [tableParams.sortBy, tableParams.sortOrder, tableParams.isBlocked, tableParams.search]);

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
            sorter: true,
            sortOrder: tableParams.sortBy === 'username' ? (tableParams.sortOrder === "asc" ? 'ascend' : 'descend') : null,
        },
        {
            title: 'Email пользователя',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            sortOrder: tableParams.sortBy === 'email' ? (tableParams.sortOrder === 'asc' ? 'ascend' : 'descend') : null
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

    const handleSorterChange: TableProps<User>['onChange'] = (pagination, _, sorter) => {

        let sortBy = 'id'
        let sortOrder: 'asc' | 'desc' = 'asc';

        if(sorter && !Array.isArray(sorter)) {
            sortBy = sorter.field as string
            if(sorter.order === 'ascend'){
                sortOrder = 'asc'
            } else if(sorter.order === 'descend'){
                sortOrder = 'desc'
            }
        }

        setTableParams(prev => ({
            ...prev,
            sortOrder,
            sortBy,
        }))
    }

    const handleFilterChange = (value: string) => {
        setFilter(value)

        let isBlocked: boolean | undefined

        switch (value) {
            case 'block':
                isBlocked = true
                break
            case 'unblock':
                isBlocked = false
                break
            default:
                isBlocked = undefined
                break
        }

        setTableParams(prev => ({
            ...prev,
            isBlocked,
        }))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
    }

    const handleClearSearchChange = () => {
        setSearchValue('')

        setTableParams(prev => ({
            ...prev,
            search: undefined,
        }))
    }

    return (
        <div className={styles.page}>
            <Typography.Title level={2}>Пользователи</Typography.Title>
            <Typography.Paragraph>Поиск по имени или email:</Typography.Paragraph>

                <Input.Search
                    allowClear
                    prefix={<UserOutlined/>}
                    value={searchValue}
                    onChange={handleSearchChange}
                    onClear={handleClearSearchChange}
                />
            <div className={styles.segment}>
                <Segmented
                    options={[
                        {
                            label: 'Все',
                            value: 'all',
                        },
                        {
                            label: 'Заблокирован',
                            value: 'block',
                        },
                        {
                            label: 'Разблокирован',
                            value: 'unBlock',
                        },
                    ]}
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>

            <Flex gap="medium" vertical>
                <Table
                    rowKey={'id'}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataUsers}
                    onChange={handleSorterChange}

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
        </div>



    )
}
