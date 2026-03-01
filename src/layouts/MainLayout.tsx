import {Outlet, useNavigate} from "react-router-dom";
import  styles  from "./MainLayout.module.scss"
import {Navigation} from "../components/Navigation/Navigation.tsx";
import {Layout, notification} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {getAuthToken, getRefreshToken, removeTokens, setAuthToken} from "../util/auth.ts";
import {useEffect, useRef} from "react";
import {refreshToken} from "../api/api.ts";




export const MainLayout = () => {

    const isRefreshing = useRef(false)
    const navigate = useNavigate()
    let isMounted = true;

    useEffect(() => {
        const validationAndRefreshToken = async () => {

           if(isRefreshing.current) {
               console.log('Уже обновляем токен, пропускаем...');
               return;
           }

           isRefreshing.current = true;

            try {
                const token = getAuthToken();
                const refresh = getRefreshToken()

                if(!refresh) {
                    navigate('/auth/login');
                }

                if(token){
                    return
                }

                if(!token && refresh){
                    try {
                        const response = await refreshToken(refresh);

                        if(response?.accessToken) {
                            setAuthToken(response.accessToken)
                            console.log('Токен обновлен')
                        }
                    } catch (error) {
                        removeTokens()
                        notification.error({
                            title: 'Сессия истекла'
                        })
                        navigate('/auth/login');
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
            } finally {
                isRefreshing.current = false;
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