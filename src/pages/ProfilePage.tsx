
import styles from "../pages/ProfilePage.module.scss"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ProfileRequest} from "../type";
import {getUserProfile, logoutProfile} from "../api/apiAuth.ts";
import {logout} from "../store/slices/authSlice.ts";
import {tokenManager} from "../util/auth.ts";
import {Button, notification, Typography} from "antd";

export const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<ProfileRequest[]>([])

    useEffect(() => {

        const loadProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfileData([
                    {
                        username: response.username,
                        email: response.email,
                        phoneNumber: response.phoneNumber
                    }
                ]);
            } catch (error) {
                notification.error({
                    title: "Ошибка загрузки профиля",
                    description: `${error}`,
                });
            }
        };

        loadProfile();
    }, []);

    const handleLogout = async () => {
        await logoutProfile();
        dispatch(logout());
        tokenManager.clearToken();
        localStorage.removeItem("refreshToken")
        navigate("/auth/login");
        notification.info({ title: "Вы вышли из системы" });
    };

    return (
            <div className={styles.container}>
                <Typography.Title level={3}>Профиль пользователя</Typography.Title>
                {profileData.map((profile: ProfileRequest) => {
                    return (
                        <ul>
                            <li>Имя пользователя: {profile.username}</li>
                            <li>Email: {profile.email}</li>
                            <li>Номер телефона: {profile.phoneNumber ? profile.phoneNumber : '---'}</li>
                        </ul>
                    )
                })
                }
                <Button danger type={"primary"} onClick={handleLogout}>Logout</Button>
            </div>


    )
}