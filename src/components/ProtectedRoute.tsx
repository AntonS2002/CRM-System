import {useSelector} from "react-redux";
import type {RootState} from "../store";
import {Navigate} from "react-router-dom";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    if (!isAuth) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};