import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../home/home/Home";
import Page404 from "../page404/Page404";
import SignUp from "../../auth/signup/SignUp";
import Login from "../../auth/login/Login";
import Panel from "../../panel/panel/Panel";
import AddVacation from "../../panel/addVacation/AddVacation";
import EditVacation from "../../panel/editVacation/EditVacation";
import EditVacationPanel from "../../panel/editForm/EditVacationForm";
import SendCSV from "../../panel/sendCSV/SendCSV";
import authService from "../../../services/Auth";
import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";
import notifyService from "../../../services/Notify";



function Routing(): JSX.Element {

    type User = {
        firstName: string,
        lastName: string,
        userId: string,
    };

    const [user, setUser] = useState<User>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

    useEffect(() => {
        async function checkAdmin() {
            if (user) {
                try {
                    const userAdmin = await authService.isAdmin(user.userId);
                    setIsAdmin(userAdmin);
                } catch (error: any) {
                    notifyService.error("Failed to check admin status");
                }
            }
        }
        checkAdmin();
    }, [user]);

    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

            <Route path="/panel" element={isAdmin ? <Panel /> : <Navigate to="/home" />} />
            <Route path="/panel/add" element={isAdmin ? <AddVacation /> : <Navigate to="/home" />} />
            <Route path="/panel/edit" element={isAdmin ? <EditVacation /> : <Navigate to="/home" />} />
            <Route path="/panel/edit/:vacationId" element={isAdmin ? <EditVacationPanel /> : <Navigate to="/home" />} />
            <Route path="/panel/csv" element={isAdmin ? <SendCSV /> : <Navigate to="/home" />} />

            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default Routing;
