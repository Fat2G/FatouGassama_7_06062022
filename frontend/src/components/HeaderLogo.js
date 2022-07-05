import React from "react";
import logo from "../assets/logo.png";
import "../styles/components/_headerLogo.scss";
import "../styles/components/_responsive.scss";

const HeaderLogo = () => {
  return (
    <div>
      <header>
        <nav className="logo">
          <div className="ctn-logo">
            <img src={logo} className="app-logo" alt="logo groupomania" />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderLogo;
