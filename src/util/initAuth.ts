import {refreshRequest} from "../api/auth.api.ts";
import {redirect} from "react-router-dom";



export const initAuth = async () => {

    const refreshToken = localStorage.getItem("refreshToken");
    if(!refreshToken) {
        throw redirect('/auth/login');
    }

    try {
        await refreshRequest()

    } catch (error) {
        throw redirect('/auth/login');
    }
}