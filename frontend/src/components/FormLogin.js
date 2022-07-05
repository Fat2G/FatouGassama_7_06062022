import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import illustration from "../assets/img/ill-login.png";
import "../styles/pages/_login.scss";
import "../styles/components/_responsive.scss";

const FormLogin = () => {
  return (
    <div>
      <main className="login">
        <section className="ctn-illust">
          <img src={illustration} alt="illustration d'une équipe de travail" />
        </section>
        <section className="ctn-form">
          <form action="/" method="post">
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
                placeholder="Adresse email"
                required
              />
            </div>
            <div>
              <div className="input-form">
                <label htmlFor="password" className="icon-form">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  required
                />
                <FontAwesomeIcon icon={faEye} />
              </div>
              <div className="flex">
                <p>Mot de passe oublié ?</p>
                <NavLink className="link" to="/">
                  Cliquez ici
                </NavLink>
              </div>
            </div>
            <div className="btn-primary">
              <button type="button" className="btn">
                Connexion
              </button>
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
    </div>
  );
};

export default FormLogin;
