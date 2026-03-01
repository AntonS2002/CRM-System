import styles from "../pages/SignupPage.module.scss"
import MainPicture from "../picture/illustration.jpg";
import MainPicture2 from "../picture/Group.jpg";
import {SignupForm} from "../components/SignupForm/SignupForm.tsx";
import {useState} from "react";
import {Modal} from "antd";
import {Link, useNavigate} from "react-router-dom";


export const SignupPage = () => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsModalOpen(true);
    }

    const handleModalOk = () => {
        setIsModalOpen(false);
        navigate("/auth/login");
    }

    const handleModalCancel = () => {
        setIsModalOpen(false);
        navigate("/");
    }

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
                <h1>Регистрация пользователя</h1>
                <SignupForm onSuccess={handleRegistrationSuccess}/>
            </div>
            <Modal
                title="Регистрация успешна!"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <p>Нажмите ок чтобы пройти на страницу <Link to="/auth/login">авторизации</Link></p>
            </Modal>
        </div>
    )
}