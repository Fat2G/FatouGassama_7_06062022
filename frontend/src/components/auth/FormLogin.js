import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import illustration from "../../assets/img/ill-login.png";
import ModalPassword from "./ModalPassword";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector(".error-message");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then(() => {
        window.location = "/dashboard";
      })
      .catch(({ response: err }) => {
        if (err.data.message) {
          errorMessage.innerHTML = err.data.message;
        }
      });
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const handleTogglePassword = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  /* Modal */
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalPwd, setModalPwd] = useState(false);

  // puisque setModal est false il devient true et inversement
  const toggleModalPwd = () => {
    setModalPwd(!modalPwd);
  };

  return (
    <div>
      <main>
        <section className="ctn-illust">
          <img src={illustration} alt="illustration d'une équipe de travail" />
        </section>
        <section className="form-ctn">
          <form action="" method="post" onSubmit={handleLogin} id="login-form">
            <div className="icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="input-form">
              <label htmlFor="email" className="icon-form">
                <FontAwesomeIcon icon={faEnvelope} />
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Adresse email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <br />
            <div>
              <div className="input-form">
                <label htmlFor="password" className="icon-form">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                  type={type}
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <FontAwesomeIcon icon={icon} onClick={handleTogglePassword} />
              </div>
              <div className="error-message error"></div>
              <div className="flex">
                <p>Mot de passe oublié ?</p>
                <button type="button" className="link" onClick={toggleModalPwd}>
                  Cliquez ici
                </button>
              </div>
            </div>
            <div className="btn-ctn">
              <input type="submit" value="Se connecter" className="btn" />
              <div className="flex">
                <p>Pas encore inscrit ?</p>
                <NavLink className="link" to="/inscription">
                  S'inscrire
                </NavLink>
              </div>
            </div>
          </form>
        </section>
      </main>

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifiée d'un opérateur ternaire. */}
      {modalPwd && <ModalPassword />}
    </div>
  );
};

export default FormLogin;
