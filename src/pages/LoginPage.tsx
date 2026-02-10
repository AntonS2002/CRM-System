import styles from "./LoginPage.module.scss";
import MainPicture from "../picture/illustration.jpg";
import MainPicture2 from "../picture/Group.jpg";
import {LoginForm} from "../components/LoginForm/LoginForm.tsx";


export const LoginPage = () => {


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
                <h1>Войти в аккаунт</h1>
                <LoginForm/>
            </div>
        </div>
    )
}