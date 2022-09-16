import { React } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ModalPost from "./dashboard/ModalPost";
import Logout from "./auth/Logout";

const NavBar = () => {
  //utilisation de redux pour récupérer les data de l'utilisateur
  const userData = useSelector((state) => state.userReducer);

  return (
    <div>
      <header>
        <nav>
          <NavLink className="ctn-logo" to="/dashboard">
            <img src={logo} className="logo" alt="logo groupomania" />
          </NavLink>
          <div className="welcome">
            <p>Bienvenue {userData.username} ! </p>
          </div>
          <div className="icons">
            <ModalPost />
            <NavLink className="icon-spe" to="/profil">
              <FontAwesomeIcon className="icon-navbar" icon={faUser} />
            </NavLink>
            <Logout />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
