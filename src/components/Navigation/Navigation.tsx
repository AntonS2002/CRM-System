import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {NavLink, useLocation} from "react-router-dom";
import styles from "../Navigation/Navigation.module.scss"

type MenuItem = Required<MenuProps>['items'][number];

const navigationMenuItems: MenuItem[] = [
    {
        key: '/',
        label: (
            <NavLink
                to={"/"}
                className={({isActive}) => (isActive ? 'active' : undefined)}
            >
                Список задач
            </NavLink>
        )},

    {
        key: '/profile',
        label: (
            <NavLink
                to={"/profile"}
                className={({isActive}) => (isActive ? 'active' : undefined)}
            >
                Профиль
            </NavLink>
        ) },
]

export const Navigation = () => {

    const location = useLocation()
    const keysSelectedMenuItems = [location.pathname]

    return <Menu
        className={styles.navigation}
        items={navigationMenuItems}
        selectedKeys={keysSelectedMenuItems}

    />;
}
