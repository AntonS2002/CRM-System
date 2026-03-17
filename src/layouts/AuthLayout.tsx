import {Outlet} from "react-router-dom";
import styles from "../pages/LoginPage.module.scss";
import MainPicture from "../picture/illustration.jpg";
import MainPicture2 from "../picture/Group.jpg";


export const AuthLayout = () => {
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
                <Outlet/>
            </div>
        </div>


    )
}