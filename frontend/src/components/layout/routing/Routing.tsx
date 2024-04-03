import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../home/home/Home";
import Page404 from "../page404/Page404";
import SignUp from "../../auth/signup/SignUp";
import Login from "../../auth/login/Login";
import Panel from "../../panel/panel/Panel";
import AddVacation from "../../panel/addVacation/AddVacation";
import EditVacation from "../../panel/editVacation/EditVacation";


function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/" element={<Home/>} /> */}

            <Route path="/panel" element={<Panel />} />
            <Route path="/panel/add" element={<AddVacation />} />
            <Route path="/panel/edit" element={<EditVacation />} />


            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default Routing;
