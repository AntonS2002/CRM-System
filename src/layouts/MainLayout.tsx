import {Outlet} from "react-router-dom";
import  styles  from "./MainLayout.module.scss"
import {Navigation} from "../components/Navigation/Navigation.tsx";

export const MainLayout = () => {

    return (
        <div className={styles.rootLayout}>
            <nav className={styles.nav}>
                <Navigation/>
            </nav>
            <main className={styles.outletContainer}>
                <Outlet/>
            </main>
        </div>
    )
}