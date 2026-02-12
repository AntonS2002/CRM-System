import {Outlet} from "react-router-dom";
import  styles  from "./MainLayout.module.scss"
import {Navigation} from "../components/Navigation/Navigation.tsx";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";

export const MainLayout = () => {

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