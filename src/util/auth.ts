import {redirect} from "react-router-dom";

class createManagerToken {
    private token: string | null = null;

    public setToken (token: string)  {
        this.token = token;
    }

    public getToken () {
        return this.token;
    }

    public clearToken(): void {
        this.token = null;
    }
}

export const tokenManager = new createManagerToken();

 export const logout = () => {
    localStorage.clear();
    tokenManager.clearToken()
    return redirect('/auth/signup')
 }