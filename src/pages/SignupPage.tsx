import styles from "../pages/SignupPage.module.scss"
import MainPicture from "../picture/illustration.jpg";
import MainPicture2 from "../picture/Group.jpg";
import {SignupForm} from "../components/SignupForm/SignupForm.tsx";

export const SignupPage = () => {


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
                <SignupForm/>
            </div>
        </div>
    )
}