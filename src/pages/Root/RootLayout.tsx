import {Outlet} from "react-router-dom";
import {Navigation} from "../../components/Navigation/Navigation.tsx";
import styles from "../Root/RootLayout.module.scss"

export const RootLayout = () => {

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