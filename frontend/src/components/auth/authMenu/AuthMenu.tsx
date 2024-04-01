import { useEffect, useState } from "react";
import "./AuthMenu.css";
import { jwtDecode } from "jwt-decode";
import { authStore } from "../../../redux/AuthState";
import notify from "../../../services/Notify";
import { NavLink } from "react-router-dom";
import authService from "../../../services/Auth";

function AuthMenu(): JSX.Element {

    type User = {
        firstName: string,
        lastName: string
    };

    const [user, setUser] = useState<User>();
    const [menuOpen, setMenuOpen] = useState<boolean>(false); // State to track menu open/close


    useEffect(() => {
        // init the token the 1st time the component is mounted
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }

        // subscribe to changes
        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
                console.log(user)
                setUser(user);
            } else {
                setUser(undefined)
            }
        });

        return unsubscribe;
    }, [])

    function logout() {
        authService.logout();
        notify.success('logged out successfully');
    }


    return (
        <div className="AuthMenu">
            {/* Burger Menu Button */}
            <div className="BurgerMenu" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
            </div>

            {/* Render Menu Items */}
            <div className={`MenuItems ${menuOpen ? "open" : ""}`}>
                {!user ?
                    <div className="Guest">
                        <span className="Title">Hello Guest |</span>
                        <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                        <span className="Title"> | </span>
                        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                    </div>
                    :
                    <div className="Guest">
                        <span className="Title">Hello {user.firstName} |</span>
                        <NavLink to="/home" onClick={() => { logout(); setMenuOpen(false); }}><div>Logout</div></NavLink>
                    </div>
                }
            </div>
        </div>
    );
}

export default AuthMenu;