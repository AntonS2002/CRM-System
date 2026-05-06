import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {NavLink, useLocation} from "react-router-dom";
import styles from "../Navigation/Navigation.module.scss"
import {useAppSelector} from "../../store/hooks.ts";
import {Roles} from "../../type";

type MenuItem = Required<MenuProps>['items'][number];





export const Navigation = () => {

    const auth = useAppSelector(state => state.auth)
    const userRoles = auth.roles
    const isAdmin = userRoles.includes(Roles.ADMIN)
    const isModerator = userRoles.includes(Roles.MODERATOR)

    const location = useLocation()
    const keysSelectedMenuItems = [location.pathname]

    const navigationMenuItems: MenuItem[] = [
        {
            key: '/app/todos',
            label: (
                <NavLink
                    to={"/app/todos"}
                    className={({isActive}) => (isActive ? 'active' : undefined)}
                >
                    Список задач
                </NavLink>
            )},

        {
            key: '/app/profile',
            label: (
                <NavLink
                    to={"/app/profile"}
                    className={({isActive}) => (isActive ? 'active' : undefined)}
                >
                    Профиль
                </NavLink>
            ) },
        ...(isAdmin || isModerator) ? [{
            key: '/app/users',
            label: (
                <NavLink
                    to={'/app/users'}
                    className={({isActive}) => (isActive ? 'active' : undefined)}
                >
                    Пользователи
                </NavLink>
            )
        }] : [],
        {
            key: '/app/KPI_dashboard',
            label: (
                <NavLink
                    to={"/app/KPI_dashboard"}
                    className={({isActive}) => (isActive ? 'active' : undefined)}
                >
                    KPI
                </NavLink>
            )
        }
    ]

    return <Menu
        className={styles.navigation}
        items={navigationMenuItems}
        selectedKeys={keysSelectedMenuItems}

    />;
}
