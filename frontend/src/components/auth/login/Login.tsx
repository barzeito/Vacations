import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import LoginModel from "../../../models/LoginModel";
import authService from "../../../services/Auth";
import notifyService from "../../../services/Notify";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<LoginModel>();
    const navigate = useNavigate();

    async function submitLoginData(loginModel: LoginModel): Promise<void> {
        try {
            // service
            await authService.login(loginModel);
            notifyService.success('you have been successfully logged in');
            navigate('/home');
        } catch (err) {
            notifyService.error(err);
        }
    }

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            notifyService.error('You are already logged in, please don\'t login again')
            navigate('/home');
        }
    })

    return (
        <div className="Login">
            <div className="LoginContainer">
                <div className="LoginForm">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(submitLoginData)}>
                        <label>Email:</label>
                        <input type="email" placeholder="example@example.com" {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                        })} /><span>{formState.errors.email?.message}</span>
                        <label>Password:</label>
                        <input type="password" placeholder="Password"{...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required'
                            },
                        })} /><span>{formState.errors.password?.message}</span>
                        <button>Login</button>
                        <div className="account">Don't have an account? <NavLink to={'/signup'} className="link">SignUp</NavLink></div>
                    </form>
                </div>
                <div className="LoginText">
                    <h3>Welcome to Vacations</h3>
                    <p>Vacations let you to find the best destination for your next vacation.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
