import {ProfileForm} from "../components/InfoForm/ProfileForm.tsx";
import styles from "../pages/ProfilePage.module.scss"

export const ProfilePage = () => {

    return (
        <div className={styles.container}>
            <ProfileForm />
        </div>
    )
}