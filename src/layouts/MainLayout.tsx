import {Outlet, useNavigate} from "react-router-dom";
import  styles  from "./MainLayout.module.scss"
import {Navigation} from "../components/Navigation/Navigation.tsx";
import {Layout, notification} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {getAuthToken, getRefreshToken, setAuthToken} from "../util/auth.ts";
import {useEffect} from "react";
import {refreshToken} from "../api/api.ts";


export const MainLayout = () => {

    const token = getAuthToken();
    const refresh = getRefreshToken()
    const navigate = useNavigate()

    useEffect(() => {
        const validationAndRefreshToken = async () => {

            // Если токена нет - отправляем на /auth/login
            if(!token && !refresh){
                navigate('/auth/login')
                return
            }

            if(refresh) {
                try {
                    const newToken = await refreshToken(refresh)
                    if(newToken){
                        setAuthToken(newToken)
                    }

                } catch (error) {
                    notification.error({
                        title: `Token refresh failed ${error}`,
                    })
                }
            }
        }

        validationAndRefreshToken()
    }, []);



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