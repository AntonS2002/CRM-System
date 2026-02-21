import {redirect} from "react-router-dom";

export const Logout = () => {
    localStorage.removeItem('token')
    return redirect('/auth/signup')
}