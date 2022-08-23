import React from "react";
import logo from "../assets/logo.png";

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
