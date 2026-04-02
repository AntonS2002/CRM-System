import {TableUsers} from "../components/TableUsers/TableUsers.tsx";
import styles from '../pages/UsersPage.module.scss'

export const UsersPage = () => {

    return (
        <div className={styles.container}>
            <TableUsers />
        </div>
    )
}