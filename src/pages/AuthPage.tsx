import styles from "../layouts/AuthLayout.module.scss";
import MainPicture from "../picture/illustration.jpg";
import MainPicture2 from "../picture/Group.jpg";
import {AuthForm} from "../components/AuthForm/AuthForm.tsx";

export const AuthPage = () => {


    return (
        <div className={styles.container}>
            <div className={styles.containerImg}>
                <img
                    src={MainPicture}
                    alt="123"
                    className={styles.img}
                />
            </div>
            <div className={styles.containerImgIc}>
                <img src={MainPicture2} alt="123"/>
            </div>
            <div className={styles.containerForm}>
                <h1>Login to your Account</h1>
                <AuthForm/>
            </div>
        </div>
    )
}