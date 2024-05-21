import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authStore } from "../../../redux/AuthState";

function PanelNavigation(): JSX.Element {
    type User = {
        firstName: string,
        lastName: string,
    };

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }
    }, []);

    return (
        <div className="Navigation">
            <div className="navBar">
                <h2>Hey, {user?.firstName} {user?.lastName}</h2>
                <p className="roleName">Admin</p>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/panel">Dashboard</NavLink></li>
                    <li><NavLink to="/panel/add">Add Vacation</NavLink></li>
                    <li><NavLink to="/panel/edit">Edit Vacation</NavLink></li>
                    <li><NavLink to="/panel/csv">CSV Download</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default PanelNavigation;
