import React from "react";
// require("dotenv").config();
import axios from "axios";
import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/_navbar.scss";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/:id/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => {
        console.log(err.response);
      });

    window.location = "/";
  };

  return (
    <div>
      <FontAwesomeIcon
        onClick={logout}
        className="icon-navbar"
        icon={faRightFromBracket}
      />
    </div>
  );
};

export default Logout;