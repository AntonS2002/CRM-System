
import styles from "../pages/ProfilePage.module.scss"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ProfileRequest} from "../type";
import {getProfileUser, logoutProfile} from "../api/apiAuth.ts";
import {logout} from "../store/slices/authSlice.ts";
import {tokenManager} from "../util/auth.ts";
import {Button, notification, Table} from "antd";

export const ProfilePage = () => {

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
        await logoutProfile();
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
    )
}