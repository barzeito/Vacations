import { useForm } from "react-hook-form";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import SignUpModel from "../../../models/SignupModel";
import notifyService from "../../../services/Notify";
import authService from "../../../services/Auth";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";

function SignUp(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<SignUpModel>();
    const navigate = useNavigate();

    async function submitUserData(signUpModel: SignUpModel): Promise<void> {
        try {
            await authService.signUp(signUpModel);
            notifyService.success('you have been successfully signed up.');
            navigate('/home');
        } catch (err) {
            notifyService.error(err);
        }
    }

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            notifyService.error('You are already signed up!')
            navigate('/home');
        }
    })

    return (
        <div className="SignUp">
            <div className="SignUpContainer">
                <div className="SignUpForm">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit(submitUserData)}>
                        <label>First Name:</label>
                        <input type="text" placeholder="First Name" {...register('firstName', {
                            required: {
                                value: true,
                                message: 'First Name is required.'
                            },
                        })} /><br /><span>{formState.errors.firstName?.message}</span>
                        <label>Last Name:</label>
                        <input type="text" placeholder="Last Name" {...register('lastName', {
                            required: {
                                value: true,
                                message: 'Last Name is required.'
                            },
                        })} /><br /><span>{formState.errors.lastName?.message}</span>
                        <label>Email:</label>
                        <input type="email" placeholder="example@example.com" {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required.'
                            },
                        })} /><span>{formState.errors.email?.message}</span>
                        <label>Password:</label>
                        <input type="password" placeholder="Password" {...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required.'
                            },
                        })} /><span>{formState.errors.password?.message}</span>
                        <button>Sign Up</button>
                        <div className="account">Already have an account? <NavLink to={'/login'} className="link">Login</NavLink></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
