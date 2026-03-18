import {SignupForm} from "../components/SignupForm/SignupForm.tsx";
import {useState} from "react";
import {Modal} from "antd";
import {Link, useNavigate} from "react-router-dom";


export const SignupPage = () => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <>
            <h1>Регистрация пользователя</h1>
            <SignupForm onSuccess={handleRegistrationSuccess}/>

            <Modal
                title="Регистрация успешна!"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <p>Нажмите ок чтобы пройти на страницу <Link to="/auth/login">авторизации</Link></p>
            </Modal>
        </>


    )
}