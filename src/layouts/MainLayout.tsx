import {Outlet, useNavigate} from "react-router-dom";
import  styles  from "./MainLayout.module.scss"
import {Navigation} from "../components/Navigation/Navigation.tsx";
import {Layout, notification} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {getAuthToken, getRefreshToken, removeTokens, setAuthToken} from "../util/auth.ts";
import {useEffect} from "react";
import {refreshToken} from "../api/api.ts";
import type {Token} from "../type";



export const MainLayout = () => {


    const navigate = useNavigate()
    let isMounted = true;
    useEffect(() => {
        const validationAndRefreshToken = async () => {
            try {
                const token = getAuthToken();
                const refresh = getRefreshToken()

                if(!token && !refresh){
                    console.log('Нет токенов, редирект на логин')
                    navigate('/auth/login', {replace: true})
                    return
                }

                if(refresh && !token) {
                    try {
                        const response: Token = await refreshToken({refreshToken: refresh})

                        if (response?.accessToken && isMounted) {
                            setAuthToken(response.accessToken)
                        }

                    } catch (error) {

                        if(isMounted) {
                            removeTokens()

                            notification.error({
                                title: `Сессия истекла`,
                                description: `Пожалуйста войдите снова`,
                            })
                            navigate('/auth/login', {replace: true})
                        }
                        return
                    }
                }

        } catch(error) {
                console.error('MainLayout: критическая ошибка:', error);
                if(isMounted) {
                notification.error({
                    title: 'Ошибка критическая',
                    })
                    navigate('/auth/login', {replace: true})
                }
            }
        }
        validationAndRefreshToken()
    }, [navigate]);



    return (
        <Layout className={styles.rootLayout}>
            <Sider
                theme="light"
                className={styles.sider}
                width={250}
                breakpoint="lg"
                collapsedWidth={0}
            >
                <Navigation />
            </Sider>

            <Layout>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}