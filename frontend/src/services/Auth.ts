import axios from "axios";
import SignUpModel from "../models/SignupModel";
import appConfig from "../utils/AppConfig";
import { AuthAction, AuthActionType, authStore } from "../redux/AuthState";
import LoginModel from "../models/LoginModel";

class AuthService {
    public async signUp(signup: SignUpModel): Promise<string> {
        const response = await axios.post<{ jwt: string }>(appConfig.signupUrl, signup);
        const token = response.data.jwt;
        const action: AuthAction = {
            type: AuthActionType.Signup,
            payload: token
        }
        authStore.dispatch(action);

        return token;
    }

    public async login(login: LoginModel): Promise<string> {
        const response = await axios.post<{ jwt: string }>(appConfig.loginUrl, login);
        const token = response.data.jwt;
        const action: AuthAction = {
            type: AuthActionType.Login,
            payload: token
        }
        authStore.dispatch(action);

        return token;
    }

    public async checkIfAdmin(login: LoginModel): Promise<boolean> {
        try {
            const response = await axios.get<{ roleId: number }>(appConfig.usersUrl, { params: login });
            const roleId = response.data.roleId;
            const isAdmin = roleId === 2;
            return isAdmin;
        } catch (error) {
            console.error('Error checking if user is admin:', error);
            throw error;
        }
    }

    public logout() {
        const action: AuthAction = {
            type: AuthActionType.Logout,
            payload: null
        }
        authStore.dispatch(action);
    }

}
const authService = new AuthService();
export default authService;