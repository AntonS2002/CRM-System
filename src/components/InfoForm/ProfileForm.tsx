import {Button, notification, Table} from "antd";
import {useEffect, useState} from "react";
import {getProfileUser, LogoutProfile} from "../../api/api.ts";
import {tokenManager} from "../../util/auth.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import type {ProfileRequest} from "../../type";
import styles from '../../components/InfoForm/InfoForm.module.scss'
import {logout} from "../../store/slices/authSlice.ts";



export const ProfileForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<ProfileRequest[]>([])

    useEffect(() => {

        const loadProfile = async () => {
            try {
                const response = await getProfileUser();
                setProfileData([
                    {
                    username: response.username,
                    email: response.email,
                    phoneNumber: response.phoneNumber
                 }
                ]);
            } catch (err) {
                console.error(err);
            }
        };

        loadProfile();
    }, []);

    const Logout = async () => {
        await LogoutProfile();
        dispatch(logout());
        tokenManager.clearToken();
        localStorage.clear();
        navigate("/auth/login");
        notification.info({ title: "Вы вышли из системы" });
    };

    const columns = [
        {
            title: "Имя пользователя",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Номер телефона",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
    ];

        return (
            <div className={styles.container}>
                <Table
                    columns={columns}
                    dataSource={profileData}
                    pagination={false}
                    bordered
                />
                <Button danger type={"primary"} onClick={Logout}>Logout</Button>
            </div>

        );
}