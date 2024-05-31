import { useEffect, useState } from "react";
import "./AuthMenu.css";
import { jwtDecode } from "jwt-decode";
import { authStore } from "../../../redux/AuthState";
import notify from "../../../services/Notify";
import { NavLink } from "react-router-dom";
import authService from "../../../services/Auth";
import notifyService from "../../../services/Notify";
//import notifyService from "../../../services/Notify";

function AuthMenu(): JSX.Element {

    type User = {
        firstName: string,
        lastName: string,
        userId: string,
    };

    const [user, setUser] = useState<User>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            setUser(user);
        }

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
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

    useEffect(() => {
        async function ifAdmin() {
            if (user) {
                try {
                    const userAdmin = await authService.isAdmin(user.userId);
                    setIsAdmin(userAdmin);
                } catch (error: any) {
                    notifyService.error("Failed to check admin status");
                }
            }
        }
        ifAdmin();
    }, [user]);

    return (
        <div className="AuthMenu">
            <div className="BurgerMenu" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
                <div className={`BurgerLine ${menuOpen ? "open" : ""}`} />
            </div>

            <div className={`MenuItems ${menuOpen ? "open" : ""}`}>
                {!user ?
                    <div className="Guest">
                        <span className="Title">Hello Guest |</span>
                        <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                        <span className="Title"> | </span>
                        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                    </div>
                    :
                    <div className="User">
                        <span className="Title">Hello {user.firstName} {user.lastName},</span>
                        <NavLink to="/"><div>Home </div></NavLink>
                        {isAdmin && <NavLink to="/panel"><div>Panel</div></NavLink>}
                        <NavLink to="/home" onClick={() => { logout(); setMenuOpen(false); }}><div>Logout</div></NavLink>
                    </div>
                }
            </div>
        </div>
    );
}

export default AuthMenu;