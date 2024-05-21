import AuthMenu from "../../auth/authMenu/AuthMenu";
import logo from "../../../assets/images/logo2.png";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="nav-left">
                <AuthMenu />
            </div>
            <div className="image-container">
                <img src={logo} alt="Logo" className="center-image" />
            </div>
            <div className="nav-right">
                <AuthMenu />
            </div>
        </div>
    );
}

export default Header;
