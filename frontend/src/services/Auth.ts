import axios from "axios";
import SignUpModel from "../models/SignupModel";
import appConfig from "../utils/AppConfig";
import { AuthAction, AuthActionType, authStore } from "../redux/AuthState";
import LoginModel from "../models/LoginModel";
import UserModel from "../models/UserModel";

class AuthService {
    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.usersUrl);
        const users = response.data;
        return users;
    }

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

    public async isAdmin(id: string): Promise<boolean> {
        try {
            const response = await axios.get(appConfig.isAdminUrl + `/${id}`);
            const isAdmin = response.data === true;
            return isAdmin;
        } catch (error) {
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