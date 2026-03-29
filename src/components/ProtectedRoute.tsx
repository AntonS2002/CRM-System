import {useSelector} from "react-redux";
import type {RootState} from "../store";
import {Navigate} from "react-router-dom";
import type {PropsWithChildren} from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    if (!isAuth) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};