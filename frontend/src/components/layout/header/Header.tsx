import AuthMenu from "../../auth/authMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="title">VACATIONS</div>
            <AuthMenu />
        </div>
    );
}

export default Header;
